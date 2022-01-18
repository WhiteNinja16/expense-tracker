const whitelist = [
  'http://localhost:3000',
  'https://studio.apollographql.com'
]

export default {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
