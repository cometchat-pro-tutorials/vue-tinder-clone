
const normalize = user => ({
  ...user,
  age: user.metadata ? user.metadata.age : null
})

// eslint-disable-next-line
export const add = (state, users) => {
  state.list.push(...users.map(normalize))
}
