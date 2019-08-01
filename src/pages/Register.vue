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
          <div class="column q-gutter-y-md">
            <q-input dense v-model="user.fullName"  label="Full Name" outlined rounded>
              <template v-slot:prepend>
                <q-icon name="person" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-input dense v-model="user.email" type="email" label="Email Address" outlined rounded>
              <template v-slot:prepend>
                <q-icon name="mail" color="pink-2" class="q-ml-sm"/>
              </template>
            </q-input>
            <q-input
              dense
              rounded
              outlined
              label="Password"
              v-model="user.password"
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
              label="Confirm Password"
              v-model="user.confirmPassword"
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
              v-model="user.age">
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
            <q-btn class="full-width" label="Sign Up" color="primary" rounded />
          </section>
        </section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="stylus" scoped>
.header
  border-bottom-right-radius 7rem
  background linear-gradient(to bottom right, $pink, $pink-3)
</style>
<script>
import { QInput, QToggle } from 'quasar'

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
        age: null,
        accept: false
      }
    }
  }
}
</script>
