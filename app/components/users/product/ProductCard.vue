<script setup>
import { Heart, Star, StarHalf } from "lucide-vue-next";

defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="group">
    <div class="relative bg-gray-50 rounded-2xl overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
      />
      <button
        class="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-sm hover:text-orange-500 flex items-center justify-center"
      >
        <Heart :size="20" />
      </button>
      <span
        class="absolute bottom-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded"
      >
        -{{ product.discount }}%
      </span>
    </div>
    <div class="pt-4">
      <div class="flex items-center gap-1 text-yellow-500 text-sm">
        <Star :size="14" fill="currentColor" />
        <Star :size="14" fill="currentColor" />
        <Star :size="14" fill="currentColor" />
        <StarHalf :size="14" fill="currentColor" />

        <span class="ml-1 text-gray-700">
          {{ product.rating }}
        </span>

        <span class="text-gray-400">
          ({{ product.reviews }})
        </span>
      </div>
      <h3
        class="font-semibold mt-2 hover:text-orange-500 cursor-pointer transition"
      >
        {{ product.name }}
      </h3>
      <div class="flex items-center gap-2 mt-2">
        <span class="font-bold text-lg text-gray-900">
          ${{ product.price }}
        </span>

        <span
          v-if="product.oldPrice"
          class="text-gray-400 text-sm line-through"
        >
          ${{ product.oldPrice }}
        </span>
      </div>
    </div>
  </div>
</template>