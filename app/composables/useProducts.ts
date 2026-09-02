export interface Product {
  id: number
  name: string
  category: 'Men' | 'Women' | 'Accessories'
  price: number
  rating: number
  reviews: number
  image: string
  color: string
  description: string
  tag?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Oxford Shirt',
    category: 'Men',
    price: 48,
    rating: 4.6,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    color: 'White',
    tag: 'Bestseller',
    description:
      'A timeless button-down cut from breathable cotton oxford cloth. Tailored fit with a soft, structured collar — equally at home at the office or on the weekend.'
  },
  {
    id: 2,
    name: 'Relaxed Linen Trousers',
    category: 'Women',
    price: 62,
    rating: 4.4,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
    color: 'Sand',
    tag: 'New',
    description:
      'Wide-leg linen trousers with a high waist and drawstring tie. Lightweight and breathable, made for warm days and easy movement.'
  },
  {
    id: 3,
    name: 'Merino Wool Sweater',
    category: 'Men',
    price: 89,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=800&q=80',
    color: 'Charcoal',
    description:
      'Fine-gauge merino wool knit that regulates temperature naturally. A wardrobe staple with a clean crew neckline and ribbed cuffs.'
  },
  {
    id: 4,
    name: 'Silk Slip Dress',
    category: 'Women',
    price: 110,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    color: 'Terracotta',
    tag: 'New',
    description:
      'Cut on the bias from 100% mulberry silk, this slip dress skims the body with quiet, elegant movement. Wear alone or layered.'
  },
  {
    id: 5,
    name: 'Structured Wool Coat',
    category: 'Women',
    price: 168,
    rating: 4.9,
    reviews: 61,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSq7fFPude3PP5Q8A6ZXlIS5qGuT5tDWEtUEDMb5E3A&s=10',
    color: 'Camel',
    tag: 'Bestseller',
    description:
      'A double-breasted wool-blend coat with a sharply tailored silhouette. Fully lined, with horn-style buttons and deep welt pockets.'
  },
  {
    id: 6,
    name: 'Everyday Denim Jacket',
    category: 'Men',
    price: 76,
    rating: 4.5,
    reviews: 149,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    color: 'Indigo',
    description:
      'Rigid selvedge denim that softens and fades beautifully over time. A classic trucker cut built to layer through every season.'
  },
  {
    id: 7,
    name: 'Ribbed Knit Beanie',
    category: 'Accessories',
    price: 22,
    rating: 4.3,
    reviews: 55,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
    color: 'Olive',
    description:
      'Soft ribbed-knit beanie in a relaxed fit. Made from a wool-acrylic blend for warmth without the itch.'
  },
  {
    id: 8,
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 95,
    rating: 4.7,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80',
    color: 'Cognac',
    tag: 'New',
    description:
      'Full-grain leather crossbody with an adjustable strap and brushed brass hardware. Compact but roomy enough for the essentials.'
  },
  {
    id: 9,
    name: 'Cotton Poplin Blouse',
    category: 'Women',
    price: 54,
    rating: 4.4,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80',
    color: 'Ivory',
    description:
      'A crisp poplin blouse with a relaxed fit and covered button placket. Effortless to dress up or down.'
  }
]

export const useProducts = () => {
  const getAll = () => products

  const getById = (id: number) => products.find((p) => p.id === id)

  const search = (query: string, category: string) => {
    let list = products
    if (category && category !== 'All') {
      list = list.filter((p) => p.category === category)
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      )
    }
    return list
  }

  const categories = ['All', 'Men', 'Women', 'Accessories']

  return { getAll, getById, search, categories }
}
