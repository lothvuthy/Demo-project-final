<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="group block rounded-xl overflow-hidden bg-white hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-md border border-amber-200"
  >
    <div class="relative aspect-4/5 overflow-hidden bg-neutral-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <span
        v-if="product.tag"
        class="absolute top-3 left-3 bg-neutral-900 text-amber-300 text-xs font-medium px-3 py-1 rounded-full"
      >
        {{ product.tag }}
      </span>
    </div>
    <div class="p-4">
      <p class="text-xs uppercase tracking-wide text-neutral-400">{{ product.category }}</p>
      <h3 class="font-medium mt-1 text-amber-400">{{ product.name }}</h3>
      <div class="flex items-center justify-between mt-2">
        <p class="font-semibold text-neutral-500">${{ product.price.toFixed(2) }}</p>
        <div class="flex items-center gap-1 text-amber-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118L10.588 15.4a1 1 0 00-1.176 0l-3.365 2.443c-.783.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.184c-.783-.57-.38-1.81.588-1.81H6.813a1 1 0 00.95-.69z" />
          </svg>
          <span class="text-neutral-500 ">{{ product.rating }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
