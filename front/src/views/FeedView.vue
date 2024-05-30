<template>
	
    <div id="page-wrap">
		<div class="search">
				<form @submit.prevent="searchPost" >
				<input v-model="search" class="searchInput"  placeholder="cerca post"/>
				&nbsp;
				<button class="btn btn-primary submit" type="submit">cerca</button>
				&nbsp;
				<button @click="showAllPosts()" class="btn btn-primary home">tutti i post</button>
			</form>
		</div>
        <div class="grid-wrap">
            <div v-for="content in contents" class="content-item" v-bind:key="content._id">
                <img v-if="content.postImage" v-bind:src="backPath+content.postImage" />
                <h3 class="content-name">{{ content.name }}</h3>
                <p class="content-description">{{ content.text }}</p>
                <router-link v-bind:to="'/feed/' + content._id">
                    <button>Vedi post</button>
                </router-link>
            </div>
        </div>
    </div>
    <footer>
        <p>Made with ❤️ by Arcaro Mosè, Hangu David, Santaniello Mattia</p>
    </footer>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HomeView',
    data() {
        return {
            contents: [],
			search:''
        };
    },
  computed: {
    backPath() {
      return process.env.VUE_APP_BACK_PATH;
    }
  },
	
	methods:{
		async searchPost(){
			const params = {name:this.search}

			const result = await axios.get(process.env.VUE_APP_BACK_PATH + "posts",{
				params
			}).then((res)=>{
				this.contents = res.data.posts
			}).catch((err)=>{
				console.log(err)
			});
		},

		async showAllPosts(){
			const result = await axios.get(process.env.VUE_APP_BACK_PATH + 'posts').catch((err)=>{
				console.log(err);
			}).then((res)=>{
				this.contents = res.data.posts;
			}).catch((err)=>{
				alert(err);
			});
		}
	},

    async created() {
		this.showAllPosts()
    }


};
</script>

<style scoped>
.grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
}

.content-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
    background-color: white;
}


.search > form{
	display:flex;
	justify-content:space-between;
	align-items:center;
	vertical-align:bottom;
}

input.searchInput{
	width:80%; 
	text-align:center;
	border-radius:8px;
	border:1px solid;
}

button.submit{
	width:20%;
}

button.home{
	width:20%;
	background-color:black;
	border:none;
}

.content-name {
    margin-bottom: 0;
}


img {
    width: 200px;
    max-height: 100%;
    margin: auto;
}

a {
    width: 100%;
}

button {
    width: 100%;
}

footer {
    padding: 25px 500px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    color: white;
    background-color: black;
}
</style>
