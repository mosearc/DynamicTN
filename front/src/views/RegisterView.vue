<template>




  <form @submit.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please Register</h1>

    <input v-model="data.email" type="email" class="form-control" placeholder="name@example.com">

    <input v-model="data.password" type="password" class="form-control" placeholder="Password">

    <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import {reactive} from "vue";
import {useRouter} from "vue-router";

export default {
  name: 'RegisterView',
  setup(){
    const data = reactive({
      email: '',
      password: '',
    })

    const router = useRouter()

    const submit = async () => {
      //console.log(data)
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      })

      await router.push('/login')
    }

    return {
      data,
      submit
    }
  }
}
</script>
