<script setup>
import { ref } from "vue";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-vue-next";

const isMenuOpen = ref(false);

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <header class="sticky top-0 z-50 bg-white backdrop-blur-sm">
    <nav
      class="max-w-7xl mx-auto mt-3 sm:mt-4 px-3 sm:px-5 lg:px-8 bg-white rounded-2xl shadow-sm"
    >
      <div class="h-16 sm:h-18 lg:h-20 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center shrink-0">
          <div class="text-2xl sm:text-3xl font-extrabold text-orange-500">
            SHopiO
          </div>
        </NuxtLink>
        <div class="hidden lg:flex items-center gap-1 text-sm font-medium">
          <NuxtLink
            to="/"
            class="relative px-4 py-2 transition hover:text-orange-500"
            :class="isActive('/') ? 'text-orange-500' : 'text-gray-700'"
          >
            Home

            <span
              v-if="isActive('/')"
              class="absolute left-4 right-4 -bottom-1 h-1 bg-orange-500 rounded-full"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/shop"
            class="relative px-4 py-2 transition hover:text-orange-500"
            :class="isActive('/shop') ? 'text-orange-500' : 'text-gray-700'"
          >
            Shop
            <span
              v-if="isActive('/shop')"
              class="absolute left-4 right-4 -bottom-1 h-1 bg-orange-500 rounded-full"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="relative px-4 py-2 transition hover:text-orange-500"
            :class="isActive('/about') ? 'text-orange-500' : 'text-gray-700'"
          >
            About
            <span
              v-if="isActive('/about')"
              class="absolute left-4 right-4 -bottom-1 h-1 bg-orange-500 rounded-full"
            ></span>
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="relative px-4 py-2 transition hover:text-orange-500"
            :class="isActive('/contact') ? 'text-orange-500' : 'text-gray-700'"
          >
            Contact
            <span
              v-if="isActive('/contact')"
              class="absolute left-4 right-4 -bottom-1 h-1 bg-orange-500 rounded-full"
            ></span>
          </NuxtLink>
        </div>
        <div class="flex items-center gap-1 sm:gap-2">
          <button
            class="p-2 sm:p-2.5 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Search :size="20" />
          </button>
          <button
            class="p-2 sm:p-2.5 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <Heart :size="20" />
          </button>
          <NuxtLink
            to="/cart"
            class="p-2 sm:p-2.5 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <ShoppingCart :size="20" />
          </NuxtLink>

          <button
            @click="isMenuOpen = !isMenuOpen"
            class="lg:hidden p-2 sm:p-2.5 rounded-xl transition hover:bg-orange-50 hover:text-orange-500"
          >
            <X v-if="isMenuOpen" :size="24" />
            <Menu v-else :size="24" />
          </button>
        </div>
      </div>
      <Transition name="menu">
        <div
          v-if="isMenuOpen"
          class="lg:hidden border-t border-gray-100 py-4"
        >
          <div
            class="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 text-sm font-medium"
          >
            <NuxtLink
              to="/"
              @click="isMenuOpen = false"
              class="relative px-4 py-3 rounded-xl transition hover:text-orange-500"
              :class="isActive('/') ? 'text-orange-500' : 'text-gray-700'"
            >
              Home
              <span
                v-if="isActive('/')"
                class="absolute left-4 right-4 bottom-0 h-1 bg-orange-500 rounded-full"
              ></span>
            </NuxtLink>

            <NuxtLink
              to="/shop"
              @click="isMenuOpen = false"
              class="relative px-4 py-3 rounded-xl transition hover:text-orange-500"
              :class="isActive('/shop') ? 'text-orange-500' : 'text-gray-700'"
            >
              Shop
              <span
                v-if="isActive('/shop')"
                class="absolute left-4 right-4 bottom-0 h-1 bg-orange-500 rounded-full"
              ></span>
            </NuxtLink>
            <NuxtLink
              to="/about"
              @click="isMenuOpen = false"
              class="relative px-4 py-3 rounded-xl transition hover:text-orange-500"
              :class="isActive('/about') ? 'text-orange-500' : 'text-gray-700'"
            >
              About
              <span
                v-if="isActive('/about')"
                class="absolute left-4 right-4 bottom-0 h-1 bg-orange-500 rounded-full"
              ></span>
            </NuxtLink>
            <NuxtLink
              to="/contact"
              @click="isMenuOpen = false"
              class="relative px-4 py-3 rounded-xl transition hover:text-orange-500"
              :class="isActive('/contact') ? 'text-orange-500' : 'text-gray-700'"
            >
              Contact
              <span
                v-if="isActive('/contact')"
                class="absolute left-4 right-4 bottom-0 h-1 bg-orange-500 rounded-full"
              ></span>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.25s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>