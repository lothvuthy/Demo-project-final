<script setup lang="ts">
const route = useRoute()
const { getById, getAll } = useProducts()
const { add } = useCart()

const id = computed(() => Number(route.params.id))
const product = computed(() => getById(id.value))

const quantity = ref(1)
const added = ref(false)

const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const handleAddToCart = () => {
  if (!product.value) return
  add(product.value, quantity.value)
  added.value = true
  setTimeout(() => (added.value = false), 2500)
}

const related = computed(() => {
  if (!product.value) return []
  return getAll()
    .filter((p) => p.category === product.value!.category && p.id !== product.value!.id)
    .slice(0, 4)
})

const fullStars = computed(() => Math.round(product.value?.rating ?? 0))
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto px-6 py-12">
    <div class="grid md:grid-cols-2 gap-12">
      <!-- Product image -->
      <div class="rounded-2xl overflow-hidden aspect-4/5 bg-neutral-100">
        <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
      </div>

      <!-- Details -->
      <div>
        <p class="text-xs uppercase tracking-wide text-neutral-400">{{ product.category }}</p>
        <h1 class="text-3xl md:text-4xl font-bold text-amber-300 mt-2 mb-3">
          {{ product.name }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-2 mb-4">
          <div class="flex text-amber-500">
            <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-4 w-4" :fill="i <= fullStars ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118L10.588 15.4a1 1 0 00-1.176 0l-3.365 2.443c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.184c-.783-.57-.38-1.81.588-1.81H6.813a1 1 0 00.95-.69z" />
            </svg>
          </div>
          <span class="text-sm text-amber-400">{{ product.rating }} ({{ product.reviews }} reviews)</span>
        </div>

        <p class="text-3xl font-bold text-neutral-700 mb-6">${{ product.price.toFixed(2) }}</p>

        <p class="text-neutral-600 leading-relaxed mb-8 max-w-lg bg-amber-200 px-1 py-0.5 rounded-sm">
          {{ product.description }}
        </p>

        <p class="text-sm text-neutral-500 mb-8">
          Color: <span class="font-medium text-neutral-900">{{ product.color }}</span>
        </p>

        <!-- Quantity -->
        <div class="flex items-center gap-6 mb-8">
          <span class="text-sm font-medium text-neutral-900">Quantity</span>
          <div class="flex items-center border border-neutral-200 rounded-full">
            <button class="px-4 py-2 text-lg" @click="decrement">−</button>
            <span class="px-4 font-medium">{{ quantity }}</span>
            <button class="px-4 py-2 text-lg" @click="increment">+</button>
          </div>
        </div>

        <button
          class="inline-flex items-center justify-center gap-2 bg-amber-300 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-400 transition-colors w-full md:w-auto md:px-12"
          @click="handleAddToCart"
        >
          {{ added ? 'Added to Cart ✓' : 'Add to Cart' }}
        </button>
      </div>
    </div>

    <!-- Related products -->
    <section v-if="related.length" class="mt-20">
      <h2 class="text-2xl font-bold text-neutral-900 mb-8 w-60 text-center rounded-lg py-0.5 px-1 bg-amber-200 ">You May Also Like</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>

  <div v-else class="max-w-6xl mx-auto px-6 py-24 text-center">
    <h1 class="text-2xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
    <NuxtLink to="/product" class="text-neutral-900 font-medium hover:underline">← Back to shop</NuxtLink>
  </div>
</template>
