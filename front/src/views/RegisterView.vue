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

    loggedUser.token = localStorage.token;

    const router = useRouter()

    const submit = async () => {
      //console.log(data)
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })

      setRegistered(1)

      setReg(1)

      await router.push('/login')
    }

    function exit(){
      clearLoggedUser()
      localStorage.removeItem('token')
      setReg(0)
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
