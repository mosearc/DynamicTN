<script lang="ts">
	import { useAuthStore } from '../stores/auth';
	import { computed } from 'vue';

	export default {
		setup(){
			const user = computed(()=>{
			  return authStore.user;
			});

			const isAuthenticated = computed(()=>{
			  return authStore.isAuthenticated;
			});
		},

		data(){
			return {
				fields:{
					title:'',
					content:'',
					image:null
				}
			}
		},

		methods:{

			updateImage(event){
				console.log(event.target.files)
			},

			send(){
				let data = this.fields;

				console.log(data)
				if(data.image !== null){
					let imageContent = new FileReader().readAsDataURL(data.image)
					console.log(imageContent)
				}

			}
		}
	}
</script>


<template>
	<div id="createPost">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Create post</h5>
        <form @submit.prevent="send">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input v-model="fields.title" type="text" class="form-control" id="title" autocomplete="off">
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea v-model="fields.content" type="text" class="form-control" id="content" autocomplete="off">
			</textarea>
          </div>
          <div class="mb-3">
            <label for="image" class="form-label">Image</label>
			<input @change="updateImage" type="file" accept=".jpeg, .jpg, .png" class="form-control" name="image" id="image" autocomplete="off">
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>

</template>


