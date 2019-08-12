import { LocalStorage } from 'quasar'

const tokenKey = 'ember-token'

export default {
  uid: null,
  tokenKey,
  token: LocalStorage.getItem(tokenKey),
  email: null,
  avatar: '',
  lastActiveAt: '',
  name: '',
  age: 0
}
