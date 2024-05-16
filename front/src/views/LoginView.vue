<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
    <span v-if="logged">
      Already Logged!
      <!--
      <button type="button" @click="logout">Logout</button>
      -->
    </span>

    <span v-if="!logged">
      <h1 class="h3 mb-3 fw-normal"><b>Entra nel tuo account</b></h1>

      <input v-model="data.email" type="email" class="form-control" placeholder="Inserisci e-mail">

      <input v-model="data.password" type="password" class="form-control" placeholder="Inserisci password">

      <button class="btn btn-primary w-100 py-2" type="submit">Accedi</button>
    </span>
  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {logged, setLogged} from "@/global";

export default {
  name: 'LoginView',
  setup() {
    const data = reactive({
      email: '',
      password: '',
    })

    const router = useRouter()

    const submit = async () => {

      const response = await fetch('http://localhost:3000/auth', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data),
      })

      const responseData = await response.json()
      const token = responseData.token
      console.log(responseData)
      console.log(token)

      if(response.ok){
        router.push('/')
        localStorage.setItem('token', token)
        setLogged(1)
      }else{
        router.push('/login')
        alert("WRONG!")
      }
    }

    return {
      data,
      submit,
      logged,
    }
  }
}

/* export default {
  name: 'LoginView',
  setup() {
    const data = reactive({
      email: '',
      password: '',
    })

    const router = useRouter()

    const submit = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Failed to login')
        }

        const responseData = await response.json()

        // Assuming the token is returned as 'token' in the response
        const token = responseData.token
        console.log(token)

        // Set the token in a cookie
        document.cookie = `authToken=${token};path=/`

        await router.push('/')
      } catch (error) {
        console.error('Error occurred during login:', error)
        // Handle error or display error message to the user
      }
    }

    return {
      data,
      submit
    }
  }
} */
</script>
