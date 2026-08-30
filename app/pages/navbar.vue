<script setup>
import { Search, Heart, ShoppingCart, Menu } from "lucide-vue-next"
</script>
<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-5 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div class="text-2xl font-bold text-orange-500">
            SHopiO
          </div>
        </NuxtLink>
        <div class="hidden lg:flex items-center gap-8 text-sm font-medium">
          <NuxtLink to="/home" class="hover:text-orange-500 transition">
            Home
          </NuxtLink>
          <NuxtLink to="/shop" class="hover:text-orange-500 transition">
            Shop
          </NuxtLink>
          <NuxtLink to="/categories" class="hover:text-orange-500 transition">
            Categories
          </NuxtLink>
          <NuxtLink to="/About" class="hover:text-orange-500 transition">
            About
          </NuxtLink>
          <NuxtLink to="/deals" class="hover:text-orange-500 transition">
            Deals
          </NuxtLink>
          <NuxtLink to="/contact" class="hover:text-orange-500 transition">
            Contact
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <button class="hover:text-orange-500">
            <Search :size="22" />
          </button>
          <button class="hover:text-orange-500">
            <Heart :size="22" />
          </button>
          <NuxtLink to="/cart" class="hover:text-orange-500">
            <ShoppingCart :size="22" />
          </NuxtLink>
          <button class="lg:hidden">
            <Menu :size="24" />
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>