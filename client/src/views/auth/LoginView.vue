<template>


  <div id="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="loginData.email" type="email" class="form-control" id="email" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="loginData.password" type="password" class="form-control" id="password">
          </div>
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>
    </div>

  </div>

  <GoogleLogin :callback="callback" prompt auto-login/>

</template>

<script setup lang="ts">
import { useAuthStore, type LoginData, type RegisterData } from '../../stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import {GoogleLogin} from "vue3-google-login";
import {decodeCredential} from "vue3-google-login";


const authStore = useAuthStore()
const router = useRouter()

const loginData = reactive<LoginData>({
  email: "",
  password: "",
})

const errorMessage = ref<string>("")

async function submit(){
  await authStore.login(loginData)
    .then(res => {
      router.replace({name: "home"})
    })
    .catch(err => {
      errorMessage.value = err.message
    })
}

const registerData = reactive<RegisterData>({
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password_confirm: "",
})

//
//
//

//  function callback(response: any) {
//
//   console.log("logged in")
//   console.log(response)
//   let user = decodeCredential(response.credential)
//   console.log(user)
// //
// //
// //   registerData.email = JSON.parse(user.toString()).email
// //   registerData.username = JSON.parse(user.toString()).name
// //   registerData.first_name = JSON.parse(user.toString()).family_name
// //   registerData.last_name = JSON.parse(user.toString()).given_name
// //
// //  authStore.register(registerData)
//   router.replace({name: "home"})
// }


async function callback(response: any){
  console.log("logged in")
  console.log(response)
  let userr = decodeCredential(response.credential)
  console.log(userr)

  registerData.email = userr.email





  await authStore.register(registerData)
      .then(res => {
        router.replace({name: "home"})

      })
      .catch(err => {
        errorMessage.value = err.message
      })
}





</script>





<style scoped>
#login .card{
  max-width: 40vw;
  margin: auto;
}
</style>