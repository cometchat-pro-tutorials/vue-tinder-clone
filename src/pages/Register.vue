<template>
  <q-layout view="lHh lpr lFf">
    <q-header class="header">
      <q-toolbar>
        <q-btn flat icon="arrow_back" dense size="sm" to="/login"/>
        <q-toolbar-title class="text-body1  text-center">Sign Up</q-toolbar-title>
      </q-toolbar>
      <section class="q-px-lg q-ml-sm q-py-lg q-mb-sm">
        <div class="text-h3 text-weight-bold">New</div>
        <div class="text-h5">Account</div>
      </section>
    </q-header>
    <q-page-container>
      <q-page padding>
        <section class="absolute-center full-width q-pa-xl">
          <div v-show="errorMessage" class="q-mb-sm text-negative text-italic">
            *<span v-html="errorMessage" />
          </div>
          <div class="column q-gutter-y-md">
            <q-input
              dense
              rounded
              outlined
              hide-bottom-space
              label="Full Name"
              v-model="user.fullName"
              @blur="$v.user.fullName.$touch"
              :error="$v.user.fullName.$error">
              <template v-slot:prepend>
                <q-icon name="person" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              type="email"
              hide-bottom-space
              v-model="user.email"
              label="Email Address"
              @blur="$v.user.email.$touch"
              :error="$v.user.email.$error">
              <template v-slot:prepend>
                <q-icon name="mail" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              hide-bottom-space
              label="Password"
              v-model="user.password"
              @blur="$v.user.password.$touch"
              :error="$v.user.password.$error"
              :type="passwordToggle.main ? 'text' : 'password'">
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
                  :label="passwordToggle.main ? 'hide' : 'show'"
                  @click="passwordToggle.main = !passwordToggle.main" />
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              hide-bottom-space
              label="Confirm Password"
              v-model="user.confirmPassword"
              @blur="$v.user.confirmPassword.$touch"
              :error="$v.user.confirmPassword.$error"
              :type="passwordToggle.confirm ? 'text' : 'password'">
              <template v-slot:prepend>
                <q-icon name="vpn_key" color="pink-2" class="q-ml-sm"/>
              </template>
              <template v-slot:append>
                <q-btn
                  v-if="user.confirmPassword"
                  dense
                  rounded
                  size="sm"
                  unelevated
                  color="pink-1"
                  class="q-px-sm"
                  text-color="pink"
                  :label="passwordToggle.confirm ? 'hide' : 'show'"
                  @click="passwordToggle.confrim = !passwordToggle.confirm" />
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              type="number"
              label="Age"
              v-model="user.age"
              hide-bottom-space
              @blur="$v.user.age.$touch"
              :error="$v.user.age.$error">
              <template v-slot:prepend>
                <q-icon name="verified_user" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-toggle
              dense
              color="positive"
              v-model="user.accept"
              checked-icon="check"
              unchecked-icon="clear"
              label="I accept the license and terms" />
          </div>
          <section class="q-mt-xl">
            <q-btn
              :disable="!isValid || !user.accept"
              class="full-width"
              label="Sign Up"
              color="primary"
              rounded />
          </section>
        </section>
      </q-page>
    </q-page-container>
    <img src="~assets/waiting-tree.svg" class="block absolute-bottom-right" width="200px" style="right: -15%; z-index: -1; opacity: .5"/>
    <div class="fixed-bottom row items-center justify-center q-pb-md">
      <div>Already have an account?</div>
      <q-btn to="/login" dense flat label="Log in" no-caps color="orange" class="text-body1 text-italic"/>
    </div>
  </q-layout>
</template>
<style lang="stylus" scoped>
.header
  border-bottom-right-radius 7rem
  background linear-gradient(to bottom right, $pink, $pink-3)
</style>
<script>
import { QInput, QToggle } from 'quasar'

import {
  email,
  sameAs,
  required,
  minLength,
  maxLength,
  minValue
} from 'vuelidate/lib/validators'

import { SignUpConstants } from '$constants'

export default {
  name: 'Register',
  components: {
    QInput,
    QToggle
  },
  data () {
    return {
      passwordToggle: {
        main: false,
        confirm: false
      },
      user: {
        fullName: null,
        email: null,
        password: null,
        confirmPassword: null,
        age: SignUpConstants.ageRestriction,
        accept: false
      }
    }
  },
  computed: {
    isValid () {
      return !this.$v.user.$invalid
    },
    errorMessage () {
      if (this.isValid) {
        return ''
      }
      if (this.$v.user.fullName.$error) {
        return '<strong>Full Name </strong> field is required.'
      }
      if (this.$v.user.email.$error) {
        return 'Please input a valid <strong>Email Address</strong>'
      }
      if (!this.$v.user.password.minLength) {
        return `<strong>Password</strong> should be <strong>at least ${this.$v.user.password.$params.minLength.min}</strong> characters.`
      }
      if (!this.$v.user.password.maxLength) {
        return `<strong>Password</strong> should be <strong>at most ${this.$v.user.password.$params.maxLength.max}</strong> characters.`
      }
      if (this.$v.user.confirmPassword.$error) {
        return 'Passwords do not match.'
      }
      if (!this.$v.user.age.minValue) {
        return `You should be <strong>at least ${this.$v.user.age.$params.minValue.min}</strong> to sign up.`
      }
      return ''
    }
  },
  validations () {
    const { min, max } = SignUpConstants.passwordLength
    const minAge = SignUpConstants.ageRestriction
    return {
      user: {
        fullName: { required },
        email: { required, email },
        password: {
          required,
          minLength: minLength(min),
          maxLength: maxLength(max)
        },
        confirmPassword: {
          sameAs: sameAs(user => user.password)
        },
        age: {
          minValue: minValue(minAge)
        }
      }
    }
  }
}
</script>
