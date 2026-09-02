import type { Product } from './useProducts'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])

  const add = (product: Product, quantity = 1) => {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ product, quantity })
    }
  }

  const remove = (productId: number) => {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) item.quantity = Math.max(1, quantity)
  }

  const count = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
  )

  return { items, add, remove, updateQuantity, count, subtotal }
}
