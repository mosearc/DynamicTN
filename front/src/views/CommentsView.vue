<template>
	<div id="userOptions">
		<button @click="this.navigate.push({path:`/feed/${this.postId}`})">Indietro</button>
		&nbsp;
		<button v-if="loggedUser.token !== undefined" @click="this.navigate.push({path:`/createComment/${this.postId}`})">Aggiungi un commento</button>
	</div>
	<hr/>
	<div v-if="this.comments.length > 0">
		<div v-for="comment in comments" v-bind:key="comment._id">
			<p>{{ comment.text }}</p>
			<hr/>
		</div>
	</div>
	<div v-else>
		<br/>
		<p>Non ci sono commenti in questo post!</p>
	</div>
</template>
<script>
import axios from 'axios'
import {loggedUser,logged} from '@/global'
import {useRouter,useRoute} from "vue-router"

export default{
	name:'CommentsView',
	data(){
		return {
			comments:[],
			postId: 0,
			navigate:useRouter(),
			loggedUser:loggedUser
		}
	},

	async created(){
		console.log(this.loggedUser)
		this.postId = this.$route.params.id
		const result = await axios.get(`http://localhost:3000/comments/fromPost/${this.postId}`)

		if(result.data !== undefined)
			this.comments = result.data.comments
	}
}
</script>
