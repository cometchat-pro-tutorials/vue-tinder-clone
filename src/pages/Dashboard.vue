<template>
  <q-page class="flex flex-center">
    <section class="column q-gutter-y-md text-center text-primary">
      <div>
        <div class="relative-position">
          <q-avatar color="primary" text-color="white" size="10rem" class="shadow-20">
            <span class="text-h3">{{info.name | initials}}</span>
          </q-avatar>
          <div
            class="text-h4 bg-white absolute-bottom-right q-pa-xs"
            style="border-radius: 50%; right: 20%">
            🔥
          </div>
        </div>
        <div class="text-h5 q-mt-md">{{info.name}}</div>
      </div>
      <q-btn to="/start" label="start" outline color="primary" rounded class="q-mt-xl"/>
    </section>
  </q-page>
</template>

<style>
</style>

<script>
import { QAvatar } from 'quasar'

export default {
  name: 'PageIndex',
  components: {
    QAvatar
  },
  computed: {
    info () {
      return this.$store.getters['user/info']
    }
  }
}
</script>
