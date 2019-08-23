<template>
  <q-page>
    <section class="absolute-center" style="width: 60vw">
      <q-linear-progress v-if="loading" query color="primary" stripe rounded style="height: .5rem"/>
      <section v-else>
        <section v-if="current" class="fixed-center">
          <Vue2InteractDraggable
            v-if="isShowing"
            interact-block-drag-down
            @draggedUp="like"
            @draggedRight="like"
            @draggedLeft="showNextCandidate"
            :interact-max-rotation="15"
            :interact-x-threshold="200"
            :interact-y-threshold="200"
            :interact-out-of-sight-x-coordinate="500"
            :interact-event-bus-events="dragEventBus"
            :class="{ 'transition': isShowing }"
            class="rounded-borders shadow-10 card card--1">
            <div class="column items-center justify-center fit text-white">
              <article class="fit rounded-borders" :class="current.name | fallbackColor('bg-')">
                <div class="text-h1 absolute-center text-uppercase">
                  {{current.name | initials}}
                </div>
                <div class="card__label absolute-bottom q-pa-md text-capitalize">
                  <div class="text-h4">{{current.name | firstName}}, <span class="text-weight-light">{{current.age}}</span></div>
                </div>
              </article>
            </div>
          </Vue2InteractDraggable>
        </section>
        <section class="fixed-center" style="z-index: -1">
          <div v-if="next" class="card card--2 rounded-borders shadow-15 bg-black">
            <div class="column fit text-white">
              <article class="fit rounded-borders" :class="next.name | fallbackColor('bg-')">
                  <div class="text-h1 absolute-center text-uppercase">
                    {{next.name | initials}}
                  </div>
                  <div class="card__label absolute-bottom q-pa-md text-capitalize">
                    <div class="text-h4">{{next.name | firstName}}, <span class="text-weight-light">{{next.age}}</span></div>
                  </div>
                </article>
            </div>
          </div>
        </section>
        <section class="fixed-center" style="z-index: -2">
          <div v-if="nextNext" class="card card--3 rounded-borders shadow-20 bg-black">
            <div class="column fit text-white">
              <article class="fit rounded-borders" :class="nextNext.name | fallbackColor('bg-')">
                  <div class="text-h1 absolute-center text-uppercase">
                    {{nextNext.name | initials}}
                  </div>
                  <div class="card__label absolute-bottom q-pa-md text-capitalize">
                    <div class="text-h4">{{nextNext.name | firstName}}, <span class="text-weight-light">{{nextNext.age}}</span></div>
                  </div>
                </article>
            </div>
          </div>
        </section>
      </section>
    </section>
    <section v-if="!loading" class="fixed-bottom full-width row justify-around items-center q-pb-xl">
      <q-btn
        @click="triggerSwipe('swipeLeft')"
        flat
        round
        icon="close"
        color="negative"
        class="shadow-1 bg-white"
        size="lg" />
      <q-btn
        @click="triggerSwipe('swipeUp')"
        push
        round
        icon="favorite"
        color="pink"
        class="shadow-2"
        size="xl" />
      <q-btn
        @click="triggerSwipe('swipeRight')"
        flat
        round
        icon="check"
        color="positive"
        class="shadow-1 bg-white"
        size="lg" />
    </section>
  </q-page>
</template>
<script>
import { QLinearProgress } from 'quasar'
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
import { CometChat } from '@cometchat-pro/chat'

import { API } from 'aws-amplify'

export default {
  name: 'Start',
  components: {
    QLinearProgress,
    Vue2InteractDraggable
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('users/fetch')
    this.userList.push(...this.$store.getters['users/list'])
    this.loading = false
  },
  data () {
    return {
      userList: [],
      loading: false,
      isShowing: true,
      listeners: [],
      dragEventBus: {
        draggedLeft: 'swipeLeft',
        draggedRight: 'swipeRight',
        draggedUp: 'swipeUp'
      }
    }
  },
  computed: {
    me () {
      return this.$store.getters['user/info']
    },
    uid () {
      return this.$store.getters['user/uid']
    },
    current () {
      return this.userList[0]
    },
    next () {
      return this.userList.length > 1 ? this.userList[1] : null
    },
    nextNext () {
      return this.userList.length > 2 ? this.userList[2] : null
    }
  },
  methods: {
    triggerSwipe (event) {
      InteractEventBus.$emit(event)
    },
    async like () {
      this.showNextCandidate()
      console.log('like')
      const themId = this.current.uid
      const response = await API.post('emberAPI', '/has-matched', {
        body: { me: this.uid, them: themId }
      })
      if (response.error) {
        const groupId = `${this.uid}-${themId}`
        const groupName = `${this.me.name}-${this.current.name}`
        await CometChat
          .createGroup(new CometChat.Group(groupId, groupName, CometChat.GROUP_TYPE.PUBLIC))
        console.log('Liked! Created private group:', groupId)
        this.listeners.push(groupId)
        console.log('Listening for the other party to join...')
        CometChat.addGroupListener(
          groupId,
          new CometChat.GroupListener({
            onGroupMemberJoined: (ju, jg) => {
              console.log('Match! Someone joined our private group', ju)
              this.$router.replace({
                name: 'chat',
                params: { groupId, uid: ju.actionBy.uid }
              })
            }
          })
        )
        return
      }
      console.log('Match! There is an existing private group. Joining...')
      this.$router.replace({
        name: 'chat',
        params: { groupId: `${themId}-${this.uid}`, uid: themId }
      })
    },
    showNextCandidate () {
      setTimeout(() => { this.isShowing = false }, 200)
      setTimeout(() => {
        this.userList.splice(0, 1)
        this.isShowing = true
      }, 200)
    }
  },
  beforeDestroy () {
    // if (this.listeners.length > 0) {
    //   this.listeners.forEach(l => CometChat.removeGroupEventListener(l))
    //   this.listeners = []
    // }
  }
}
</script>
<style lang="stylus" scoped>
$border-radius = 1rem

.rounded-borders
  border-radius $border-radius

.card
  width 80vw
  height 55vh
  &--1
    transform translate(-2%, -8%)
    filter brightness(100%)
  &--2
    transform: translate(0%, -5%)
    filter brightness(70%)
  &--3
    transform: translate(2%, -3%)
    filter blur(1px) brightness(60%)
  &__label
    background rgba(#000, .45)
    border-bottom-left-radius $border-radius
    border-bottom-right-radius $border-radius

.transition
  animation: appear .3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s

@keyframes appear
  from
    transform: translate(0%, -5%);
    filter brightness(70%)
  to
    transform: translate(-2%, -8%);
    filter brightness(100%)
</style>
