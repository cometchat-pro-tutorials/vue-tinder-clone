import { CometChat } from '@cometchat-pro/chat'

const USER_LIMIT = 30

const usersRequest = new CometChat
  .UsersRequestBuilder()
  .setLimit(USER_LIMIT)
  .build()

// eslint-disable-next-line
export const fetch = async ({ commit }) => {
  commit('add', await usersRequest.fetchNext())
}
