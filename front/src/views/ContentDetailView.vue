<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-if="content.postImage" v-bind:src="'http://localhost:3000/'+content.postImage" />
        </div>
        <div id="content-details">
            <h1>{{ content.name }}</h1>
            <p id="location">📍{{ content.location }}</p>
            <p>{{ content.text }}</p>
			<div v-if="logged">
			</div>
			<div>
				<router-link to="/">
					<button class="option">Indietro</button>
				</router-link>
				<router-link v-bind:to="/comments/+this.content._id">
					<button class="option">Mostra commenti</button>
				</router-link>
        <button type="button" @click="elimina">elimina</button>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
import {logged, setLogged} from "@/global";
import router from "@/router";




export default {
    name: 'ContentDetailView',
    data() {
        return {
            content: [],

        };
    },
    async created() {
        const result = await axios.get(`http://localhost:3000/posts/${this.$route.params.id}`);
        const content = result.data.post;
        this.content = content;
    },
    methods: {
      async elimina() {
        await fetch(`http://localhost:3000/posts/${this.$route.params.id}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token},
          credentials: 'include',
        })
            .then(async (response) => {
              if (response.ok) {
                await router.push('/')
              } else {
                alert("seems you aren't admin")
              }
            })
            .catch((error) => {
              console.log(error);
            })
      }
    }

};
</script>

<style>
#page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
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
    position: relative;
}

#description {
    position: absolute;
    top: 24px;
    right: 16px;
}

button.option {
    width: 100%;
    margin: 1px;
}

#location {
    position: absolute;
    top: 24px;
    right: 16px;
}
</style>
