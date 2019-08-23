<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          color="blue-grey-9"
          @click="$router.go(-1)"
          icon="keyboard_backspace" />
        <q-toolbar-title class="column items-center justify-center">
          <span class="text-body1 text-black">{{them.name}}</span>
          <span class="text-caption text-grey">Active a minute ago</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="flag" color="red-5" />
      </q-toolbar>
      <span />
    </q-header>
    <q-footer  class="q-pa-md bg-white row justify-between items-center">
      <q-input
        v-model.trim="message"
        dense
        rounded
        autogrow
        placeholder="Aa"
        :maxlength="200"
        standout="bg-grey-1"
        input-class="text-black"
        class="col q-pr-sm"
        @keydown.enter.prevent="sendMessage"
      />
      <q-btn
        round
        :disable="!message"
        size="md"
        icon="send"
        color="primary"
        @click="sendMessage"/>
    </q-footer>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-chat-message
          v-for="(msg, index) in messages" :key="index"
          name-sanitize
          text-sanitize
          :text="msg.text"
          :sent="msg.sent"
          :bg-color="msg.sent ? 'blue-4' : 'pink-4'"
          text-color="white">
          <template v-slot:avatar>
            <q-avatar :color="msg.name | fallbackColor" text-color="white" size="48px" class="q-message-avatar">
              <span class="text-h6">{{msg.name | initials}}</span>
            </q-avatar>
          </template>
        </q-chat-message>
        <div id="bottomIndicator"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import {
  scroll,
  QFooter,
  QInput,
  QAvatar,
  QChatMessage
} from 'quasar'

import { CometChat } from '@cometchat-pro/chat'

const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'Chat',
  components: {
    QFooter,
    QInput,
    QAvatar,
    QChatMessage
  },
  async mounted () {
    console.log('Registering group listener', this.groupId)
    CometChat.addMessageListener(
      this.groupId,
      new CometChat.MessageListener({
        onTextMessageReceived: this.receiveMessage
      })
    )
  },
  data () {
    return {
      message: '',
      messages: []
    }
  },
  computed: {
    groupId () {
      return this.$route.params.groupId
    },
    me () {
      return this.$store.getters['user/info']
    },
    them () {
      return this.$store
        .getters['users/list']
        .find(user => user.uid === this.$route.params.uid) ||
        { name: '', lastActiveAt: '' }
    }
  },
  methods: {
    sendMessage () {
      const message = this.message
      if (!this.message) {
        return
      }
      console.log('Sending message...')
      CometChat.sendMessage(new CometChat.TextMessage(
        this.groupId,
        this.message,
        CometChat.MESSAGE_TYPE.TEXT,
        CometChat.RECEIVER_TYPE.GROUP
      )).then(
        message => { console.log('Message sent.', message) },
        error => { console.log('Message sent failed.', error) }
      )
      this.messages.push({
        sent: true,
        name: this.me.name,
        text: [message]
      })
      this.message = ''
      this.scrollToBottom()
    },
    receiveMessage (textMessage) {
      console.log('A message has arrived! ', textMessage)
      this.messages.push({
        sent: false,
        name: this.them.name,
        text: [textMessage.text]
      })
      this.scrollToBottom()
    },
    scrollToBottom () {
      const bottom = document.getElementById('bottomIndicator')
      setScrollPosition(getScrollTarget(bottom), bottom.offsetTop, 1000)
    }
  },
  beforeDestroy () {
    CometChat.removeMessageListener(this.groupId)
  }
}
</script>
<style lang="stylus" scoped>
.rounded-input
  border-radius 1rem
</style>
