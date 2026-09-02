```vue
<script setup>
import { computed } from 'vue'
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-vue-next'

const year = computed(() => new Date().getFullYear())

const socials = [
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter', href: '#', icon: Twitter },
]

const terms = [
  'Terms and Conditions',
  'Privacy Policy',
  'Return and Refund Policy',
  'Cookies Policy',
]

const payments = [
  'ABA PAY',
  'VISA',
  'Mastercard',
  'UnionPay',
  'JCB',
  'WingPay',
  'ACLEDA',
]
</script>

<template>
  <footer class="bg-white text-gray-500">
    <!-- Main Footer -->
    <div class="mx-auto max-w-7xl px-6 py-14">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

        <!-- Brand -->
        <div>
          <div class="mb-4 flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              class="h-7 w-7 text-red-500"
              fill="currentColor"
            >
              <path d="M2 3h5.2l4.8 11 4.8-11H21l-8 18h-3L2 3z" />
              <circle cx="18.5" cy="18.5" r="2" />
            </svg>

            <span class="text-xl font-semibold text-gray-900">
              VTENH
            </span>
          </div>

          <p class="text-sm leading-relaxed">
            VTENH is a Cambodian e-commerce platform that brings together
            buyers, sellers, and logistics partners in one seamless digital
            ecosystem. We empower individuals and businesses to buy and sell
            online easily, with trusted payments, transparent delivery, and
            dedicated local support. VTENH makes digital commerce simple,
            secure, and accessible for everyone across Cambodia.
          </p>

          <!-- Social Media -->
          <div class="mt-5 flex gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="flex h-9 w-9 items-center justify-center rounded bg-gray-500 text-white transition-colors hover:bg-gray-600"
            >
              <component
                :is="social.icon"
                class="h-4 w-4"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900">
            Contact Us
          </h3>

          <ul class="space-y-4 text-sm">

            <!-- Address -->
            <li class="flex gap-3">
              <MapPin class="mt-0.5 h-4 w-4 shrink-0" />

              <span>
                A23A, One Park Shop House Street, Sangkat Sras Chak,
                Khan Duan Penh, Phnom Penh
              </span>
            </li>

            <!-- Email -->
            <li class="flex items-center gap-3">
              <Mail class="h-4 w-4 shrink-0" />

              <a
                href="mailto:info@vtenh.com"
                class="hover:text-gray-900"
              >
                info@vtenh.com
              </a>
            </li>

            <!-- Phone -->
            <li class="flex items-center gap-3">
              <Phone class="h-4 w-4 shrink-0" />

              <span>
                +855 10 355 866 | +855 12 355 866
              </span>
            </li>

          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900">
            Terms of Use
          </h3>

          <ul class="space-y-3 text-sm">
            <li
              v-for="link in terms"
              :key="link"
            >
              <a
                href="#"
                class="transition hover:text-gray-900"
              >
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="mb-4 text-lg font-semibold text-gray-900">
            We Accept
          </h3>
          <div class="flex flex-wrap items-center gap-2">
            <span
              v-for="pay in payments"
              :key="pay"
              class="rounded border border-gray-200 px-2 py-1 text-xs font-semibold text-gray-700"
            >
              {{ pay }}
            </span>
          </div>
          <h3 class="mb-3 mt-8 text-lg font-semibold text-gray-900">
            App
          </h3>
          <ul class="space-y-2 text-sm">
            <li>VTENH App (iOS, Android)</li>
            <li>CREATOR PROGRAM</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200">
      <p class="py-5 text-center text-sm text-gray-500">
        © {{ year }} VTENH - Shop Easy. All rights reserved.
      </p>
    </div>
  </footer>
</template>
```
