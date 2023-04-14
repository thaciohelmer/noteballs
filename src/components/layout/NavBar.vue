<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

const showMobileNav = ref<boolean>(false)
const navbarMenuRef = ref<HTMLElement>()
const navbarBurgerRef = ref<HTMLElement>()
const useAuth = useStoreAuth()

onClickOutside(navbarMenuRef, () => (showMobileNav.value = false), {
  ignore: [navbarBurgerRef]
})

const logout = () => {
  showMobileNav.value = false
  useAuth.logoutUser()
}
</script>

<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteballs</div>
        <a
          @click.prevent="showMobileNav = !showMobileNav"
          :class="{ 'is-active': showMobileNav }"
          class="navbar-burger"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        :class="{ 'is-active': showMobileNav }"
        id="navbarBasicExample"
        class="navbar-menu"
        ref="navbarMenuRef"
      >
        <div class="navbar-start" v-if="useAuth.user">
          <button class="button is-small is-info mt-3 ml-3" @click="logout">
            Log Out {{ useAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <router-link @click="showMobileNav = false" class="navbar-item" to="/">Notes</router-link>
          <router-link @click="showMobileNav = false" class="navbar-item" to="/stats"
            >Stats</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
