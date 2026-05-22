// Unsplash image base
const U = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export interface Room {
  id: string; roomNo: string;
  type: 'Single' | 'Bedsitter' | '1BR' | '2BR';
  price: number; status: 'free' | 'pending' | 'taken'; floor: number;
}
export interface Review {
  id: string; studentName: string; rating: number; body: string; date: string;
}
export interface Accommodation {
  id: string; name: string; description: string; address: string;
  distanceM: number; lat: number; lng: number; amenities: string[];
  contactPhone: string; contactWhatsapp: string;
  landlordName: string; landlordInitial: string;
  images: string[]; coverImage: string;
  avgRating: number; reviewCount: number;
  rooms: Room[]; reviews: Review[];
  isVerified: boolean; priceRange: [number, number];
  type: 'Studio' | 'Apartment' | 'Hostel'; featured: boolean;
  neighborhood: string;
}

export const accommodations: Accommodation[] = [
  {
    id: 'heri-homes',
    name: 'Heri Homes Athi River',
    description: 'Modern student-friendly apartments just minutes from Daystar University. Spacious rooms with excellent natural lighting, reliable water supply, and 24-hour security. Includes a common study area and laundry facilities.',
    address: 'Mombasa Road, Athi River',
    neighborhood: 'Athi River',
    distanceM: 450, lat: -1.4725, lng: 37.0045,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'Parking', 'CCTV', 'Study Room'],
    contactPhone: '+254 712 345 678', contactWhatsapp: '+254712345678',
    landlordName: 'James Kariuki', landlordInitial: 'JK',
    images: [
      U('1545324418-cc1a3fa10c00'),
      U('1522708323590-d24dbb6b0267'),
      U('1555041469-a586c61ea9bc'),
    ],
    coverImage: U('1545324418-cc1a3fa10c00'),
    avgRating: 4.6, reviewCount: 23,
    type: 'Apartment', featured: true,
    rooms: [
      { id: 'hh-101', roomNo: 'A101', type: 'Bedsitter', price: 7500, status: 'free', floor: 1 },
      { id: 'hh-102', roomNo: 'A102', type: 'Bedsitter', price: 7500, status: 'taken', floor: 1 },
      { id: 'hh-201', roomNo: 'B201', type: '1BR', price: 12000, status: 'free', floor: 2 },
      { id: 'hh-202', roomNo: 'B202', type: '1BR', price: 12000, status: 'pending', floor: 2 },
      { id: 'hh-301', roomNo: 'C301', type: '2BR', price: 18000, status: 'free', floor: 3 },
    ],
    reviews: [
      { id: 'r1', studentName: 'Mary W.', rating: 5, body: 'Great location, very close to campus. Security is excellent and water never goes off.', date: '2026-03-15' },
      { id: 'r2', studentName: 'Peter K.', rating: 4, body: 'Good value for money. WiFi can be slow during peak hours but overall a solid place.', date: '2026-02-20' },
      { id: 'r3', studentName: 'Cynthia A.', rating: 5, body: 'Loved the study room — perfect for revision. Will definitely renew my lease.', date: '2026-01-10' },
    ],
    isVerified: true, priceRange: [7500, 18000],
  },
  {
    id: 'rawa-apartments',
    name: 'Rawa Apartments',
    description: 'Premium apartments with modern finishes along the Namanga highway. Each unit comes fully fitted with a kitchenette, hot shower, and tiled floors. Ideal for students who value comfort and privacy.',
    address: 'Namanga Rd, Athi River',
    neighborhood: 'Athi River',
    distanceM: 800, lat: -1.4780, lng: 37.0090,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'Parking', 'Generator', 'Hot Shower'],
    contactPhone: '+254 723 456 789', contactWhatsapp: '+254723456789',
    landlordName: 'Susan Muthoni', landlordInitial: 'SM',
    images: [
      U('1586023492125-27b2c045efd7'),
      U('1616594039964-ae9021a400a0'),
      U('1484154218962-a197022b5858'),
    ],
    coverImage: U('1586023492125-27b2c045efd7'),
    avgRating: 4.8, reviewCount: 31,
    type: 'Apartment', featured: true,
    rooms: [
      { id: 'ra-a1', roomNo: '1A', type: 'Single', price: 6000, status: 'free', floor: 1 },
      { id: 'ra-a2', roomNo: '1B', type: 'Bedsitter', price: 8500, status: 'free', floor: 1 },
      { id: 'ra-b1', roomNo: '2A', type: '1BR', price: 14000, status: 'taken', floor: 2 },
      { id: 'ra-b2', roomNo: '2B', type: '1BR', price: 14000, status: 'free', floor: 2 },
    ],
    reviews: [
      { id: 'r4', studentName: 'Angela M.', rating: 5, body: 'Best apartments near Daystar! Hot shower and generator backup make it worth every shilling.', date: '2026-04-01' },
      { id: 'r5', studentName: 'Brian O.', rating: 5, body: 'Very clean and well-maintained. The landlord is responsive and friendly.', date: '2026-03-10' },
    ],
    isVerified: true, priceRange: [6000, 14000],
  },
  {
    id: 'ob-hostels',
    name: 'OB Student Hostels',
    description: 'Purpose-built student hostel offering affordable accommodation with shared amenities. Located within walking distance of campus with a vibrant student community. Common kitchen and TV lounge available.',
    address: 'Off Mombasa Rd, Athi River',
    neighborhood: 'Athi River',
    distanceM: 350, lat: -1.4735, lng: 37.0055,
    amenities: ['Security', 'Common Kitchen', 'TV Lounge', 'Water 24/7', 'Laundry'],
    contactPhone: '+254 734 567 890', contactWhatsapp: '+254734567890',
    landlordName: 'Oscar Barasa', landlordInitial: 'OB',
    images: [
      U('1560448204-e02f11c3d0e2'),
      U('1502672260266-1c1ef2d93688'),
      U('1595526114035-0d45ed16cfbf'),
    ],
    coverImage: U('1560448204-e02f11c3d0e2'),
    avgRating: 4.2, reviewCount: 45,
    type: 'Hostel', featured: false,
    rooms: [
      { id: 'ob-1', roomNo: 'G01', type: 'Single', price: 5000, status: 'free', floor: 0 },
      { id: 'ob-2', roomNo: 'G02', type: 'Single', price: 5000, status: 'taken', floor: 0 },
      { id: 'ob-3', roomNo: '101', type: 'Bedsitter', price: 7000, status: 'free', floor: 1 },
      { id: 'ob-4', roomNo: '102', type: 'Bedsitter', price: 7000, status: 'free', floor: 1 },
    ],
    reviews: [
      { id: 'r6', studentName: 'Dennis K.', rating: 4, body: 'Cheapest option near campus. Basic but clean. The common kitchen is a lifesaver.', date: '2026-04-10' },
      { id: 'r7', studentName: 'Faith N.', rating: 4, body: 'Good community vibe. Made lots of friends here. Wish they had WiFi though.', date: '2026-01-25' },
    ],
    isVerified: true, priceRange: [5000, 7000],
  },
  {
    id: 'greenview-courts',
    name: 'Greenview Courts',
    description: 'Quiet residential compound ideal for focused students. Features well-maintained gardens, ample parking, and a serene environment away from highway noise. Each unit has its own balcony.',
    address: 'Mavoko, Athi River',
    neighborhood: 'Mavoko',
    distanceM: 1200, lat: -1.4690, lng: 37.0120,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'Parking', 'Garden', 'Balcony'],
    contactPhone: '+254 745 678 901', contactWhatsapp: '+254745678901',
    landlordName: 'Grace Wanjiku', landlordInitial: 'GW',
    images: [
      U('1522771739844-12f5d81cd6a0'),
      U('1540518614846-7eded433c457'),
      U('1434030216411-0b793f4b4173'),
    ],
    coverImage: U('1522771739844-12f5d81cd6a0'),
    avgRating: 4.4, reviewCount: 18,
    type: 'Apartment', featured: false,
    rooms: [
      { id: 'gv-1', roomNo: 'A1', type: '1BR', price: 10000, status: 'free', floor: 1 },
      { id: 'gv-2', roomNo: 'A2', type: '1BR', price: 10000, status: 'taken', floor: 1 },
      { id: 'gv-3', roomNo: 'B1', type: '2BR', price: 16000, status: 'free', floor: 1 },
    ],
    reviews: [
      { id: 'r8', studentName: 'Lilian A.', rating: 5, body: 'So peaceful! Perfect for studying. The garden is beautiful and the balcony has a great view.', date: '2026-02-14' },
    ],
    isVerified: true, priceRange: [10000, 16000],
  },
  {
    id: 'safari-heights',
    name: 'Safari Heights Apartments',
    description: 'Modern high-rise apartments with panoramic views of the Athi River plains. Features a rooftop terrace, high-speed elevator, and underground parking. Premium finishes throughout.',
    address: 'Athi River Township',
    neighborhood: 'Athi River',
    distanceM: 950, lat: -1.4760, lng: 37.0030,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'CCTV', 'Elevator', 'Rooftop Terrace', 'Parking'],
    contactPhone: '+254 756 789 012', contactWhatsapp: '+254756789012',
    landlordName: 'David Otieno', landlordInitial: 'DO',
    images: [
      U('1536376879495-31cf7b16a842'),
      U('1512917774080-9991f1c4c750'),
      U('1556909114-f6e7ad7d3136'),
    ],
    coverImage: U('1536376879495-31cf7b16a842'),
    avgRating: 4.7, reviewCount: 12,
    type: 'Apartment', featured: true,
    rooms: [
      { id: 'sh-1', roomNo: '501', type: '1BR', price: 15000, status: 'free', floor: 5 },
      { id: 'sh-2', roomNo: '502', type: '2BR', price: 22000, status: 'free', floor: 5 },
      { id: 'sh-3', roomNo: '601', type: '2BR', price: 25000, status: 'taken', floor: 6 },
    ],
    reviews: [
      { id: 'r9', studentName: 'Alex M.', rating: 5, body: 'Premium living! The rooftop terrace is amazing for evening study sessions with a view.', date: '2026-03-28' },
    ],
    isVerified: true, priceRange: [15000, 25000],
  },
  {
    id: 'campus-edge',
    name: 'Campus Edge Studios',
    description: 'Compact studio apartments designed specifically for students. Each studio is self-contained with a kitchenette and bathroom. Located at the closest point to Daystar main gate.',
    address: 'Daystar Road, Athi River',
    neighborhood: 'Daystar Gate',
    distanceM: 200, lat: -1.4738, lng: 37.0062,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'Furnished', 'CCTV'],
    contactPhone: '+254 767 890 123', contactWhatsapp: '+254767890123',
    landlordName: 'Ruth Kamau', landlordInitial: 'RK',
    images: [
      U('1595526114035-0d45ed16cfbf'),
      U('1484154218962-a197022b5858'),
      U('1540518614846-7eded433c457'),
    ],
    coverImage: U('1595526114035-0d45ed16cfbf'),
    avgRating: 4.5, reviewCount: 37,
    type: 'Studio', featured: true,
    rooms: [
      { id: 'ce-1', roomNo: 'S01', type: 'Bedsitter', price: 9000, status: 'taken', floor: 1 },
      { id: 'ce-2', roomNo: 'S02', type: 'Bedsitter', price: 9000, status: 'free', floor: 1 },
      { id: 'ce-3', roomNo: 'S03', type: 'Bedsitter', price: 9000, status: 'free', floor: 1 },
      { id: 'ce-4', roomNo: 'S04', type: 'Single', price: 6500, status: 'free', floor: 0 },
    ],
    reviews: [
      { id: 'r10', studentName: 'Joan W.', rating: 5, body: 'Literally 2 minutes from class! Rooms are small but well-designed.', date: '2026-04-05' },
      { id: 'r11', studentName: 'Samuel T.', rating: 4, body: 'Convenient and affordable. The furnishing saved me a lot of setup costs.', date: '2026-03-01' },
    ],
    isVerified: true, priceRange: [6500, 9000],
  },
  {
    id: 'riverside-haven',
    name: 'Riverside Haven',
    description: 'Family-style apartments in a gated community with beautiful landscaping. Features a BBQ zone and community hall. Popular among postgraduate students and young professionals.',
    address: 'River Road, Athi River',
    neighborhood: 'Riverside',
    distanceM: 1500, lat: -1.4700, lng: 37.0150,
    amenities: ['WiFi', 'Water 24/7', 'Security', 'Parking', 'Garden', 'BBQ Area', 'Generator'],
    contactPhone: '+254 778 901 234', contactWhatsapp: '+254778901234',
    landlordName: 'Michael Njoroge', landlordInitial: 'MN',
    images: [
      U('1502672260266-1c1ef2d93688'),
      U('1616486338812-3dadae4b4ace'),
      U('1555041469-a586c61ea9bc'),
    ],
    coverImage: U('1502672260266-1c1ef2d93688'),
    avgRating: 4.3, reviewCount: 9,
    type: 'Apartment', featured: false,
    rooms: [
      { id: 'rh-1', roomNo: 'H1', type: '1BR', price: 11000, status: 'free', floor: 1 },
      { id: 'rh-2', roomNo: 'H2', type: '2BR', price: 17000, status: 'free', floor: 1 },
      { id: 'rh-3', roomNo: 'H3', type: '2BR', price: 17000, status: 'taken', floor: 2 },
    ],
    reviews: [
      { id: 'r12', studentName: 'Esther L.', rating: 4, body: 'Great for couples or postgrads who need more space. The BBQ area is a nice touch.', date: '2026-02-28' },
    ],
    isVerified: true, priceRange: [11000, 17000],
  },
  {
    id: 'unity-flats',
    name: 'Unity Flats',
    description: 'Budget-friendly flats perfect for first-year students. Simple, clean, and functional with everything you need. The building has a caretaker on-site 24/7 and a water tank backup.',
    address: 'Market Street, Athi River',
    neighborhood: 'Athi River',
    distanceM: 650, lat: -1.4755, lng: 37.0075,
    amenities: ['Water 24/7', 'Security', 'Common Kitchen', 'Caretaker'],
    contactPhone: '+254 789 012 345', contactWhatsapp: '+254789012345',
    landlordName: 'John Mutua', landlordInitial: 'JM',
    images: [
      U('1554995207-c18c203602cb'),
      U('1505691938895-1758d7feb511'),
      U('1522708323590-d24dbb6b0267'),
    ],
    coverImage: U('1554995207-c18c203602cb'),
    avgRating: 4.0, reviewCount: 28,
    type: 'Hostel', featured: false,
    rooms: [
      { id: 'uf-1', roomNo: 'F1', type: 'Single', price: 4500, status: 'free', floor: 1 },
      { id: 'uf-2', roomNo: 'F2', type: 'Single', price: 4500, status: 'free', floor: 1 },
      { id: 'uf-3', roomNo: 'F3', type: 'Bedsitter', price: 6000, status: 'taken', floor: 2 },
      { id: 'uf-4', roomNo: 'F4', type: 'Bedsitter', price: 6000, status: 'free', floor: 2 },
    ],
    reviews: [
      { id: 'r13', studentName: 'Victor O.', rating: 4, body: 'Best budget option. The caretaker is very helpful and the water tank backup is reliable.', date: '2026-03-20' },
      { id: 'r14', studentName: 'Christine M.', rating: 4, body: 'Simple and clean. No frills but gets the job done for the price.', date: '2026-01-15' },
    ],
    isVerified: true, priceRange: [4500, 6000],
  },
  {
    id: 'the-atrium',
    name: 'The Atrium Studios',
    description: 'Modern architectural studio in Nairobi West featuring clean white lines, minimalist built-in wooden desks, and an en-suite bathroom. Flooded with natural daylight from large windows.',
    address: 'Nairobi West, Nairobi',
    neighborhood: 'Nairobi West',
    distanceM: 0, lat: -1.3027, lng: 36.8219,
    amenities: ['WiFi', 'Gym', '24/7 Security', 'Rooftop', 'En-suite', 'CCTV'],
    contactPhone: '+254 700 111 222', contactWhatsapp: '+254700111222',
    landlordName: 'Amara Osei', landlordInitial: 'AO',
    images: [
      U('1618220179428-22790b461013'),
      U('1616594039964-ae9021a400a0'),
      U('1522771739844-12f5d81cd6a0'),
    ],
    coverImage: U('1618220179428-22790b461013'),
    avgRating: 4.9, reviewCount: 19,
    type: 'Studio', featured: true,
    rooms: [
      { id: 'at-1', roomNo: '101', type: 'Bedsitter', price: 45000, status: 'free', floor: 1 },
      { id: 'at-2', roomNo: '201', type: '1BR', price: 55000, status: 'free', floor: 2 },
      { id: 'at-3', roomNo: '301', type: '1BR', price: 58000, status: 'taken', floor: 3 },
    ],
    reviews: [
      { id: 'r15', studentName: 'Amina J.', rating: 5, body: 'StayEasy made my move from Mombasa to Nairobi incredibly smooth. The security is top-notch.', date: '2026-04-20' },
      { id: 'r16', studentName: 'Kevin O.', rating: 5, body: 'Quality as seen in photos. No surprises. Concierge team very helpful.', date: '2026-03-15' },
    ],
    isVerified: true, priceRange: [45000, 58000],
  },
  {
    id: 'skyline-residency',
    name: 'Skyline Residency',
    description: 'Sophisticated two-bedroom apartments in Athi River with open-plan living, sleek modern kitchen, granite countertops, and designer pendant lighting. Decorated with contemporary African art.',
    address: 'Athi River Township',
    neighborhood: 'Athi River',
    distanceM: 600, lat: -1.4762, lng: 37.0035,
    amenities: ['WiFi', 'Backup Generator', 'Borehole', 'Parking', 'Security', 'CCTV'],
    contactPhone: '+254 700 222 333', contactWhatsapp: '+254700222333',
    landlordName: 'Nadia Weru', landlordInitial: 'NW',
    images: [
      U('1512917774080-9991f1c4c750'),
      U('1536376879495-31cf7b16a842'),
      U('1556909114-f6e7ad7d3136'),
    ],
    coverImage: U('1512917774080-9991f1c4c750'),
    avgRating: 4.6, reviewCount: 14,
    type: 'Apartment', featured: true,
    rooms: [
      { id: 'sk-1', roomNo: 'A1', type: '2BR', price: 32000, status: 'free', floor: 1 },
      { id: 'sk-2', roomNo: 'A2', type: '2BR', price: 32000, status: 'taken', floor: 1 },
      { id: 'sk-3', roomNo: 'B1', type: '1BR', price: 22000, status: 'free', floor: 2 },
    ],
    reviews: [
      { id: 'r17', studentName: 'Sarah W.', rating: 5, body: 'Finally a platform that understands what students need: fast wifi, proximity to transport, fair prices.', date: '2026-04-12' },
    ],
    isVerified: true, priceRange: [22000, 32000],
  },
  {
    id: 'maven-suites',
    name: 'The Maven Suites',
    description: 'Exclusive premium suites in Kilimani featuring private balconies, high-end hardwood flooring, and floor-to-ceiling bookshelves. Directional sunlight creates a beautiful study environment.',
    address: 'Kilimani, Nairobi',
    neighborhood: 'Kilimani',
    distanceM: 0, lat: -1.2925, lng: 36.7838,
    amenities: ['WiFi', 'Elevator', 'Cafe Onsite', 'Concierge', 'Gym', 'Parking', 'Security'],
    contactPhone: '+254 700 333 444', contactWhatsapp: '+254700333444',
    landlordName: 'Felix Ochieng', landlordInitial: 'FO',
    images: [
      U('1560185007-cde436f6a4d0'),
      U('1502005229762-c7c9cdf93a8e'),
      U('1484154218962-a197022b5858'),
    ],
    coverImage: U('1560185007-cde436f6a4d0'),
    avgRating: 4.8, reviewCount: 22,
    type: 'Apartment', featured: true,
    rooms: [
      { id: 'mv-1', roomNo: '401', type: '1BR', price: 55000, status: 'free', floor: 4 },
      { id: 'mv-2', roomNo: '402', type: '2BR', price: 75000, status: 'free', floor: 4 },
      { id: 'mv-3', roomNo: '501', type: '1BR', price: 58000, status: 'taken', floor: 5 },
    ],
    reviews: [
      { id: 'r18', studentName: 'Tracy M.', rating: 5, body: 'The cafe onsite is a game changer. Amazing quality finishes throughout.', date: '2026-03-30' },
      { id: 'r19', studentName: 'James N.', rating: 5, body: 'Worth every shilling. The concierge handles everything — maintenance to courier.', date: '2026-02-25' },
    ],
    isVerified: true, priceRange: [55000, 75000],
  },
  {
    id: 'valley-view',
    name: 'Valley View Park',
    description: 'Serene gated estate 1.2km from Daystar main campus. Features landscaped gardens, shuttle access, high-speed fiber internet, and 24/7 security. Perfect for students who prefer a quiet environment.',
    address: 'Valley View Estate, Athi River',
    neighborhood: 'Valley View',
    distanceM: 1200, lat: -1.4715, lng: 37.0080,
    amenities: ['WiFi Fiber', 'Shuttle', 'Security', 'Garden', 'Parking', 'Water 24/7', 'Generator'],
    contactPhone: '+254 700 444 555', contactWhatsapp: '+254700444555',
    landlordName: 'Patricia Mwangi', landlordInitial: 'PM',
    images: [
      U('1493809842364-78817add7ffb'),
      U('1513694203232-719a6ca45070'),
      U('1522708323590-d24dbb6b0267'),
    ],
    coverImage: U('1493809842364-78817add7ffb'),
    avgRating: 4.5, reviewCount: 16,
    type: 'Apartment', featured: false,
    rooms: [
      { id: 'vv-1', roomNo: 'V101', type: '1BR', price: 13000, status: 'free', floor: 1 },
      { id: 'vv-2', roomNo: 'V102', type: '1BR', price: 13000, status: 'free', floor: 1 },
      { id: 'vv-3', roomNo: 'V201', type: '2BR', price: 19000, status: 'taken', floor: 2 },
      { id: 'vv-4', roomNo: 'V202', type: '2BR', price: 19000, status: 'free', floor: 2 },
    ],
    reviews: [
      { id: 'r20', studentName: 'Daniel K.', rating: 5, body: 'Shuttle to campus is a lifesaver! The fiber internet is blazing fast for online classes.', date: '2026-04-08' },
      { id: 'r21', studentName: 'Mercy W.', rating: 4, body: 'Peaceful environment. Great for focused study sessions.', date: '2026-03-05' },
    ],
    isVerified: true, priceRange: [13000, 19000],
  },
];

export const getAccommodation = (id: string) => accommodations.find(a => a.id === id);
export const getFeatured = () => accommodations.filter(a => a.featured);
export const roomTypes = ['Single', 'Bedsitter', '1BR', '2BR'] as const;
export const propertyTypes = ['Studio', 'Apartment', 'Hostel'] as const;
