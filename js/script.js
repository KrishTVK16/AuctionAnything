/**
 * Ankand - Premium Auction Marketplace
 * Main JavaScript File
 * Features: Auction Data Store, Live Bid Updates, Filters, User Interaction
 */

// ===== AUCTION DATA STORE =====
const AuctionStore = {
  auctions: new Map(),
  watchlist: new Set(),

  // Add or update an auction
  set(auction) {
    const existing = this.auctions.get(auction.id);
    this.auctions.set(auction.id, {
      id: auction.id,
      title: auction.title || existing?.title || '',
      currentBid: auction.currentBid || existing?.currentBid || 0,
      previousBid: existing?.currentBid || auction.currentBid || 0,
      bidHistory: auction.bidHistory || existing?.bidHistory || [],
      endTime: auction.endTime || existing?.endTime || null,
      category: auction.category || existing?.category || 'general',
      status: auction.status || existing?.status || 'live',
      bidCount: auction.bidCount || existing?.bidCount || 0
    });
    return this.auctions.get(auction.id);
  },

  // Get auction by ID
  get(id) {
    return this.auctions.get(id);
  },

  // Get all auctions
  getAll() {
    return Array.from(this.auctions.values());
  },

  // Filter auctions
  filter(predicate) {
    return this.getAll().filter(predicate);
  },

  // Get auctions by category
  getByCategory(category) {
    if (!category || category === 'all') return this.getAll();
    return this.filter(a => a.category === category);
  },

  // Get ending soon auctions (within 24 hours)
  getEndingSoon() {
    const now = Date.now();
    const dayFromNow = now + (24 * 60 * 60 * 1000);
    return this.filter(a => {
      const endTime = new Date(a.endTime).getTime();
      return endTime > now && endTime <= dayFromNow;
    }).sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
  },

  // Watchlist management
  addToWatchlist(id) {
    this.watchlist.add(id);
    this.saveWatchlist();
    this.dispatchEvent('watchlistChange', { id, action: 'add' });
  },

  removeFromWatchlist(id) {
    this.watchlist.delete(id);
    this.saveWatchlist();
    this.dispatchEvent('watchlistChange', { id, action: 'remove' });
  },

  isInWatchlist(id) {
    return this.watchlist.has(id);
  },

  getWatchlist() {
    return this.filter(a => this.watchlist.has(a.id));
  },

  saveWatchlist() {
    localStorage.setItem('ankand_watchlist', JSON.stringify([...this.watchlist]));
  },

  loadWatchlist() {
    try {
      const saved = localStorage.getItem('ankand_watchlist');
      if (saved) {
        JSON.parse(saved).forEach(id => this.watchlist.add(id));
      }
    } catch (e) {
      console.warn('Could not load watchlist:', e);
    }
  },

  // Event dispatching
  dispatchEvent(type, detail) {
    window.dispatchEvent(new CustomEvent(`auction:${type}`, { detail }));
  }
};

// ===== LIVE BID UPDATES =====
const LiveBidUpdates = {
  updateInterval: null,

  init() {
    // Load auctions from DOM
    this.loadAuctionsFromDOM();

    // Start simulated live updates (would be WebSocket in production)
    this.startSimulatedUpdates();

    // Listen for bid updates
    window.addEventListener('auction:bidUpdate', (e) => this.handleBidUpdate(e.detail));
  },

  loadAuctionsFromDOM() {
    document.querySelectorAll('.auction-card').forEach((card, index) => {
      const id = card.dataset.auctionId || `auction-${index + 1}`;
      const timer = card.querySelector('[data-end]');
      const bidEl = card.querySelector('.current-bid-amount');
      const bidCountEl = card.querySelector('.bid-count');
      const badge = card.querySelector('.auction-badge');

      card.dataset.auctionId = id;

      AuctionStore.set({
        id,
        title: card.querySelector('.card-title')?.textContent || '',
        currentBid: this.parseBid(bidEl?.textContent),
        endTime: timer?.dataset.end || null,
        category: card.dataset.category || 'general',
        status: badge?.classList.contains('live-now') ? 'live' :
          badge?.classList.contains('ending-soon') ? 'ending' : 'active',
        bidCount: parseInt(bidCountEl?.textContent) || 0,
        bidHistory: []
      });
    });
  },

  parseBid(text) {
    if (!text) return 0;
    return parseFloat(text.replace(/[€$,\s]/g, '').replace('.', '')) || 0;
  },

  startSimulatedUpdates() {
    // Simulate random bid updates every 8-15 seconds
    const simulateUpdate = () => {
      const auctions = AuctionStore.getAll();
      if (auctions.length > 0) {
        const randomAuction = auctions[Math.floor(Math.random() * auctions.length)];
        const bidIncrement = Math.floor(Math.random() * 500) + 100;

        this.updateBid(randomAuction.id, randomAuction.currentBid + bidIncrement);
      }

      // Schedule next update
      const nextUpdate = Math.floor(Math.random() * 7000) + 8000;
      setTimeout(simulateUpdate, nextUpdate);
    };

    // Start after initial delay
    setTimeout(simulateUpdate, 5000);
  },

  updateBid(auctionId, newBid) {
    const auction = AuctionStore.get(auctionId);
    if (!auction) return;

    const previousBid = auction.currentBid;

    // Update store
    AuctionStore.set({
      id: auctionId,
      currentBid: newBid,
      bidCount: auction.bidCount + 1,
      bidHistory: [
        { amount: newBid, time: new Date().toISOString() },
        ...auction.bidHistory.slice(0, 9)
      ]
    });

    // Update UI
    this.updateBidUI(auctionId, newBid, previousBid);

    // Dispatch event
    AuctionStore.dispatchEvent('bidUpdate', {
      id: auctionId,
      newBid,
      previousBid,
      bidCount: auction.bidCount + 1
    });
  },

  updateBidUI(auctionId, newBid, previousBid) {
    const card = document.querySelector(`[data-auction-id="${auctionId}"]`);
    if (!card) return;

    const bidEl = card.querySelector('.current-bid-amount');
    const bidCountEl = card.querySelector('.bid-count');

    if (bidEl) {
      // Highlight price change
      bidEl.classList.add('bid-updated');
      bidEl.textContent = formatCurrency(newBid);

      // Remove highlight after animation
      setTimeout(() => bidEl.classList.remove('bid-updated'), 1500);
    }

    if (bidCountEl) {
      const count = AuctionStore.get(auctionId)?.bidCount || 0;
      bidCountEl.textContent = `${count} bids`;
    }
  },

  handleBidUpdate(detail) {
    console.log('Bid update received:', detail);
  }
};

