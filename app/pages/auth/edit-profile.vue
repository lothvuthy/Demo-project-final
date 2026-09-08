<script setup lang="ts">
import { ref, onMounted } from 'vue'

const router = useRouter()

const user = ref<any>(null)
const isLoading = ref(true)
const isSaving = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: ''
})

onMounted(() => {
  const savedUser = localStorage.getItem('shopio_user')

  if (!savedUser) {
    router.push('/auth/login')
    return
  }

  user.value = JSON.parse(savedUser)

  form.value.name = user.value.name || ''
  form.value.email = user.value.email || ''
  form.value.phone = user.value.phone || ''
  form.value.address = user.value.address || ''

  isLoading.value = false
})

const handleSave = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !form.value.name ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.address
  ) {
    errorMessage.value = 'Please fill in all required fields.'
    return
  }

  // Only check password if user wants to change it
  if (form.value.password) {
    if (form.value.password.length < 6) {
      errorMessage.value =
        'Password must be at least 6 characters.'
      return
    }

    if (
      form.value.password !==
      form.value.confirmPassword
    ) {
      errorMessage.value =
        'Passwords do not match.'
      return
    }
  }

  try {
    isSaving.value = true

    const updatedUser = {
      ...user.value,
      name: form.value.name.trim(),
      email: form.value.email.trim(),
      phone: form.value.phone.trim(),
      address: form.value.address.trim()
    }

    // Update password only when a new password is entered
    if (form.value.password) {
      updatedUser.password = form.value.password
    }

    // Update user in JSON Server
    const response = await $fetch<any>(
      `http://localhost:8000/users/${user.value.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: updatedUser
      }
    )

    // Update localStorage
    localStorage.setItem(
      'shopio_user',
      JSON.stringify(response)
    )

    // Update local user
    user.value = response

    successMessage.value =
      'Profile updated successfully!'

    // Clear password fields
    form.value.password = ''
    form.value.confirmPassword = ''

    // Go back to profile
    setTimeout(() => {
      router.push('/auth/profile')
    }, 1000)

  } catch (error) {
    console.error('Update profile error:', error)

    errorMessage.value =
      'Cannot update profile. Please make sure JSON Server is running.'
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 py-10 px-4"
  >

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-100"
    >
      <p class="text-gray-500">
        Loading profile...
      </p>
    </div>

    <!-- Edit Profile -->
    <div
      v-else
      class="max-w-2xl mx-auto"
    >

      <!-- Back -->
      <div class="mb-6">
        <NuxtLink
          to="/auth/profile"
          class="text-orange-500 hover:text-orange-600 font-medium"
        >
          ← Back to Profile
        </NuxtLink>
      </div>

      <!-- Card -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8"
      >

        <!-- Header -->
        <div class="mb-8">
          <h1
            class="text-3xl font-bold text-gray-800"
          >
            Edit Profile
          </h1>

          <p class="text-gray-500 mt-2">
            Update your personal information
          </p>
        </div>

        <!-- Error -->
        <div
          v-if="errorMessage"
          class="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600"
        >
          {{ errorMessage }}
        </div>

        <!-- Success -->
        <div
          v-if="successMessage"
          class="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600"
        >
          {{ successMessage }}
        </div>

        <!-- Form -->
        <form
          @submit.prevent="handleSave"
          class="space-y-5"
        >

          <!-- Name -->
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
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- New Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
              <span class="text-gray-400 font-normal">
                (Optional)
              </span>
            </label>

            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Leave blank to keep current password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Confirm New Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <!-- Buttons -->
          <div class="flex gap-4 pt-4">

            <!-- Cancel -->
            <NuxtLink
              to="/auth/profile"
              class="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </NuxtLink>

            <!-- Save -->
            <button
              type="submit"
              :disabled="isSaving"
              class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {{
                isSaving
                  ? 'Saving...'
                  : 'Save Changes'
              }}
            </button>

          </div>

        </form>

      </div>
    </div>
  </div>
</template>