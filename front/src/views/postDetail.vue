<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-if="content.postImage" v-bind:src="backPath + content.postImage" />
        </div>
        <div id="content-details">
            <h1>{{ content.name }}</h1>
            <!-- <p id="location">📍{{ content.location }}</p> -->
            <p>{{ content.text }}</p>
			<div v-if="logged"></div>
			<div>
				<router-link to="/">
					<button class="back-btn">Indietro</button>
				</router-link>
				<router-link v-bind:to="/comments/ + this.content._id">
					<button class="show-btn">Mostra commenti</button>
				</router-link>
        <button @click="deletePost" class="delete-btn">Elimina post</button>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
import { logged, setLogged } from "@/global";
import router from "@/router";

export default {
  name: 'PostDetail',
  data() {
      return {
          content: []
      };
  },
  async created() {
      const result = await axios.get(process.env.VUE_APP_BACK_PATH + `posts/${this.$route.params.id}`);
      this.content = result.data.post;
  },
  computed: {
    backPath() {
      return process.env.VUE_APP_BACK_PATH;
    }
  },
  methods: {
    async deletePost() {
      console.log("42")
      await fetch(process.env.VUE_APP_BACK_PATH + `posts/${this.$route.params.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token},
        credentials: 'include',
      })
        .then(async (response) => {
          if (response.ok) {
            await router.push('/')
          } else {
            alert("Non sei autorizzato ad eliminare questo post.");
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
  max-height: 100%;
}

#content-details {
  padding: 16px;
}

#location {
  margin-top: 0.5em;
  color: #888;
}

.show-btn {
  background-color: #007bff;
}

.show-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  margin-top: 20px;
  margin-left: 10px;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
