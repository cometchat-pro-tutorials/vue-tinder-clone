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
              label="Email"
              rounded
              outlined
              hide-bottom-space
              @blur="$v.user.email.$touch"
              :error="$v.user.email.$error">
              <template v-slot:prepend>
                <q-icon name="mail" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-input
              v-model="user.password"
              label="Password"
              rounded
              outlined
              hide-bottom-space
              @blur="$v.user.password.$touch"
              :error="$v.user.password.$error"
              :type="passwordToggle ? 'text' : 'password'">
              <template v-slot:prepend>
                <q-icon name="vpn_key" color="pink-2" class="q-ml-sm"/>
              </template>
              <template v-slot:append>
                <q-btn
                  v-if="user.password"
                  dense
                  rounded
                  size="sm"
                  unelevated
                  color="pink-1"
                  class="q-px-sm"
                  text-color="pink"
                  :label="passwordToggle ? 'hide' : 'show'"
                  @click="passwordToggle = !passwordToggle" />
              </template>
            </q-input>
          </div>
          <div class="row reverse items-center justify-between">
            <q-btn
              :disable="$v.user.$invalid"
              rounded
              color="pink"
              class="q-px-xl"
              label="Sign In"
              />
            <span class="text-weight-light text-primary text-italic">Forgot password?</span>
          </div>
        </section>
      </q-page>
    </q-page-container>
    <img src="~assets/couple.svg" class="block absolute-bottom" width="250px" style="left: -15%; z-index: -1; opacity: .8"/>
    <div class="fixed-bottom row items-center justify-center q-pb-md">
      <div>Not yet registered?</div>
      <q-btn to="/register" dense flat label="Create an account" no-caps color="orange" class="text-body1 text-italic"/>
    </div>
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
</style>
<script>
import { QInput } from 'quasar'
import { required, email } from 'vuelidate/lib/validators'

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
      },
      passwordToggle: false
    }
  },
  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  }
}
</script>

<style>
</style>
