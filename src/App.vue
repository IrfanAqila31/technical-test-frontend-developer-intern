<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container">
      <a class="navbar-brand" href="#">Aplikasi Absensi</a>
    </div>
  </nav>

  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped></style>
