const sampleData = {
  products: [
    {
      name: 'Chroma Case',
      slug: 'chroma-case',
      category: 'Classic Cases',
      description: 'Caixa com skins vibrantes e acabamentos raros de facas',
      images: ['/images/cs-cases/case1.png'],
      price: 2.99,
      brand: 'Chroma Series',
      rating: 4.7,
      numReviews: 15,
      stock: 100,
      isFeatured: true,
      banner: 'banner-chroma.jpg',
    },
    {
      name: 'Operation Broken Fang Case',
      slug: 'operation-broken-fang-case',
      category: 'Operation Cases',
      description: 'Skins exclusivas da operação e luvas únicas',
      images: ['/images/cs-cases/case2.png'],
      price: 7.49,
      brand: 'Operation Broken Fang',
      rating: 4.8,
      numReviews: 23,
      stock: 75,
      isFeatured: true,
      banner: 'banner-operation.jpg',
    },
    {
      name: 'Prisma 2 Case',
      slug: 'prisma-2-case',
      category: 'Premium Cases',
      description: 'Designs modernos com acabamentos holográficos',
      images: ['/images/cs-cases/case3.png'],
      price: 4.99,
      brand: 'Prisma Series',
      rating: 4.9,
      numReviews: 34,
      stock: 0,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Fracture Case',
      slug: 'fracture-case',
      category: 'Special Event Cases',
      description: 'Padrões de vidro quebrado e agentes raros',
      images: ['/images/cs-cases/case4.png'],
      price: 3.49,
      brand: 'Shattered Web',
      rating: 4.5,
      numReviews: 47,
      stock: 200,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'Gamma 2 Case',
      slug: 'gamma-2-case',
      category: 'Classic Cases',
      description: 'Skins neon brilhantes com acabamentos Gamma',
      images: ['/images/cs-cases/case5.png'],
      price: 5.99,
      brand: 'Gamma Series',
      rating: 4.6,
      numReviews: 29,
      stock: 150,
      isFeatured: false,
      banner: null,
    },
    {
      name: 'CS:GO Weapon Case 3',
      slug: 'csgo-weapon-case-3',
      category: 'Classic Cases',
      description: 'Skins clássicas de armas com designs nostálgicos',
      images: ['/images/cs-cases/case6.png'],
      price: 1.99,
      brand: 'Valve Original',
      rating: 4.3,
      numReviews: 89,
      stock: 300,
      isFeatured: true,
      banner: null,
    },
  ],
  skins: [
    {
      name: 'Asiimov',
      weapon: 'AK-47',
      slug: 'ak-47-asiimov',
      description:
        'The Asiimov skin for the AK-47 is a futuristic design featuring sleek white and orange patterns, inspired by sci-fi aesthetics. Its clean, high-tech look makes it a favorite among players who appreciate a modern and stylish appearance for their weapon. Perfect for dominating the battlefield with both power and style.',
      image: '/images/cs-skins/1.png',
      rarity: 'ancient',
    },
    {
      name: 'Hieroglyph',
      weapon: 'XM1014',
      slug: 'xm1014-hieroglyph',
      description:
        'The Hieroglyph skin for the XM1014 shotgun showcases ancient Egyptian-inspired designs, with intricate carvings and symbols etched into the weapon. This skin combines historical artistry with modern firepower, making it a unique choice for players who want to stand out on the battlefield.',
      image: '/images/cs-skins/3.png',
    },
    {
      name: 'Asiimov',
      weapon: 'AWP',
      slug: 'awp-asiimov',
      description:
        'The Asiimov skin for the AWP sniper rifle continues the futuristic theme with its striking white and orange color scheme. Known for its precision and power, the AWP becomes even more intimidating with this sleek, high-tech design. A must-have for sharpshooters who value both performance and aesthetics.',
      image: '/images/cs-skins/2.png',
      rarity: 'ancient',
    },
    {
      name: 'Mayan Dreams',
      weapon: 'SSG 08',
      slug: 'ssg-08-mayan-dreams',
      description:
        'The Mayan Dreams skin for the SSG 08 sniper rifle features vibrant colors and intricate patterns inspired by ancient Mayan art. This skin brings a touch of history and culture to the battlefield, making it a unique and eye-catching choice for players who appreciate artistic designs.',
      image: '/images/cs-skins/4.png',
      rarity: 'uncommon',
    },
    {
      name: 'Autotronic',
      weapon: 'Bayonet',
      slug: 'bayonet-autotronic',
      description:
        'The Autotronic skin for the Bayonet knife features a sleek, metallic design with red and black accents, giving it a robotic and futuristic appearance. This skin is perfect for players who want a knife that looks as sharp and deadly as it performs in close-quarters combat.',
      image: '/images/cs-skins/5.png',
      rarity: 'ancient',
    },
    {
      name: 'Calligraffiti',
      weapon: 'Desert Eagle',
      slug: 'desert-eagle-calligraffiti',
      description: '',
      image: '/images/cs-skins/6.png',
      stattrak: true,
      rarity: 'rare',
    },
    {
      name: 'Crimson Web',
      weapon: 'Desert Eagle',
      slug: 'desert-eagle-crimson-web',
      description: '',
      image: '/images/cs-skins/7.png',
      stattrak: false,
      rarity: 'mythical',
    },
    {
      name: 'The Outsiders',
      weapon: 'AK-47',
      slug: 'ak-47-the-outsiders',
      description: '',
      image: '/images/cs-skins/8.png',
      stattrak: true,
      rarity: 'legendary',
    },
    {
      name: 'Sand Dune',
      weapon: 'Nova',
      slug: 'nova-sand-dune',
      description: '',
      image: '/images/cs-skins/9.png',
      stattrak: true,
    },
  ],
};

export default sampleData;
