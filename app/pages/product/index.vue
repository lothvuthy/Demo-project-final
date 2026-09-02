<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { getAll, categories } = useProducts()

const allProducts = getAll()

const activeCategory = ref((route.query.category as string) || 'All')
const searchQuery = ref('')
const sortBy = ref('featured')

watch(
  () => route.query.category,
  (val) => {
    activeCategory.value = (val as string) || 'All'
  }
)

const setCategory = (cat: string) => {
  activeCategory.value = cat
  router.push({ query: { ...route.query, category: cat === 'All' ? undefined : cat } })
}

const filtered = computed(() => {
  let list = allProducts

  if (activeCategory.value !== 'All') {
    list = list.filter((p) => p.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    )
  }

  const sorted = [...list]
  switch (sortBy.value) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating)
      break
  }
  return sorted
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <div class="mb-8">
      <p class="uppercase tracking-widest text-amber-400 text-xs font-semibold mb-2">Shop</p>
      <h1 class="text-3xl font-bold text-amber-400">All Products</h1>
    </div>

    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <!-- Search -->
      <div class="relative flex-1 max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products…"
          class="w-full rounded-full border border-amber-300 bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-amber-300 text-amber-500"
        />
      </div>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="activeCategory === cat ? 'bg-amber-300 text-white' : 'bg-neutral-100 text-amber-500 hover:bg-neutral-200'"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Sort -->
      <select
        v-model="sortBy"
        class="ml-auto rounded-full border border-amber-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400 text-amber-400 font-bold"
      >
        <option value="featured">Sort: Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>

    <p class="text-sm text-amber-500 mb-6">{{ filtered.length }} products</p>

    <div v-if="filtered.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
    <div v-else class="text-center py-20 text-amber-500">
      No products match your search.
    </div>
  </div>
</template>
