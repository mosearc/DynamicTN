import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authentication } from './plugins/authentication'
import App from './App.vue'
import router from './router'



import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap"


import vue3GoogleLogin from 'vue3-google-login'

const CLIENT_ID = "280337102027-db408fe5fju2riksqh4si5si7uljg1rd.apps.googleusercontent.com"


const app = createApp(App)

app.use(vue3GoogleLogin,{
  clientId: CLIENT_ID,
})

app.use(createPinia())

authentication.install().then(()=>{
  app.use(router)
  app.mount('#app')

})


