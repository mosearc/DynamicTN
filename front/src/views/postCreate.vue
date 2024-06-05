<template>
  <form @submit.prevent="submit" class="form-postCreation">
    <h1 class="h3 mb-3 fw-normal"><b>Crea Post</b></h1>
    <div class="form-group">
      <label for="postTitle">Titolo:</label>
      <input v-model="data.name" type="text" id="postTitle" class="form-control" placeholder="Inserisci titolo" />
    </div>
    <div class="form-group">
      <label for="postText">Testo:</label>
      <input v-model="data.text" type="text" id="postText" class="form-control" placeholder="Inserisci testo" />
    </div>
    <div class="form-group">
      <button type="submit" class="submit-btn">Pubblica</button>
    </div>
  </form>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { clearLoggedUser, logged, loggedUser, setLogged, setLoggedUser } from "@/global";

export default {
  name: 'PostCreate',
  computed: {
    loggedUser() {
      return loggedUser
    }
  },
  setup() {
    const data = reactive({
      name: '',
      text: '',
      token: sessionStorage.token,
    });

    const router = useRouter();

    const submit = async () => {
      console.log("42")
      const response = await fetch(process.env.VUE_APP_BACK_PATH + 'posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token},
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await router.push('/')
        alert("Post creation success")
      } else {
        if (response.status == 401) {
          await router.push('/login')
          alert("Token expires")
        } else {
          await router.push('/postCreation')
          alert("Post creation failed, retry")
        }
      }
    };

    return {
      data,
      submit,
    };
  }
};
</script>

<style scoped>
.form-postCreation {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #007bff;
  width: 100%;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
