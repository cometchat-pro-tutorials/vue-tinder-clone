<template>
  <q-page class="flex flex-center">
    <section class="text-center text-primary">
      <div class="text-h1 q-mb-md">🔥</div>
      <div class="text-h2 text-weight-bold">Welcome</div>
      <div class="text-h5">{{info.name}}</div>
    </section>
  </q-page>
</template>

<style>
</style>

<script>
import { Auth } from 'aws-amplify'
export default {
  name: 'PageIndex',
  async preFetch ({ redirect, store }) {
    const user = await Auth.currentUserInfo()
    if (!user) {
      return redirect('/login')
    }
    store.dispatch('user/fetch')
    return Promise.resolve()
  },
  computed: {
    info () {
      return this.$store.getters['user/info']
    }
  }
}
</script>
