import { API, Auth } from 'aws-amplify'
import { CometChat } from '@cometchat-pro/chat'

export const signUp = (context, payload) => {
  return Auth.signUp(payload)
}

export const confirmSignUp = (context, { email, confirmationCode }) => {
  return Auth.confirmSignUp(email, confirmationCode)
}

export const create = async ({ commit }, payload) => {
  await API.post('emberAPI', '/register', { body: payload })
  const { data } = await API.post('emberAPI', '/token', { body: { uid: payload.uid } })
  commit('setAuthToken', data.authToken)
}

export const auth = async ({ commit }, uid) => {
  const { data } = await API.get('emberAPI', '/token', { queryStringParameters: { uid } })
  let authToken = null
  if (data.length === 0) {
    const response = await API.post('emberAPI', '/token', { body: { uid } })
    authToken = response.data.authToken
  } else {
    authToken = data[0].authToken
  }
  commit('setAuthToken', authToken)
  commit('setUID', uid)
}

export const signIn = async ({ getters, commit, dispatch }, { email, password }) => {
  const { username: uid } = await Auth.signIn(email, password)
  if (!getters.token) {
    await dispatch('auth', uid)
  }
  commit('setInfo', await CometChat.login(getters.token))
}

export const fetch = async ({ commit }) => {
  commit('setInfo', await CometChat.getLoggedinUser())
}

export const logout = async ({ commit, getters }) => {
  await Promise.all([
    Auth.signOut(),
    CometChat.logout()
  ])
  commit('clearToken')
  commit('clearUID')
  return Promise.resolve()
}

export const fetchCurrentUser = async ({ commit }) => {
  try {
    const [user] = await Promise.all([
      Auth.currentUserInfo(),
      CometChat.getLoggedinUser()
    ])
    return user !== null
  } catch (error) {
    commit('clearToken')
    commit('clearUID')
    return false
  }
}
