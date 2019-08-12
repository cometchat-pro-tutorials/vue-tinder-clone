import { LocalStorage } from 'quasar'

export const setAuthToken = (state, token) => {
  state.token = token
  LocalStorage.set(state.tokenKey, token)
}

export const setUID = (state, uid) => {
  state.uid = uid
}

export const clearToken = (state) => {
  state.token = null
  LocalStorage.remove(state.tokenKey)
}

export const setInfo = (state, payload) => {
  const { uid, name, email, lastActiveAt, avatar, metadata } = payload
  state.name = name
  state.email = email
  state.lastActiveAt = lastActiveAt
  state.avatar = avatar
  state.age = metadata.age
  state.uid = uid
}
