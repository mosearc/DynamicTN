<template>
  <div id="page-wrap">
    <div class="search">
      <input v-model="search" class="search-input" placeholder="Cerca post" />

      <button @click="showAllPosts(this.search)" class="search-btn">Cerca</button>
      <button @click="showAllPosts('')" class="search-btn">Annulla ricerca</button>

    </div>
    <div class="grid-wrap">
      <div v-for="content in contents" v-bind:key="content._id" class="content-item">
        <template v-if="content.postImage">
          <img v-if="content.postImage" v-bind:src="backPath+content.postImage" class="content-image" />
        </template>
        <h3 class="content-name">{{ content.name || content.question }}</h3>
        <p class="content-description">{{ content.text || '' }}</p>
        <template v-if="content.answers">
          <ul class="poll-answers">
            <li v-for="answer in content.answers" v-bind:key="answer.answer" class="poll-answer">
              <span class="answer-text">{{ answer.answer }}</span>
              <span class="answer-votes">{{ answer.votes }}&nbsp;voti</span>
            </li>
          </ul>
        </template>
        <div class="button-group">
          <router-link v-if="content.name" v-bind:to="'/feed/' + content._id">
            <button>Vedi post</button>
          </router-link>
          <router-link v-else-if="content.answers" v-bind:to="'/feed/polls/' + content._id">
            <button>Vedi poll</button>
          </router-link>
        </div>
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
      search: ''
    };
  },
  computed: {
    backPath() {
      return process.env.VUE_APP_BACK_PATH;
    }
  },

  methods: {

		async showAllPosts(patternName) {
			console.log("42")
			const params = { name: patternName };

			this.contents = []

			await axios.get(process.env.VUE_APP_BACK_PATH + "posts", {
				params
			}).then((res) => {
				this.contents = res.data.posts;
			}).catch((err)=>{
				if (err.response.status !== 404)
					alert(err)
			})

			await axios.get(process.env.VUE_APP_BACK_PATH + "polls", {
				params
			}).then((res) => {
				this.contents = this.contents.concat(res.data.polls);
			}).catch((err)=>{
				if (err.response.status !== 404 && err.response.status !== 400)
					alert(err)
			})
		},

       
  },
	async created() {
		this.showAllPosts('');
    }
};
</script>

<style scoped>
.grid-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.content-item {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  width: 32%;
  transition: transform 0.2s, box-shadow 0.2s;
}

.content-item:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.content-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 15px;
}

.content-name {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #333;
}

.content-description {
  font-size: 1em;
  margin-bottom: 20px;
  color: #666;
}

.poll-answers {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.poll-answer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  color: #666;
}

.poll-answer .answer-text {
  flex: 1;
}

.poll-answer .answer-votes {
  margin-left: 10px;
}

.button-group {
  margin-top: auto;
  display: flex;
  justify-content: center;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 32px;
  outline: none;
}

.search-btn {
  background-color: #007bff;
  margin-left: 10px;
}

.search-btn:hover {
  background-color: #0056b3;
}
</style>
