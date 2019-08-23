import { CometChat } from '@cometchat-pro/chat'

export default async ({ router, store }) => {
  const isAuthenticated = () => store.getters['user/uid']
  const hasPreviousSession = async () => store.dispatch('user/fetchCurrentUser')

  router.beforeEach(async (to, from, next) => {
    const { path } = to
    switch (path) {
      case '/login': {
        if (isAuthenticated()) {
          return next('/')
        }
        const user = await hasPreviousSession()
        if (!user) {
          return next()
        }
        const token = store.getters['user/token']
        if (!token) {
          await store.dispatch('user/auth', user.username)
        }
        await CometChat.login(token)
        return next('/')
      }
      case '/register': return next()
      default: {
        if (isAuthenticated()) {
          return next()
        }
        if (!(await hasPreviousSession())) {
          return next('/login')
        }
        store.dispatch('user/fetch')
        return next()
      }
    }
  })
}
