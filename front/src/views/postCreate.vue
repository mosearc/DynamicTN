<template>
  <form @submit.prevent="createPost" class="form-postCreation" enctype="multipart/form-data">
    <h1 class="h3 mb-3 fw-normal"><b>Crea Post</b></h1>
    <div class="form-group">
      <label for="postTitle">Titolo:</label>
      <input v-model="name" ref="name" type="text" id="postTitle" class="form-control" placeholder="Inserisci titolo" />
    </div>
    <div class="form-group">
      <label for="postText">Testo:</label>
      <input v-model="text" ref="text" type="text" id="postText" class="form-control" placeholder="Inserisci testo" />
    </div>
	<div class="form-group">
      <label for="postImage">Immagine <em>(facoltativa)</em>:</label>
      <input type="file" ref ="postImage" @change="updateImage" accept="image/*" id="postImage" name="postImage" class="form-control" placeholder="Seleziona un'immagine" />
    </div>
    <div class="form-group">
      <button type="submit" class="submit-btn">Pubblica</button>
    </div>
  </form>
</template>

<script lang="ts">
import { reactive,defineComponent } from "vue";
import { useRouter } from "vue-router";
import { clearLoggedUser, loggedUser, setLogged, setLoggedUser } from "@/global";
import  router  from '@/router'

export default defineComponent({
  name: 'PostCreate',
 

  data(){
	return {
      name: '',
      text: '',
      image:null,
	}
  },
 
 
  methods:{
	updateImage(change:any){
		this.image = change.target.files[0]
	},

	async createPost() {
		const dataCred = new FormData()
		dataCred.append('name',this.name)
		dataCred.append('text',this.text)
		dataCred.append('postImage',this.image!)


		console.log("42")

		const response = await fetch(process.env.VUE_APP_BACK_PATH + 'posts', {
			method: 'POST',
			headers: {'Authorization': 'Bearer ' + loggedUser.token},
			credentials: 'include',
			body: dataCred
		});

		if (response.ok) {
			await router.push('/')
			alert("Post creato :)")
		} else {
			if (response.status == 401) {
				await router.push('/login')
				alert("Token expires")
			} else {
				alert("Post non creato, riprova :(")
			}
		}
	}

  }
})
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
