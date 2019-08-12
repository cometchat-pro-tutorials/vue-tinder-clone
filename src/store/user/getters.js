export const uid = state => state.uid

export const token = state => state.token

export const info = state => ({
  name: state.name,
  avatar: state.avatar,
  lastActiveAt: state.lastActiveAt,
  email: state.email,
  age: state.age
})
