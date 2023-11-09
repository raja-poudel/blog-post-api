import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import routes from './api/index'

const app: FastifyInstance = Fastify({})
const port = process.env.PORT || 7000

app.register(helmet)
app.register(cors, {
  origin: true,
  credentials: true
})

routes(app)

app.listen({ port: +port, host: `0.0.0.0` }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`Server listening on ${address}`)
})

module.exports = app
