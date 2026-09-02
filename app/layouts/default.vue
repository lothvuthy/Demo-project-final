<script setup lang="ts">
import Navbar from '~/components/layouts/Navbar.vue';

</script>
<template>
  <div>
    <Navbar />

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>
