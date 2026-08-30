<script setup lang="">
import {
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
  MoveRight,
  Heart,
  Star,
  StarHalf,
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";
import shopio from "~/data/shopio.json";
import Navbar from "./navbar.vue";

const icons = {
  Truck,
  RotateCcw,
  CreditCard,
  Headphones,
};
const currentSlide = ref(0);
const slides = shopio.slides;
const features = shopio.features;
const categories = shopio.categories;
const products = shopio.products;
let interval;
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};
const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};
const goToSlide = (index) => {
  currentSlide.value = index;
};

onMounted(() => {
  interval = setInterval(nextSlide, 5000);
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <section class="px-4 md:px-8 py-6">
      <div
        class="relative w-full max-w-300 mx-auto h-140 md:h-160 overflow-hidden rounded-3xl"
      >
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="absolute inset-0 transition-opacity duration-700"
          :class="index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        >
          <img
            :src="slide.image"
            :alt="slide.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 z-10 flex items-center">
            <div class="px-8 md:px-16 max-w-150 text-white">
              <h1 class="text-2xl font-bold">
                {{ slide.title }}
              </h1>
              <h2 class="text-5xl md:text-7xl font-bold leading-tight">
                {{ slide.highlight }}
              </h2>
              <p class="mt-6 text-base md:text-2xl leading-8 max-w-100">
                {{ slide.description }}
              </p>
              <div class="flex flex-wrap gap-4 mt-8">
                <NuxtLink
                  to="/shop"
                  class="px-7 py-4 rounded-2xl bg-black text-white font-semibold"
                  >Shop Deals</NuxtLink
                >
                <NuxtLink
                  to="/Deals"
                  class="px-7 py-4 rounded-2xl bg-gray-400 text-white font-semibold"
                  >Explore Deals</NuxtLink
                >
              </div>
            </div>
          </div>
          <div
            class="absolute right-8 md:right-16 top-14 md:top-16 z-20 w-15 h-15 md:w-36 md:h-36 rounded-full bg-orange-500 text-white flex flex-col items-center justify-center shadow-lg"
          >
            <span class="text-sm md:text-2xl">{{ slide.discount }}</span>
            <span class="text-2xl md:text-2xl font-bold">Sale</span>
          </div>
        </div>
        <div class="absolute bottom-4 left-2 z-20 flex gap-2">
          <button
            v-for="(slide, index) in slides"
            :key="'dot-' + slide.id"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition"
            :class="index === currentSlide ? 'bg-white' : 'bg-white/40'"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>
    <section class="max-w-5xl mx-auto px-5 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="feature in features"
          :key="feature.id"
          class="flex items-center gap-3"
        >
          <div
            class="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center"
          >
            <component
              :is="icons[feature.icon]"
              :size="24"
              class="text-white"
            />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-5xl mx-auto px-5 py-10">
      <div class="flex justify-between items-center md-6">
        <h2 class="Text-3xl font-bold">Categories</h2>
        <NuxtLink
          to="/categories"
          class="text-orange-600 text-sm font-semibold"
          >View All<MoveRight :size="20" class="flex justify-between"
        /></NuxtLink>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          to="/shop"
          class="group border border-gray-100 rounded-2xl p-4 hover:shadow-lg hover:border-orange-200 transition"
        >
          <div class="h-28 w-28 bg-gray-50 rounded-lg overflow-hidden mb-3">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-26 h-26 object-cover group-hover:scale-105 transition"
            />
          </div>
          <h3 class="text-center text-sm font-semibold text-gray-800">
            {{ category.name }}
          </h3>
          <p class="text-xs text-gray-500 mt-1">{{ category.items }} items</p>
        </NuxtLink>
      </div>
    </section>
    <section class="max-w-5xl mx-auto px-5 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold">Popular Products</h2>
        <nuxt-link
          to="/categories"
          class="text-orange-600 text-sm font-semibold"
          >View All<MoveRight :size="20" class="flex justify-between"
        /></nuxt-link>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div v-for="product in products" :key="product.id" class="group">
          <div class="relative bg-gray-50 rounded-2xl overflow-hidden">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
            />
            <button
              class="absolute top-3 right-3 w-9 h-9 shaodow-sm hover:text-orange-500 items-center"
            >
              <Heart :size="22" />
            </button>
            <span
              class="absolute bottom-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded"
              >-{{ product.discount }}%</span
            >
          </div>
          <div class="pt-4">
            <div class="flex items-center gap-1 text-yellow-500 text-sm">
              <Star :size="10" fill="currentColor" /><Star
                :size="10"
                fill="currentColor"
              /><Star :size="10" fill="currentColor" /><StarHalf
                :size="10"
                fill="currentcolor"
              />{{ product.rating }}
              <span class="text-gray-400">{{ product.reviews }}</span>
            </div>
          </div>
          <h3 class="font-semibold mt-2 hover:text-orange-500 cursor-pointer">
            {{ product.name }}
          </h3>
          <div class="flex iteam-center gap-2 mt-2">
            <span class="font-bold text-lg">${{ product.price }}</span>
            <span class="text-gray-400 text-sm line-through"
              >${{ product.oldPrice }}</span
            >
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-5xl mx-auto px-5 py-10">
      <div class="bg-black rounded-2xl overflow-hidden grid md:grid-cols-2 items-center">
      <div class="p-8 md:p-12 text-white">
      <p class="text-gray-50 font-semibold">BIG SUMMER SALE</p>
      <h2 class="text-3xl md:text-4xl font-bold">Save Up To 50%</h2>
      <p class="text-gray-400 mt-3">Get amazing on selectd products.</p>
      <NuxtLink to="/deals" class="inline-block text-black bg-amber-50 hover:bg-amber-500 px-6 py-3 rounded-lg mt-6 font-semibold transition">Shop Now</NuxtLink>
      </div>
      <img class="w-full h-64 md:h-72 object-cover" src="https://i.pinimg.com/1200x/53/2f/71/532f71aa6886d0994a5a98d7755fb81c.jpg" alt="">
      </div>
    </section>
    
  </div>
</template>