// ===== AUCTION FILTERS =====
const AuctionFilters = {
  currentFilters: {
    category: 'all',
    priceRange: 'all',
    status: 'all',
    sortBy: 'ending'
  },

  init() {
    this.bindFilterEvents();
    this.updateActiveCount();
  },

  bindFilterEvents() {
    // Category filter
    document.querySelectorAll('.filter-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const filterType = this.getFilterType(e.target);
        this.currentFilters[filterType] = e.target.value || 'all';
        this.applyFilters();
      });
    });

    // Quick filter buttons
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        const value = e.target.dataset.value;
        this.currentFilters[filter] = value;
        this.applyFilters();
      });
    });
  },

  getFilterType(select) {
    const options = select.querySelector('option')?.textContent.toLowerCase() || '';
    if (options.includes('categor')) return 'category';
    if (options.includes('price')) return 'priceRange';
    if (options.includes('status')) return 'status';
    return 'category';
  },

  applyFilters() {
    const cards = document.querySelectorAll('.auction-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const auctionId = card.dataset.auctionId;
      const auction = AuctionStore.get(auctionId);
      const shouldShow = this.matchesFilters(auction, card);

      card.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visibleCount++;
    });

    this.updateActiveCount(visibleCount, cards.length);
    this.sortAuctions();
  },

  matchesFilters(auction, card) {
    const { category, priceRange, status } = this.currentFilters;

    // Category filter
    if (category !== 'all') {
      const cardCategory = card.dataset.category || auction?.category;
      if (cardCategory !== category) return false;
    }

    // Price range filter
    if (priceRange !== 'all' && auction) {
      const bid = auction.currentBid;
      const [min, max] = this.parsePriceRange(priceRange);
      if (bid < min || (max && bid > max)) return false;
    }

    // Status filter
    if (status !== 'all') {
      const badge = card.querySelector('.auction-badge');
      if (status === 'live' && !badge?.classList.contains('live-now')) return false;
      if (status === 'ending' && !badge?.classList.contains('ending-soon')) return false;
    }

    return true;
  },

  parsePriceRange(range) {
    const ranges = {
      '0-1000': [0, 1000],
      '1000-5000': [1000, 5000],
      '5000-10000': [5000, 10000],
      '10000+': [10000, null]
    };
    return ranges[range] || [0, null];
  },

  sortAuctions() {
    const { sortBy } = this.currentFilters;
    const container = document.querySelector('.featured-grid, .auctions-grid');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.auction-card'));

    cards.sort((a, b) => {
      const auctionA = AuctionStore.get(a.dataset.auctionId);
      const auctionB = AuctionStore.get(b.dataset.auctionId);

      if (sortBy === 'ending') {
        return new Date(auctionA?.endTime) - new Date(auctionB?.endTime);
      }
      if (sortBy === 'price-high') {
        return (auctionB?.currentBid || 0) - (auctionA?.currentBid || 0);
      }
      if (sortBy === 'price-low') {
        return (auctionA?.currentBid || 0) - (auctionB?.currentBid || 0);
      }
      return 0;
    });

    cards.forEach(card => container.appendChild(card));
  },

  updateActiveCount(visible, total) {
    const countEl = document.querySelector('[data-auction-count]');
    if (countEl && visible !== undefined) {
      countEl.textContent = `Showing ${visible} of ${total} auctions`;
    }
  },

  // Priority for "Ending Soon"
  prioritizeEndingSoon() {
    const endingSoon = AuctionStore.getEndingSoon();
    endingSoon.forEach(auction => {
      const card = document.querySelector(`[data-auction-id="${auction.id}"]`);
      if (card) {
        card.classList.add('priority-ending');
      }
    });
  }
};

