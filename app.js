const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const ioClient = require('socket.io-client')

const rpi = {
  url: 'https://clever-owl-36.telebit.io',
  isConnected: false,
  socket() {
    return ioClient.connect(this.url)
  },
  watch () {
    this.socket().on('connect', () =>
      io.emit('connected', (this.isConnected = true))
    )
    this.socket().on('disconnect', () =>
      io.emit('connected', (this.isConnected = false))
    )
  },
}

rpi.watch()
io.on('connect', () => io.emit('connected', rpi.isConnected))

app.get('/', (req, res) => res.send('<h1>ConstanteSans</h1>'))
http.listen(3000)
