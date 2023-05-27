import { app } from './app'
import { appRoutes } from './http/routes'

app.register(appRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    console.log(`HTTP Server running`)
  })
