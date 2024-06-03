<template>
  <div id="userOptions">
    <button @click="this.navigate.push({ path: `/feed/${this.postId}` })">Indietro</button>
    &nbsp;
    <button v-if="loggedUser.token !== undefined" @click="this.navigate.push({ path: `/commentCreate/${this.postId}` })">Aggiungi un commento</button>
  </div>
  <hr />
  <div v-if="this.comments.length > 0">
    <div v-for="comment in comments" v-bind:key="comment._id">
      <p>{{ comment.text }}</p>
      <button type="button" @click="elimina(comment._id)">elimina</button>
      <hr />
    </div>
  </div>
  <div v-else>
    <br />
    <p>Non ci sono commenti in questo post!</p>
  </div>
</template>

<script>
import axios from 'axios'
import { loggedUser, logged } from '@/global'
import { useRouter, useRoute } from "vue-router"

export default {
  name: 'CommentsView',
  data() {
    return {
      comments: [],
      postId: 0,
      navigate: useRouter(),
      loggedUser: loggedUser
    }
  },

  async created() {
    this.postId = this.$route.params.id
    const result = await axios.get(process.env.VUE_APP_BACK_PATH + `comments/fromPost/${this.postId}`)
    console.log("42")
    if (result.data !== undefined)
      this.comments = result.data.comments
  },

  methods: {
    async elimina(commentId) {
      try {
        await axios.delete(`${process.env.VUE_APP_BACK_PATH}comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${this.loggedUser.token}`
          }
        });
        // Remove the deleted comment from the comments array
        this.comments = this.comments.filter(comment => comment._id !== commentId);
      } catch (error) {
        console.error('Failed to delete comment:', error);
      }
    }
  }
}
</script>



<!--
<template>
	<div id="userOptions">
		<button @click="this.navigate.push({path:`/feed/${this.postId}`})">Indietro</button>
		&nbsp;
		<button v-if="loggedUser.token !== undefined" @click="this.navigate.push({path:`/commentCreate/${this.postId}`})">Aggiungi un commento</button>
	</div>
	<hr/>
	<div v-if="this.comments.length > 0">
		<div v-for="comment in comments" v-bind:key="comment._id">
			<p>{{ comment.text }}</p>
      <button type="button" @click="elimina">elimina</button>
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
		this.postId = this.$route.params.id
		const result = await axios.get(process.env.VUE_APP_BACK_PATH + `comments/fromPost/${this.postId}`)
    console.log("42")
		if(result.data !== undefined)
			this.comments = result.data.comments
	}
}
</script>
-->
