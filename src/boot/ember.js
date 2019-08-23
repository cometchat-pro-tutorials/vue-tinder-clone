
const DEFAULT_COLORS = [
  'red',
  'pink',
  'lime',
  'green',
  'orange',
  'light-blue',
  'light-green',
  'deep-purple',
  'deep-orange'
]

export default ({ Vue }) => {
  Vue.filter('initials', value => {
    const splits = value.split(' ')
    if (splits.length > 1) {
      const first = splits[0][0]
      const last = splits[splits.length - 1][0]
      return `${first}${last}`
    }
    const first = splits[0][0]
    const last = splits[0][1] || ''
    return `${first}${last}`
  })

  Vue.filter('firstName', value => value.split(' ')[0])

  Vue.filter('fallbackColor', (name, prefix = '') => {
    if (!name) {
      return `${prefix}${DEFAULT_COLORS[0]}`
    }
    const charCode = name.charCodeAt(0) - 65 // Capital 'A'. Pan to zero
    let colorIndex = charCode
    if (charCode >= DEFAULT_COLORS.length) {
      colorIndex = charCode % DEFAULT_COLORS.length
    }
    return `${prefix}${DEFAULT_COLORS[colorIndex]}`
  })
}
