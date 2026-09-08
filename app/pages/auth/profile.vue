<script setup lang="ts">
import { ref, onMounted } from 'vue'

const router = useRouter()

const user = ref<any>(null)
const isLoading = ref(true)

onMounted(() => {
  const savedUser = localStorage.getItem('shopio_user')

  if (!savedUser) {
    router.push('/auth/login')
    return
  }

  user.value = JSON.parse(savedUser)
  isLoading.value = false
})

const logout = () => {
  localStorage.removeItem('shopio_user')
  localStorage.removeItem('shopio_logged_in')
  localStorage.removeItem('shopio_token')

  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-100"
    >
      <p class="text-gray-500">
        Loading profile...
      </p>
    </div>

    <!-- Profile -->
    <div
      v-else-if="user"
      class="max-w-2xl mx-auto"
    >

      <!-- Back to Home -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="text-orange-500 hover:text-orange-600 font-medium"
        >
          ← Back to Home
        </NuxtLink>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

        <!-- Header -->
        <div class="bg-orange-500 px-8 py-8 text-white">
          <div class="flex items-center gap-5">

            <!-- Avatar -->
            <div
              class="w-20 h-20 rounded-full bg-white text-orange-500 flex items-center justify-center text-3xl font-bold"
            >
              {{ user.name?.charAt(0).toUpperCase() }}
            </div>

            <div>
              <h1 class="text-2xl font-bold">
                {{ user.name }}
              </h1>

              <p class="text-orange-100">
                {{ user.email }}
              </p>
            </div>

          </div>
        </div>

        <!-- User Information -->
        <div class="p-8">

          <h2 class="text-xl font-semibold text-gray-800 mb-6">
            Personal Information
          </h2>

          <div class="space-y-5">

            <!-- Name -->
            <div>
              <p class="text-sm text-gray-500 mb-1">
                Full Name
              </p>

              <p class="text-gray-800 font-medium">
                {{ user.name }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <p class="text-sm text-gray-500 mb-1">
                Email
              </p>

              <p class="text-gray-800 font-medium">
                {{ user.email }}
              </p>
            </div>

            <!-- Phone -->
            <div>
              <p class="text-sm text-gray-500 mb-1">
                Phone
              </p>

              <p class="text-gray-800 font-medium">
                {{ user.phone }}
              </p>
            </div>

            <!-- Address -->
            <div>
              <p class="text-sm text-gray-500 mb-1">
                Address
              </p>

              <p class="text-gray-800 font-medium">
                {{ user.address }}
              </p>
            </div>

          </div>

          <!-- Buttons -->
          <div class="flex gap-4 mt-8">

            <!-- Edit Profile -->
            <NuxtLink
              to="/auth/edit-profile"
              class="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Edit Profile
            </NuxtLink>

            <!-- Logout -->
            <button
              @click="logout"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              Logout
            </button>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>