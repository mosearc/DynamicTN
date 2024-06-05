<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
    <span v-if="loggedUser.token">
      Hai già effettuato l'accesso.
      <button @click="logout">Esci</button>
    </span>
    <span v-if="!loggedUser.token">
      <h1 class="h3 mb-3 fw-normal"><b>Entra nel tuo account</b></h1>
      <input v-model="data.email" type="email" class="form-control" placeholder="Inserisci e-mail">
      <input v-model="data.password" type="password" class="form-control" placeholder="Inserisci password">
      <button class="btn btn-primary w-100 py-2" type="submit">Accedi</button>
    </span>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { clearLoggedUser, logged, loggedUser, setLogged, setLoggedUser } from "@/global";

export default {
  name: 'LoginView',
  computed: {
    loggedUser() {
      return loggedUser
    }
  },
  setup() {
    const data = reactive({
      email: '',
      password: '',
      token: ''
    })

    loggedUser.token = sessionStorage.token;
    console.log(sessionStorage.getItem("token"))

    const router = useRouter()

    const submit = async () => {
      console.log("42")
      const response = await fetch(process.env.VUE_APP_BACK_PATH + 'auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      const token = responseData.token
      data.token = token

      if(response.ok){
        //localStorage.setItem('token', token)
        sessionStorage.setItem('token', token)

        await router.push('/')

        setLogged(1)

        setLoggedUser(data)

      }else{
        await router.push('/login')
        alert("Prima devi creare un account")
      }
    }

    function logout(){
      console.log("42")
      clearLoggedUser()
      //localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      setLogged(0)
    }

    return {
      data,
      submit,
      logged,
      logout
    }
  }
}

</script>
