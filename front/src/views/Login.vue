<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
    <span v-if="loggedUser.token">
      Hai già effettuato l'accesso.
    </span>
    <span v-if="!isLogged">
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
import { clearLoggedUser, isLogged, loggedUser, setLogged, setLoggedUser } from "@/global";

export default {
  name: 'LoginView',
  computed: {
    loggedUser() {
      return loggedUser
    },
	isLogged(){
		return isLogged()
	}
  },
  setup() {
    const data = reactive({
      email: '',
      password: '',
      token: ''
    })

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
        await router.push('/')

        setLogged(1)

        setLoggedUser(data)

      }else{
        await router.push('/login')
        alert("Prima devi creare un account")
      }
    }

    

    return {
      data,
      submit,
    }
  }
}

</script>
