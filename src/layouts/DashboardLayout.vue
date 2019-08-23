<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-tabs class="bg-white text-grey shadow-up-2" active-color="primary">
        <q-route-tab
          icon="account_circle"
          to="/"
          exact
        />
        <q-route-tab
          icon="whatshot"
          to="/start"
          exact
        />
        <q-route-tab
          icon="chat"
          to="/messages"
        />
      </q-tabs>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, QTabs, QRouteTab } from 'quasar'

export default {
  name: 'DashboardLayout',
  components: {
    QTabs,
    QRouteTab
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.replace('/login')
    }
  }
}
</script>

<style>
</style>
