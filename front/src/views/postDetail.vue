<template>
    <div id="page-wrap">
        <div id="img-wrap">
            <img v-if="content.postImage" v-bind:src="backPath+content.postImage" />
        </div>
        <div id="content-details">
            <h1>{{ content.name }}</h1>
            <p id="location">📍{{ content.location }}</p>
            <p>{{ content.text }}</p>
			
			<div id="actions">
				<button @click="sendUpvote" class="option">{{ this.votes }}&nbsp;👍</button>
				<router-link to="/">
					<button class="option">Indietro</button>
				</router-link>
				<router-link v-bind:to="/comments/+this.content._id">
					<button>Mostra commenti</button>
				</router-link>
				<button type="button" @click="elimina">elimina</button>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
import {loggedUser, setLogged} from "@/global";
import router from "@/router";


export default {
    name: 'PostDetail',
    data() {
        return {
            content: [],
			loggedUser:loggedUser,
			votes:0
        };
    },
    async created() {
        const result = await axios.get(process.env.VUE_APP_BACK_PATH + `posts/${this.$route.params.id}`);
        const content = result.data.post;
        this.content = content;
		
		await axios.get(process.env.VUE_APP_BACK_PATH + `votes/posts/${this.$route.params.id}`).then((res)=>{
			this.votes = res.data.nrLikes
		}).catch((err)=>{

			console.error(err)
			if(err.response.status !== 404){
				alert(err)
			}
		})


    },
  computed: {
    backPath() {
      return process.env.VUE_APP_BACK_PATH;
    }
  },
    methods: {
      async elimina() {
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
                alert("seems you aren't admin")
              }
            })
            .catch((error) => {
              console.log(error);
            })
      },
		isLogged(){
			console.log(sessionStorage.token !== undefined)
			sessionStorage.token !== undefined
		},

		async sendUpvote(){
			const result = await fetch(process.env.VUE_APP_BACK_PATH + `votes/posts/sendVote/${this.$route.params.id}`, {
				method:'POST',
				headers:{'Content-Type':'application/json','Authorization':'Bearer '+sessionStorage.token},
				credentials:'include'
			}).then((res)=>{
				switch(res.status){
					case 200:
						this.upvotes+=1;
						break;
					case 409:
						alert("ERROR: you already voted this post")
						break;
					case 404:
						alert("ERROR: post does not exists")
						break;
					case 401:
						alert("ERROR: you must log in if you want to vote")
						break;
				}
			}).catch((err)=>{
				alert(err)
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

#actions{
	display:flex;
	width:100%;
	flex-direction:column;
	justify-content:center;
	align-items:center;
	gap:5px;
}


#description {
    position: absolute;
    top: 24px;
    right: 16px;
}

#location {
    position: absolute;
    top: 24px;
    right: 16px;
}

options{
	width:100%;
}
</style>
