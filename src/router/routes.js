
const routes = [
  {
    path: '/',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
      { path: 'start', component: () => import('pages/Start.vue') }
    ]
  },
  { path: '/chat/:groupId/:uid/', name: 'chat', component: () => import('pages/Chat.vue') },
  { path: '/login', component: () => import('pages/Login.vue') },
  { path: '/register', component: () => import('pages/Register.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
