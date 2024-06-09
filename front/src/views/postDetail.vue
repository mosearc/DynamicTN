<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-if="content.postImage" v-bind:src="backPath + content.postImage" />
        </div>
        <div id="content-details">
            <h1>{{ content.name }}</h1>
            <!-- <p id="location">📍{{ content.location }}</p> -->
            <p>{{ content.text }}</p>

			
			<div id="actions">
				<button @click="sendUpvote">{{ this.votes }}&nbsp;👍</button>
			
				<router-link v-bind:to="/commentCreate/ + this.content._id" v-if="loggedUser.token !== undefined" >
				
					<button class="show-btn">Commenta</button>
				</router-link>
				<button @click="deletePost" class="delete-btn">Elimina post</button>
				
			</div>
			<router-link to="/">
				<button class="back-btn">Indietro</button>
			</router-link>
		</div>
		
    </div>
	<div id="page-wrap">
		<h2>Commenti</h2>
		<div v-if="this.comments.length > 0">
			<div v-for="comment in comments" v-bind:key="comment._id">
				<p>{{ comment.text }}</p>
				<hr/>
			</div>
		</div>
		<div v-else>
			<br/>
			<p style="text-align: center">Non ci sono commenti in questo post.</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { loggedUser,setLogged } from "@/global";
import router from "@/router";


export default {
    name: 'PostDetail',
    data() {
        return {
            content: [],
			comments: [],
			loggedUser: loggedUser,
			votes: 0
        };
    },
    async created() {
        const result = await axios.get(process.env.VUE_APP_BACK_PATH + `posts/${this.$route.params.id}`);
        this.content = result.data.post;
		
		await axios.get(process.env.VUE_APP_BACK_PATH + `votes/posts/${this.$route.params.id}`).then((res) => {
			this.votes = res.data.nrLikes;
		}).catch((err) => {
			console.error(err);
			if (err.response.status !== 404) {
				alert(err);
			}
		});

		await axios.get(process.env.VUE_APP_BACK_PATH + `comments/fromPost/${this.$route.params.id}`).then((res) => {
			if (res.data !== undefined)
				this.comments = res.data.comments;
		}).catch((err) => {
			console.error(err);
		});
    },

	computed: {
		backPath() {
			return process.env.VUE_APP_BACK_PATH;
		}
	},
	methods: {
		async deletePost() {
			console.log("42");
			await fetch(process.env.VUE_APP_BACK_PATH + `posts/${this.$route.params.id}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token },
				credentials: 'include',
			})
				.then(async (response) => {
					if (response.ok) {
                       await router.push('/');
                    } else {
                       alert("Non sei autorizzato ad eliminare questo post.");
					}
				})
				.catch((error) => {
                    console.log(error);
				});
      },

		async sendUpvote() {
			const result = await fetch(process.env.VUE_APP_BACK_PATH + `votes/posts/sendVote/${this.$route.params.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.token },
				credentials:'include'
			}).then((res) => {
				switch (res.status) {
					case 200:
						this.votes += 1;
						break;
					case 409:
						alert("Hai già messo like.");
						break;
					case 404:
						alert("Post inesistente.");
						break;
					case 401:
						alert("Accedi per mettere like.");
						break;
				}
			}).catch((err) => {
				alert(err);
			});
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
    position: relative;
}

#actions {
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin-bottom: 5px;
}

#actions > * {
	width: 100%;
}

#description {
    position: absolute;
    top: 24px;
    right: 16px;
}

.show-btn {
  background-color: #007bff;
  width:100%;
}

.show-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
 
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
