<template>
	<h1 class="h3 mb-3 fw-normal"><b>Aggiungi un commento alla discussione</b></h1>

	<form @submit.prevent="submit">
		<textarea row="10" v-model="text" class="input form-control" placeholder="testo del commento"></textarea>
		<div>
			<br/>
			<button class="btn btn-primary" type="submit">Pubblica</button>
			&nbsp;
			<button class="cancel btn btn-primary" @click="this.navigate.push({path:`/feed/${this.$route.params.id}`})">Annulla</button>
		</div>
	</form>
</template>
<script>
import {useRouter} from "vue-router"
import axios from "axios"
import {loggedUser} from "@/global"

export default{
	data(){
		return{
			text:"",
			navigate:useRouter()
		}
	},
	methods:{
		async submit(){
      console.log("42")

			const body = {text:this.text,postId:this.$route.params.id}

			const result = await axios.post(process.env.VUE_APP_BACK_PATH + "comments",body,{
				headers:{
					authorization: " "+loggedUser.token
				}
			}).then((res)=>{
				this.navigate.push({path:`/feed/${this.$route.params.id}`})	
			}).catch((err)=>{
				console.error(err)
			});
			
		}
	}
}
</script>

<style>

button.cancel{
	background-color:red;
	border:red;
	color:white;
}

button.cancel:hover{
	background-color:#DA0000;
}

textarea.input{
	margin-left:10%; 
	width:80%
}
</style>