// ===== USER INTERACTION =====
const UserInteraction = {
  init() {
    this.initWatchlist();
    this.initStickyHeader();
    this.initJoinLiveAuction();
  },

  // Watchlist functionality
  initWatchlist() {
    AuctionStore.loadWatchlist();

    // Add watchlist buttons to cards
    document.querySelectorAll('.auction-card').forEach(card => {
      const id = card.dataset.auctionId;
      if (!id) return;

      const watchBtn = document.createElement('button');
      watchBtn.className = 'watchlist-btn';
      watchBtn.innerHTML = AuctionStore.isInWatchlist(id)
        ? '<i class="bi bi-heart-fill"></i>'
        : '<i class="bi bi-heart"></i>';
      watchBtn.setAttribute('aria-label', 'Add to watchlist');

      watchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleWatchlist(id, watchBtn);
      });

      const cardImage = card.querySelector('.card-image');
      if (cardImage) {
        cardImage.appendChild(watchBtn);
      }
    });

    // Listen for watchlist changes
    window.addEventListener('auction:watchlistChange', (e) => {
      this.updateWatchlistUI(e.detail);
    });
  },

  toggleWatchlist(id, btn) {
    if (AuctionStore.isInWatchlist(id)) {
      AuctionStore.removeFromWatchlist(id);
      btn.innerHTML = '<i class="bi bi-heart"></i>';
      btn.classList.remove('active');
    } else {
      AuctionStore.addToWatchlist(id);
      btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
      btn.classList.add('active');
    }
  },

  updateWatchlistUI(detail) {
    const watchlistCount = document.querySelector('[data-watchlist-count]');
    if (watchlistCount) {
      watchlistCount.textContent = AuctionStore.watchlist.size;
    }
  },

  // Sticky header with scroll behavior
  initStickyHeader() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class
      if (currentScroll > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }

      // Hide/show on scroll direction (optional)
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }

      lastScroll = currentScroll;
    });
  },

  // Join live auction functionality
  initJoinLiveAuction() {
    document.querySelectorAll('.btn-join-live, [data-join-live]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Could open a modal or redirect to live auction
        const auctionId = btn.dataset.auctionId;
        if (auctionId) {
          this.joinAuction(auctionId);
        }
      });
    });
  },

  joinAuction(auctionId) {
    console.log('Joining auction:', auctionId);
    // In production, this would connect to a real-time auction room
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
  // Load watchlist from storage
  AuctionStore.loadWatchlist();

  // Initialize all systems
  initMobileMenu();
  initCountdownTimers();
  initScrollAnimations();
  initNewsletterForm();
  initSmoothScroll();

  // Initialize new systems
  LiveBidUpdates.init();
  AuctionFilters.init();
  UserInteraction.init();
});

// ===== CORE FUNCTIONS =====

function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    // Close menu when clicking mobile action buttons (Login, Sign Up, Join Live)
    navMenu.querySelectorAll('.mobile-nav-actions a, .mobile-nav-actions .btn, .mobile-nav-actions .btn-join-live').forEach(btn => {
      btn.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

function initCountdownTimers() {
  const timers = document.querySelectorAll('[data-end]');

  timers.forEach(timer => {
    updateTimer(timer);
    setInterval(() => updateTimer(timer), 1000);
  });
}

function updateTimer(timerElement) {
  const endTime = new Date(timerElement.dataset.end).getTime();
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance < 0) {
    const blocks = timerElement.querySelectorAll('.timer-block');
    blocks.forEach(block => {
      const valueEl = block.querySelector('.timer-value');
      if (valueEl) valueEl.textContent = '00';
    });

    // Mark auction as ended
    const card = timerElement.closest('.auction-card');
    if (card) {
      card.classList.add('auction-ended');
      const badge = card.querySelector('.auction-badge');
      if (badge) {
        badge.textContent = 'Ended';
        badge.className = 'auction-badge ended';
      }
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = timerElement.querySelector('.days');
  const hoursEl = timerElement.querySelector('.hours');
  const minutesEl = timerElement.querySelector('.minutes');
  const secondsEl = timerElement.querySelector('.seconds');

  if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const button = this.querySelector('button');
      const originalText = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check-lg"></i> Subscribed!';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        this.reset();
      }, 3000);
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== UTILITY FUNCTIONS =====

function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [name, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

// Export for use in other scripts
window.AuctionStore = AuctionStore;
window.LiveBidUpdates = LiveBidUpdates;
window.AuctionFilters = AuctionFilters;
