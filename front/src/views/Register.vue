<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
  <span v-if="reg.si || loggedUser.token">
    Already Registered!

    <button type="button" @click="exit">Exiet</button>

  </span>

    <span v-if="!reg.si && !loggedUser.token">

      <h1 class="h3 mb-3 fw-normal"><b>Crea un account</b></h1>

      <input v-model="data.email" type="email" class="form-control" placeholder="Inserisci e-mail">

      <input v-model="data.password" type="password" class="form-control" placeholder="Inserisci password">

      <button class="btn btn-primary w-100 py-2" type="submit">Registrati</button>
  </span>
  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {registered, setRegistered, logged, clearLoggedUser, setLogged, loggedUser, reg, setReg} from "@/global";

export default {
  name: 'RegisterView',
  computed: {
    loggedUser() {
      return loggedUser
    },
    reg(){
      return reg
    }
  },
  setup(){
    const data = reactive({
      email: '',
      password: '',
    })

    loggedUser.token = sessionStorage.token;
    setReg(sessionStorage.getItem("regist"))

    const router = useRouter()

    const submit = async () => {
      //console.log(data)
      const response = await fetch(process.env.VUE_APP_BACK_PATH + 'users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })

      setRegistered(1)

      if(response.ok){
        sessionStorage.setItem('regist', 'ao')
        console.log(sessionStorage.getItem("regist"))
        setReg(sessionStorage.getItem("regist"))

        await router.push('/login')
        alert("Account creato")

      }else{
        await router.push('/register')
        alert("Questo account esiste già! Effettua l'accesso")
      }

    }

    function exit(){
      console.log("42")
      clearLoggedUser()
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('regist')
      setReg(sessionStorage.getItem("regist"))
    }

    return {
      data,
      submit,
      registered,
      logged,
      exit
    }
  }
}
</script>
