<template>
  <form @submit.prevent="submit" class="form-postCreation w-100 m-auto">

      <h1 class="h3 mb-3 fw-normal"><b>Crea Post</b></h1>

      <input v-model="data.name" type="text" class="form-control" placeholder="Inserisci Titolo">

      <input v-model="data.text" type="text" class="form-control" placeholder="Inserisci Testo">

      <button class="btn btn-primary w-100 py-2" type="submit">Pubblica</button>

  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {clearLoggedUser, logged, loggedUser, setLogged, setLoggedUser} from "@/global";

export default {
  name: 'LoginView',
  computed: {
    loggedUser() {
      return loggedUser
    }
  },
  setup() {
    const data = reactive({
      name: '',
      text: '',
      token: ''
    })

    console.log("2: ")
    //loggedUser.token = localStorage.token;
    loggedUser.token = sessionStorage.token;
    console.log(loggedUser.token)
    //console.log(localStorage.getItem("token"))
    console.log(sessionStorage.getItem("token"))

    const router = useRouter()

    const submit = async () => {

      const response = await fetch(process.env.VUE_APP_BACK_PATH + 'posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token},
        credentials: 'include',
        body: JSON.stringify(data),
      })


      if(response.ok){
        await router.push('/')
        alert("Post creation success")
      }else{
        if(response.status == 401){
          await router.push('/login')
          alert("Token expires")
        }else{
          await router.push('/postCreation')
          alert("Post creation failed, retry")
        }
      }
    }


    return {
      data,
      submit,
    }
  }
}
</script>
