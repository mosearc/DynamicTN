<template>
  <div id="page-wrap">
    <div id="content-details">
      <h1>{{ poll.question }}</h1>
      <ul v-if="poll.answers" class="poll-answers">
        <li v-for="answer in poll.answers" v-bind:key="answer.answer" class="poll-answer">
          <span class="answer-text">{{ answer.answer }}</span>
          <span class="answer-votes">{{ answer.votes }}&nbsp;voti</span>
          <button @click="vote(answer)" class="vote-btn">Vota</button>
        </li>
      </ul>
      <div v-if="logged"></div>
      <router-link to="/">
        <button class="back-btn">Indietro</button>
      </router-link>
      <button @click="deletePoll" class="delete-btn">Elimina poll</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { loggedUser,isLogged, setLogged,showErrMessage } from "@/global";

export default {
  name: 'PollDetail',
  data() {
      return {
          poll: []
      };
  },
  computed:{
	isLogged(){
		return isLogged()
	}
  },
  async created() {
      const result = await axios.get(process.env.VUE_APP_BACK_PATH + `polls/${this.$route.params.id}`);
      this.poll = result.data.poll;
  },
  methods: {
    async vote(answer) {
		console.log("42")
		try {
          const result = await axios({
              method:'post',
              url:process.env.VUE_APP_BACK_PATH + `votes/polls/sendVote/${this.$route.params.id}`,
              headers: {
                  'Content-Type':'application/json',
                  'Authorization':'Bearer '+loggedUser.token
              },
              data:{ answer: answer.answer }
		});

			this.poll = result.data.poll;
		} catch (error) {

			showErrMessage(error.response.status)
		}
    },
    async deletePoll() {
		await axios.delete(process.env.VUE_APP_BACK_PATH + `polls/${this.$route.params.id}`,{
			headers:{
				Authorization: 'Bearer '+loggedUser.token
			}
		}).catch((err)=>{
			showErrMessage(err.response.status)
		});
        this.$router.push('/');
	},


  }
}
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

#content-details {
  padding: 16px;
}

.poll-answers {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.poll-answer {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.poll-answer .answer-text {
  flex: 1;
}

.poll-answer .answer-votes {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1em;
  color: #333;
}

.vote-btn {
  background-color: #007bff;
  padding: 5px 10px;
}

.vote-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  margin-top: 20px;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
