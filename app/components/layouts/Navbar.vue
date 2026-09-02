<script setup>
import { ref } from "vue";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
} from "lucide-vue-next";

const isMenuOpen = ref(false);
</script>

<template>
  <header class="sticky mt-3 top-0 z-50 bg-gray-300 ">
    <nav class="max-w-7xl bg-gray-400 mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl ">
      <div class="h-16 md:h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
            class="text-2xl md:text-3xl font-extrabold text-orange-500"
          >
            SHopiO
          </div>
        </NuxtLink>
        <div
          class="hidden lg:flex items-center gap-2 text-sm font-medium"
        >
          <NuxtLink
            to="/"
            class="px-4 py-2 rounded-xl transition hover:text-white hover:bg-orange-500"
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/shop"
            class="px-4 py-2 rounded-xl transition hover:text-white hover:bg-orange-500"
          >
            Shop
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="px-4 py-2 rounded-xl transition hover:text-white hover:bg-orange-500"
          >
            About
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="px-4 py-2 rounded-xl transition hover:text-white hover:bg-orange-500"
          >
            Contact
          </NuxtLink>
        </div>
        <div class="flex items-center gap-2 sm:gap-4">
          <button
            class="p-2 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Search :size="20" class="md:w-6 md:h-6" />
          </button>
          <button
            class="p-2 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Heart :size="20" class="md:w-6 md:h-6" />
          </button>
          <NuxtLink
            to="/cart"
            class="p-2 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <ShoppingCart
              :size="20"
              class="md:w-6 md:h-6"
            />
          </NuxtLink>
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="lg:hidden p-2 rounded-xl hover:bg-orange-50 hover:text-orange-500"
          >
            <X v-if="isMenuOpen" :size="24" />
            <Menu v-else :size="24" />
          </button>

        </div>
      </div>
      <div
        class="hidden md:flex lg:hidden items-center justify-center gap-3 pb-4 text-sm font-medium"
      >
        <NuxtLink
          to="/"
          class="px-4 py-2 rounded-xl hover:text-white hover:bg-orange-500 transition"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/shop"
          class="px-4 py-2 rounded-xl hover:text-white hover:bg-orange-500 transition"
        >
          Shop
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="px-4 py-2 rounded-xl hover:text-white hover:bg-orange-500 transition"
        >
          About
        </NuxtLink>

        <NuxtLink
          to="/contact"
          class="px-4 py-2 rounded-xl hover:text-white hover:bg-orange-500 transition"
        >
          Contact
        </NuxtLink>
      </div>
      <div
        v-if="isMenuOpen"
        class="lg:hidden border-t border-gray-100 py-4"
      >
        <div class="flex flex-col gap-2 text-sm font-medium">

          <NuxtLink
            to="/"
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
          >
            Home
          </NuxtLink>

          <NuxtLink
            to="/shop"
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
          >
            Shop
          </NuxtLink>

          <NuxtLink
            to="/about"
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/contact"
            @click="isMenuOpen = false"
            class="px-4 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition"
          >
            Contact
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>