<template>
    <div id="page-wrap">
        <div class="grid-wrap">
            <div v-for="content in contents" class="content-item" v-bind:key="content._id">
                <img v-bind:src="content.imageUrl" />
                <h3 class="content-name">{{ content.title }}</h3>
                <p class="content-description">{{ content.description }}</p>
                <router-link v-bind:to="'/feed/' + content._id">
                    <button>Vedi post</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'FeedView',
    data() {
        return {
            contents: [],
        };
    },
    async created() {
		const result = await axios.get('http://localhost:3000/posts').catch((err)=>{
			console.log(err);
		});


		if(result !== undefined){
			const contents = result.data.posts;
			this.contents = contents;
		}
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
</style>
