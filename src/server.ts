import App from './app'

const port = process.env.PORT || 3333
const env = process.env.API_ENV || 'dev'

function middlewares(): void {}
function documentation(): void {}

App.listen(port, () => {
  console.log(`API running on port: ${port}, env: ${env}`)
})