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
      <div v-for="content in contents" v-bind:key="content._id" class="content-item">
        <template v-if="content.postImage">
          <img v-if="content.postImage" v-bind:src="backPath+content.postImage" class="content-image" />
        </template>
        <h3 class="content-name">{{ content.name || content.question }}</h3>
        <p class="content-description">{{ content.text || '' }}</p>
        <template v-if="content.answers">
          <ul class="poll-answers">
            <li v-for="answer in content.answers" v-bind:key="answer.answer">
              {{ answer.answer }} - {{ answer.votes }} voti
            </li>
          </ul>
        </template>
        <template v-if="content.name">
          <router-link :to="'/feed/' + content._id" class="detail-link">
            <button class="detail-button">Vedi post</button>
          </router-link>
        </template>
        <template v-else-if="content.answers">
          <router-link :to="'/feed/polls/' + content._id" class="detail-link">
            <button class="detail-button">Vedi poll</button>
          </router-link>
        </template>
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
		async searchPost() {
      console.log("42")
			const params = { name: this.search };

			const result = await axios.get(process.env.VUE_APP_BACK_PATH + "posts", {
				params
			}).then((res) => {
				this.contents = res.data.posts;
			}).catch((err) => {
				alert(err)
			});
		},

		async showAllPosts() {
      console.log("42")
			const result = await axios.get(process.env.VUE_APP_BACK_PATH + 'posts').then((res) => {
				if(res.data.posts !== undefined)
					this.contents = res.data.posts;
			}).catch((err) => {
				alert(err);
			});
		}
	},

  async created() {
    this.showAllPosts();
    try {
      const postsResult = await axios.get(process.env.VUE_APP_BACK_PATH + 'posts');
      const pollsResult = await axios.get(process.env.VUE_APP_BACK_PATH + 'polls');
      const contents = [...postsResult.data.posts, ...pollsResult.data.polls];
      this.contents = contents;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
#page-wrap {
  padding: 20px;
  min-height: 100vh;
  overflow-y: auto;
}

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

.poll-answers li {
  font-size: 0.9em;
  color: #666;
}

.detail-link {
  display: flex;
  justify-content: center;
  margin-top: auto;
  width: 100%;
}

.detail-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.detail-button:hover {
  background-color: #0056b3;
}

footer {
  padding: 20px;
  text-align: center;
  width: 100%;
  background-color: black;
  color: white;
  position: sticky;
  bottom: 0;
}
</style>
