<template>
  <form @submit.prevent="submit" class="form-signin w-100 m-auto">
    <span v-if="reg.si || loggedUser.token">
      Already Registered!
      <button type="button" @click="exit">Exit</button>
      <button type="button" @click="elimina">Delete Account</button>
    </span>
    <span v-if="!reg.si && !loggedUser.token">
      <h1 class="h3 mb-3 fw-normal"><b>Create an account</b></h1>
      <input v-model="data.email" type="email" class="form-control" placeholder="Enter email">
      <input v-model="data.password" type="password" class="form-control" placeholder="Enter password">
      <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
    </span>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { registered, setRegistered, logged, clearLoggedUser, setLogged, loggedUser, reg, setReg } from "@/global";
import router from "@/router";

export default {
  name: 'RegisterView',
  computed: {
    loggedUser() {
      return loggedUser;
    },
    reg() {
      return reg;
    }
  },
  setup() {
    const data = reactive({
      email: '',
      password: '',
    });

    loggedUser.token = sessionStorage.token;
    setReg(sessionStorage.getItem("regist"));

    const router = useRouter();

    const submit = async () => {
      const response = await fetch(process.env.VUE_APP_BACK_PATH + 'users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result); // Log the result to inspect the response structure

      setRegistered(1);

      if (response.ok) {
        sessionStorage.setItem('regist', 'ao');
        if (result.id) {
          sessionStorage.setItem('userId', result.id); // Store the user ID
        } else {
          console.warn("User ID not found in response:", result);
        }
        setReg(sessionStorage.getItem("regist"));

        await router.push('/login');
        alert("ACCOUNT CREATED!");
      } else {
        await router.push('/register');
        alert("USER ALREADY EXISTS!");
      }
    };

    function exit() {
      clearLoggedUser();
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('regist');
      sessionStorage.removeItem('userId'); // Remove user ID
      setReg(sessionStorage.getItem("regist"));
    }

    async function elimina() {

      const userId = sessionStorage.getItem('userId'); // Retrieve the user ID from session storage
      if (!userId) {
        alert("User ID not found");
        return;
      }

      console.log(userId)
      try {
        const response = await fetch(`${process.env.VUE_APP_BACK_PATH}users/${userId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          clearLoggedUser();
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('regist');
          sessionStorage.removeItem('userId'); // Remove user ID
          setRegistered(0)
          alert("ACCOUNT DELETED");
          sessionStorage.removeItem('userId'); // Clean up user ID from session storage
          await router.push('/register');
        } else {
          alert("Failed to delete account");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      data,
      submit,
      registered,
      logged,
      exit,
      elimina
    };
  }
}
</script>
