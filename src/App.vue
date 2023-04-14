<script setup lang="ts">
import { defineAsyncComponent, onMounted, type DefineComponent } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'
const NavBar = defineAsyncComponent<DefineComponent>(
  () => import('@/components/layout/NavBar.vue') as any
)

const authStore = useStoreAuth()

onMounted(() => authStore.init())
</script>

<template>
  <nav-bar />
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<style scoped></style>
