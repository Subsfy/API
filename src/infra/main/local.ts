import 'reflect-metadata'
import App from '@infra/http/express/app'
import { logger } from '@winston'

const port = process.env.PORT || 3333
const env = process.env.API_ENV || 'dev'

// function middlewares(): void {}
// function documentation(): void {}

App.listen(port, () => {
  logger.info(`API running on port: ${port}, env: ${env}`)
})
