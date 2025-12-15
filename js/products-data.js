// Product Database
const PRODUCTS_DATA = {
    'rolex-submariner': {
        id: 'rolex-submariner',
        name: '1965 Rolex Submariner Ref. 5513',
        shortName: '1965 Rolex Submariner',
        category: 'Luxury Watches',
        mainImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611694440008-1b0f1c6bb7bb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=600&fit=crop'
        ],
        currentBid: 12500,
        bidCount: 23,
        endTime: '2025-12-14T18:00:00',
        description: 'An exceptional example of the iconic Rolex Submariner from 1965. This reference 5513 features the coveted "meters first" dial and original tritium indices that have developed a beautiful patina over the decades. The case retains sharp lugs with minimal polishing, and the original 7206 riveted bracelet adds to its collectibility. Complete with original box, papers, and service history.',
        specs: {
            'Brand': 'Rolex',
            'Year': '1965',
            'Case Size': '40mm',
            'Condition': 'Excellent'
        },
        included: [
            'Original Box',
            'Papers & Certificate',
            'Original Bracelet',
            'Service History'
        ],
        related: ['omega-speedmaster', 'patek-calatrava', 'cartier-tank']
    },
    'abstract-painting': {
        id: 'abstract-painting',
        name: 'Abstract Expressionist Oil on Canvas',
        shortName: 'Abstract Expressionist Oil',
        category: 'Fine Art',
        mainImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=600&fit=crop'
        ],
        currentBid: 8200,
        bidCount: 15,
        endTime: '2025-12-15T12:00:00',
        description: 'Original oil on canvas by renowned Albanian artist, signed and dated 1978. This powerful abstract expressionist work showcases bold brushwork and a vibrant color palette. The piece has been professionally cleaned and relined, and comes with a certificate of authenticity from a leading art expert.',
        specs: {
            'Artist': 'Albanian Master',
            'Year': '1978',
            'Medium': 'Oil on Canvas',
            'Size': '120 x 90 cm'
        },
        included: [
            'Certificate of Authenticity',
            'Professional Cleaning',
            'Relining',
            'Provenance Documentation'
        ],
        related: ['rolex-submariner', 'diamond-necklace']
    },
    'diamond-necklace': {
        id: 'diamond-necklace',
        name: 'Art Deco Diamond Necklace',
        shortName: 'Art Deco Diamond Necklace',
        category: 'Jewelry',
        mainImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=600&fit=crop'
        ],
        currentBid: 24800,
        bidCount: 31,
        endTime: '2025-12-16T20:00:00',
        description: 'Stunning 1920s platinum and diamond necklace with original certification. Features approximately 15 carats of old European cut diamonds set in an intricate Art Deco design. The piece has been professionally restored and comes with updated gemological certification.',
        specs: {
            'Era': '1920s Art Deco',
            'Material': 'Platinum',
            'Diamonds': '~15 carats',
            'Condition': 'Restored'
        },
        included: [
            'Original Certification',
            'Updated Gemological Report',
            'Professional Restoration',
            'Period Display Box'
        ],
        related: ['rolex-submariner', 'ferrari-250']
    },
    'ferrari-250': {
        id: 'ferrari-250',
        name: '1962 Ferrari 250 GTO',
        shortName: '1962 Ferrari 250 GTO',
        category: 'Classic Cars',
        mainImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop'
        ],
        currentBid: 485000,
        bidCount: 47,
        endTime: '2025-12-13T20:00:00',
        description: 'Matching numbers, full restoration documentation. One of only 39 examples built, this 250 GTO has impeccable provenance and has been meticulously maintained. Recent full mechanical restoration by Ferrari Classiche with complete documentation.',
        specs: {
            'Make': 'Ferrari',
            'Year': '1962',
            'Engine': '3.0L V12',
            'Production': '39 units'
        },
        included: [
            'Ferrari Classiche Certification',
            'Full Restoration Documentation',
            'Original Manuals',
            'Complete Service History'
        ],
        related: ['rolex-submariner', 'diamond-necklace']
    },
    'ottoman-bureau': {
        id: 'ottoman-bureau',
        name: '18th Century Ottoman Bureau',
        shortName: '18th Century Ottoman Bureau',
        category: 'Antiques',
        mainImage: 'https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1551817958-20204d6ab212?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop'
        ],
        currentBid: 6750,
        bidCount: 12,
        endTime: '2025-12-17T15:00:00',
        description: 'Rare inlaid walnut desk with provenance. Exceptional example of Ottoman craftsmanship featuring intricate mother-of-pearl and ivory inlay work. Complete with authenticated provenance tracing ownership back to 1820.',
        specs: {
            'Period': '18th Century',
            'Origin': 'Ottoman Empire',
            'Material': 'Walnut & Inlay',
            'Condition': 'Excellent'
        },
        included: [
            'Provenance Documentation',
            'Authentication Certificate',
            'Restoration Report',
            'Export Permits'
        ],
        related: ['diamond-necklace', 'leica-m3']
    },
    'leica-m3': {
        id: 'leica-m3',
        name: 'Leica M3 Double Stroke',
        shortName: 'Leica M3 Double Stroke',
        category: 'Cameras',
        mainImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1606510907355-cbd0b55fd7b6?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop'
        ],
        currentBid: 3400,
        bidCount: 8,
        endTime: '2025-12-18T10:00:00',
        description: 'Pristine condition with original Summicron lens. Early production double-stroke M3 in exceptional condition. Complete with original 50mm f/2 Summicron lens, both lens caps, and original ever-ready case.',
        specs: {
            'Brand': 'Leica',
            'Model': 'M3 Double Stroke',
            'Year': '1954-1957',
            'Lens': '50mm f/2 Summicron'
        },
        included: [
            'Original Summicron Lens',
            'Original Lens Caps',
            'Ever-Ready Case',
            'Service Documentation'
        ],
        related: ['rolex-submariner', 'ottoman-bureau']
    },
    'omega-speedmaster': {
        id: 'omega-speedmaster',
        name: '1969 Omega Speedmaster',
        shortName: '1969 Omega Speedmaster',
        category: 'Luxury Watches',
        mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611694440008-1b0f1c6bb7bb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=600&fit=crop'
        ],
        currentBid: 8900,
        bidCount: 17,
        endTime: '2025-12-19T14:00:00',
        description: 'Moon watch with original box and papers. Pre-moon landing Speedmaster Professional with all original parts. Complete set with Extract from Archives.',
        specs: {
            'Brand': 'Omega',
            'Year': '1969',
            'Movement': 'Caliber 321',
            'Condition': 'Original'
        },
        included: [
            'Original Box',
            'Original Papers',
            'Extract from Archives',
            'Service History'
        ],
        related: ['rolex-submariner', 'patek-calatrava']
    },
    'patek-calatrava': {
        id: 'patek-calatrava',
        name: 'Patek Philippe Calatrava',
        shortName: 'Patek Philippe Calatrava',
        category: 'Luxury Watches',
        mainImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611694440008-1b0f1c6bb7bb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=600&fit=crop'
        ],
        currentBid: 28400,
        bidCount: 42,
        endTime: '2025-12-20T16:00:00',
        description: 'Vintage dress watch in yellow gold. Iconic Calatrava with hobnail bezel pattern. All original with archive extract.',
        specs: {
            'Brand': 'Patek Philippe',
            'Material': 'Yellow Gold',
            'Case Size': '35mm',
            'Condition': 'Excellent'
        },
        included: [
            'Archive Extract',
            'Original Box',
            'Service Papers',
            'Authentication Letter'
        ],
        related: ['rolex-submariner', 'omega-speedmaster']
    },
    'cartier-tank': {
        id: 'cartier-tank',
        name: 'Cartier Tank Française',
        shortName: 'Cartier Tank Française',
        category: 'Luxury Watches',
        mainImage: 'https://images.unsplash.com/photo-1548171916-c8fd5a41f5f4?w=800&h=600&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1548171916-c8fd5a41f5f4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611694440008-1b0f1c6bb7bb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=600&fit=crop'
        ],
        currentBid: 5600,
        bidCount: 9,
        endTime: '2025-12-21T11:00:00',
        description: 'Steel bracelet watch with box and papers. Classic Tank Française in stainless steel with integrated bracelet.',
        specs: {
            'Brand': 'Cartier',
            'Material': 'Stainless Steel',
            'Movement': 'Quartz',
            'Condition': 'Mint'
        },
        included: [
            'Original Box',
            'Papers',
            'Service Card',
            'Extra Links'
        ],
        related: ['rolex-submariner', 'patek-calatrava']
    }
};
