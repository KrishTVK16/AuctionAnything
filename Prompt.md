Ankand Website Reconstruction & Design Specification
Project Overview

Brand Name: Ankand
Tagline: Gjeni & Shitet

Platform Type: Curated Online Auction Marketplace
Design Positioning: Premium • Editorial • Live Auction Focused

Core Theme:
Dark Mode + Yellow-Dominant Luxury
A high-contrast, museum-grade auction interface combining editorial typography, bold yellow gradients, and dark surfaces to highlight value, urgency, and trust.

1. Brand Identity
Logo Concept

Symbol: Price Tag icon combined with a rising bid arrow

Meaning:

Price Tag → Value, items, auctions

Rising Arrow → Competitive bidding, growth, live momentum

Usage:

Yellow icon on dark background

Minimal, flat, scalable (SVG-first)

2. Design System & CSS Architecture
Color System (Final Locked Palette)

Primary Yellow (Action / Value):

--yellow-primary: #FFB703

--yellow-light: #FFD66B

--yellow-soft: #FFF1A8

Dark Surfaces (Trust / Focus):

--black-main: #121212

--black-soft: #1A1A1A

--black-deep: #0E0E0E

Neutral / Text:

--white-main: #FFFFFF

--gray-soft: #BDBDBD

Gradients:

--yellow-gradient: linear-gradient(135deg, #FFB703, #FFF1A8);
--dark-gradient: linear-gradient(135deg, #121212, #1E1E1E);

Typography System

Heading / Editorial Font:

Playfair Display

Usage: Hero titles, category names, section headings

Weights: 600, 700

UI / Body Font:

Inter

Usage: Navigation, buttons, descriptions, filters, bids

Weights: 400, 500, 600

font-family:
Headings → "Playfair Display", serif;
Body/UI → "Inter", sans-serif;

Visual Patterns & Effects

Design Patterns Used:

Bold yellow hero sections

Dark immersive backgrounds

Editorial category blocks

Soft depth using contrast (not heavy shadows)

Optional Effects (Used Sparingly):

Subtle glow on live bids:

text-shadow: 0 0 8px rgba(255,183,3,0.4);


Card hover lift:

transform: translateY(-4px);

3. Global Components
Navigation (Header)

Sticky header

Yellow gradient background

Dark text/icons

Centered logo (Ankand)

Right-side CTA: Join Live

Mobile:

Slide-in menu

High contrast buttons

Buttons

.btn-primary → Yellow background, dark text

.btn-dark → Dark background, yellow text

.btn-outline → Yellow border, transparent fill

Cards (Auction Items)

Dark surface cards

Rounded corners (16–18px)

Yellow status labels:

LIVE NOW

ENDING SOON

HOT BID

4. Page Structures
A. Homepage (index.html)

Hero Section

Full-width yellow gradient

Headline: Live Auctions with Real-Time Competitive Bidding

Subtext explaining curated auctions

Live Auctions

3–4 featured lots

Countdown / status emphasis

Why Ankand

Trust, verification, secure bidding

Editorial layout

B. Category Pages (categories.html)

Editorial grid inspired by museum tiles

Each category block:

Solid background color

Playfair Display titles

Circular image cutout

Examples:

Art

Asian & Tribal Art

Coins & Stamps

Watches, Pens & Lighters

Wine, Whisky & Spirits

C. Live Auctions (live.html)

Dark immersive layout

Yellow highlights on:

Timers

Current bid price

Sticky bidding panel

D. Item Detail Page (item.html)

Large item imagery

Bid panel on right

Bid history list

Trust indicators

E. About & Contact

About

Story of Ankand

Focus on curation, trust, value

Contact

Minimal form

Dark background with yellow highlights

5. Key Functionality (JavaScript)
Core Systems

Auction Data Store

Item ID

Current bid

Bid history

End time

Category

Live Bid Updates

Real-time UI updates

Highlight price changes

Filters

Category-based filtering

“Ending Soon” priority

User Interaction

Watchlist

Join live auction

Sticky header behavior

6. Responsive & Accessibility Rules

Mobile-first layout

No fixed widths

Minimum touch target: 44px

High contrast for yellow-on-dark

No overflow on any device

7. Final AI Generation Prompt (Clean)

“Create a premium online auction website named ‘Ankand’ with the tagline ‘Gjeni & Shitet’.
Use a dark-mode, yellow-dominant luxury theme with bold yellow gradients (#FFB703 → #FFF1A8) and deep dark surfaces (#121212).
Apply Playfair Display for editorial headings and Inter for UI text.
Design a sticky yellow header with a logo featuring a price tag and rising bid arrow.
Include curated category grids, live auction sections, dark auction cards with yellow bid highlights, and real-time bidding emphasis.
The design must feel like a modern auction house: trusted, curated, and competitive.”