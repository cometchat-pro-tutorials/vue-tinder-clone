<template>
  <q-layout>
    <section class="fixed circle-1"></section>
    <section class="fixed circle-2"></section>
    <section class="fixed circle-3"></section>
    <q-page-container>
      <q-page padding>
        <section class="absolute-center full-width q-px-xl">
          <div class="column items-center justify-center">
            <div class="text-h1 text-pink-9">hello!</div>
            <div class="text-h6 text-weight-light">Sign in to your account</div>
          </div>
          <div class="column q-gutter-y-md q-mt-xl q-mb-lg">
            <q-input
              v-model="user.email"
              label="email address"
              rounded
              outlined/>
            <q-input
              v-model="user.password"
              label="password"
              type="password"
              rounded
              outlined />
          </div>
          <div class="row reverse items-center justify-between">
            <q-btn rounded label="Sign In" color="pink" class="q-px-xl"/>
            <span class="text-weight-light text-primary text-italic">Forgot password?</span>
          </div>
        </section>
      </q-page>
    </q-page-container>
    <img src="~assets/couple.svg" class="block absolute-bottom" width="250px" style="left: -15%; z-index: -1; opacity: .8"/>
    <div class="text-center fixed-bottom text- text-underline q-pb-md">Not yet registered?
    <span class="text-orange text-weight-bold text-italic cursor-pointer register-link">Create an account</span></div>
  </q-layout>
</template>
<style lang="stylus" scoped>
.circle-1
  background linear-gradient($pink-5, $pink)
  height 300px
  width 300px
  border-radius 50%
  top -15%
  right -18%
  opacity .5
.circle-2
  background linear-gradient($pink-3, $pink)
  height 300px
  width 320px
  right -5%
  top -12%
  border-bottom-left-radius 600%
  border-bottom-right-radius 100%
  z-index -1
  opacity .5
.circle-3
  height 70px
  width 70px
  top 33%
  right -10%
  z-index -1
  background radial-gradient($pink-2, $pink-3)
  border-radius 50%
.register-link:hover
  text-decoration underline
</style>
<script>
import { QInput } from 'quasar'

export default {
  name: 'Login',
  components: {
    QInput
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>
</style>
