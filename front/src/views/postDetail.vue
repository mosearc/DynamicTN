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
				<div :id="this.isLogged ? 'visible' : 'only'">
					<button @click="sendUpvote">{{ this.votes }}&nbsp;👍</button>
				</div>
				<div v-if="this.isLogged" class="optional">
					<router-link v-bind:to="/commentCreate/ + this.content._id"  >
					
						<button class="show-btn">Commenta</button>
					</router-link>
					<button @click="deletePost" class="delete-btn">Elimina post</button>
				</div>
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
				<button type="button" @click="elimina(comment._id)">Elimina</button>
				<hr />
			</div>
		</div>
		<div v-else>
			<br />
			<p style="text-align: center">Non ci sono commenti in questo post.</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { loggedUser, showErrMessage, setLogged } from "@/global";
import router from "@/router";


export default {
    name: 'PostDetail',
    data() {
        return {
            content: [],
			comments: [],
			isLogged: loggedUser.token !== undefined,
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
				headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + loggedUser.token },
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
				method:'POST',
				headers:{'Content-Type':'application/json','Authorization':'Bearer '+loggedUser.token},
				credentials:'include'
			}).then((res)=>{
				if(res.ok)
					this.votes+=1
				else{
					console.log(res)
					showErrMessage(res.status)
				}
			}).catch((err) => {
				alert(err);
			});
		},

		async elimina(commentId) {
            try {
                await axios.delete(`${process.env.VUE_APP_BACK_PATH}comments/${commentId}`, {
                    headers: {
                        Authorization: 'Bearer ' + loggedUser.token
                    }
                });
                this.comments = this.comments.filter(comment => comment._id !== commentId);
            } catch (error) {
                console.error('Failed to delete comment:', error);
            }
        }
	}
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  margin-bottom: 16px;
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

#actions:has(div#only) * {
	width: 100%;
}

#visible {
	width: 100%;
	display: flex;
	flex-direction: row;
}

#visible > * {
	width: 100%;
}

.optional {
	width: 100%;
	display: flex;
	gap: 5px;
	flex-direction: row;
}

.optional > * {
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
