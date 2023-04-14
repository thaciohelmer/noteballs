<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'

const register = ref<boolean>(false)

const formTitle = computed<string>(() => (register.value ? 'Register' : 'Login'))

const credentials = reactive<{ email: string; password: string }>({
  email: '',
  password: ''
})

const storeAuth = useStoreAuth()

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert('Please enter an email and password gosh darnit!')
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials)
    } else {
      storeAuth.loginUser(credentials)
    }
  }
}
</script>

<template>
  <div>
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <div class="content">
          <form @submit.prevent="onSubmit">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="credentials.email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="password"
                  placeholder="Password"
                  v-model="credentials.password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field is-grouped is-grouped-right">
              <p class="control">
                <button class="button is-success">{{ formTitle }}</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-form {
  max-width: 30rem;
  margin: 0 auto;
}
</style>
