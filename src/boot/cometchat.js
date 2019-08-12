import { CometChat } from '@cometchat-pro/chat'

export default async ({ Vue }) => {
  await CometChat.init(process.env.COMET_APP_ID)
  Vue.prototype.$comet = CometChat
  return Promise.resolve()
}
