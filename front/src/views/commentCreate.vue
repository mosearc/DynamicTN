<template>
  <form @submit.prevent="submit" class="form-commentCreation">
    <h1 class="h3 mb-3 fw-normal"><b>Aggiungi un commento alla discussione</b></h1>
    <div class="form-group">
      <textarea v-model="text" rows="10" class="input form-control" placeholder="Inserisci qui il tuo commento..."></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="submit-btn">Pubblica</button>
      &nbsp;
      <button type="button" class="cancel-btn" @click="navigate.push({ path: `/feed/${$route.params.id}` })">Annulla</button>
    </div>
  </form>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { loggedUser } from "@/global";

export default {
  data() {
    return {
      text: "",
      navigate: useRouter(),
    };
  },
  methods: {
    async submit() {
      console.log("42");

      const body = { text: this.text, postId: this.$route.params.id };

      await axios.post(process.env.VUE_APP_BACK_PATH + "comments", body, {
        headers: {
          authorization: " " + loggedUser.token,
        },
      })
      .then(() => {
        this.navigate.push({ path: `/feed/${this.$route.params.id}` });
      })
      .catch((err) => {
        console.error(err);
      });
    },
  },
};
</script>

<style scoped>
.form-commentCreation {
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

.cancel-btn {
  background-color: #dc3545;
  width: 100%;
}

.cancel-btn:hover {
  background-color: #c82333;
}
</style>
