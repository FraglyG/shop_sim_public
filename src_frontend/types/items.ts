// TYPES
// Note: Would be better if these types are stored in a single location rather than cloned between frontend and backend
//       But I don't really have enough time to worry about that right now

enum ItemCategory {
    Food = 'food',
    Drink = 'drink',
    Clothing = 'clothing',
    Electronics = 'electronics',
    Other = 'other',
}

interface ShopItem {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: ItemCategory,
    images: string[],

    ratingAverage: number, // 0-5
    ratingCount: number,
}