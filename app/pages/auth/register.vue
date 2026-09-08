<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Check all fields
  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword ||
    !form.value.phone ||
    !form.value.address
  ) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  // Check password length
  if (form.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.'
    return
  }

  // Check password confirmation
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  try {
    isLoading.value = true

    // Get existing users
    const users = await $fetch<any[]>(
      'http://localhost:8000/users'
    )

    // Check duplicate email
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        form.value.email.trim().toLowerCase()
    )

    if (existingUser) {
      errorMessage.value =
        'This email is already registered.'
      return
    }

    // Create new user
    const newUser = await $fetch(
      'http://localhost:8000/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name: form.value.name.trim(),
          email: form.value.email.trim(),
          password: form.value.password,
          phone: form.value.phone.trim(),
          address: form.value.address.trim()
        }
      }
    )

    console.log('Registered user:', newUser)

    successMessage.value =
      'Registration successful! Redirecting to login...'

    // Clear form
    form.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: ''
    }

    // Go to login page
    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch (error) {
    console.error('Registration error:', error)

    errorMessage.value =
      'Cannot connect to the server. Please make sure JSON Server is running.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
  >
    <div class="w-full max-w-md">

      <!-- Register Card -->
      <div class="bg-white rounded-2xl shadow-lg p-8">

        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p class="text-gray-500 mt-2">
            Join Shopio today
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
        >
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600"
        >
          {{ successMessage }}
        </div>

        <!-- Register Form -->
        <form
          @submit.prevent="handleRegister"
          class="space-y-5"
        >

          <!-- Full Name -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Enter your full name"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Phone -->
          <div>
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>

            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="Enter your phone number"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Address -->
          <div>
            <label
              for="address"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Address
            </label>

            <input
              id="address"
              v-model="form.address"
              type="text"
              placeholder="Enter your address"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
          </button>

        </form>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <p class="text-sm text-gray-500">
            Already have an account?

            <NuxtLink
              to="/auth/login"
              class="font-semibold text-orange-500 hover:text-orange-600"
            >
              Login
            </NuxtLink>
          </p>
        </div>

      </div>

    </div>
  </div>
</template>