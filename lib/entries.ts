// lib/entries.ts

export interface Entry {
    id: string;
    name: string;
    type: 'flora' | 'fauna';
    category: 'animal' | 'bird' | 'fruit' | 'flower';
    description: string;
    points: number;
    rarity: 'common' | 'uncommon' | 'rare' | 'very rare';
    mainImage: string;
    captures: string[];
}

export const entries: Entry[] = [
    {
        id: 'red-legged-pademelon',
        name: 'Red-legged Pademelon',
        type: 'fauna',
        category: 'animal',
        description: 'Small, forest-dwelling kangaroo found in the rainforest.',
        points: 50,
        rarity: 'uncommon',
        mainImage: '/pademelon.png',
        captures: ['/pademelon.png', '/pademelon.png']
    },
    {
        id: 'mountain-freshwater-crayfish',
        name: 'Mountain Freshwater Crayfish',
        type: 'fauna',
        category: 'animal',
        description: 'Freshwater crustacean found in the reserve\'s waterways.',
        points: 60,
        rarity: 'rare',
        mainImage: '/crayfish.png',
        captures: ['/crayfish-capture1.jpg']
    },
    {
        id: 'flying-fox',
        name: 'Flying Fox',
        type: 'fauna',
        category: 'animal',
        description: 'Large fruit bat crucial for pollination and seed dispersal.',
        points: 40,
        rarity: 'common',
        mainImage: '/flying-fox.png',
        captures: ['/flying-fox-capture1.jpg', '/flying-fox-capture2.jpg', '/flying-fox-capture3.jpg']
    },
    {
        id: 'blue-quandong',
        name: 'Blue Quandong',
        type: 'flora',
        category: 'fruit',
        description: 'Rainforest tree with vibrant blue fruit.',
        points: 40,
        rarity: 'uncommon',
        mainImage: '/quandong.png',
        captures: ['/quandong-capture1.jpg']
    },
    {
        id: 'bleeding-heart',
        name: 'Bleeding Heart',
        type: 'flora',
        category: 'flower',
        description: 'Distinctive flower with heart-shaped pink or red blooms.',
        points: 50,
        rarity: 'rare',
        mainImage: '/bleeding-heart.png',
        captures: ['/bleeding-heart-capture1.jpg', '/bleeding-heart-capture2.jpg']
    },
    {
        id: 'eastern-yellow-robin',
        name: 'Eastern Yellow Robin',
        type: 'fauna',
        category: 'bird',
        description: 'Small, bright yellow and grey forest bird.',
        points: 60,
        rarity: 'uncommon',
        mainImage: '/yellow-robin.png',
        captures: ['/yellow-robin-capture1.jpg', '/yellow-robin-capture2.jpg']
    },
];

export const getEntryById = (id: string): Entry | undefined => {
    return entries.find(entry => entry.id === id);
};