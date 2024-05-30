<template>
  <div id="page-wrap">
    <div id="content-details">
      <h1>{{ poll.question }}</h1>
      <ul v-if="poll.answers" class="poll-answers">
        <li v-for="answer in poll.answers" v-bind:key="answer.answer" class="poll-answer">
          <span>{{ answer.answer }}</span>
          <span>{{ answer.votes }} voti</span>
          <button @click="vote(answer)" class="vote-btn">Vota</button>
        </li>
      </ul>
      <div v-if="logged"></div>
      <router-link to="/">
        <button class="back-btn">Indietro</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { logged, setLogged } from "@/global";

export default {
    name: 'PollDetail',
    data() {
        return {
            poll: []
        };
    },
    async created() {
    try {
      const result = await axios.get(process.env.VUE_APP_BACK_PATH + `polls/${this.$route.params.id}`);
      this.poll = result.data.poll;
    } catch (error) {
      console.error('Error fetching poll:', error);
    }
  },
  methods: {
    async vote(answer) {
      console.log("42")
      try {
        const result = await axios.post(process.env.VUE_APP_BACK_PATH + `polls/${this.$route.params.id}/vote`, { answer: answer.answer });
        this.poll = result.data.poll; // Update poll data with new votes
      } catch (error) {
        console.error('Error voting:', error);
      }
    }
  }
};
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
}

.poll-answer span {
  font-size: 1em;
  color: #333;
}

button.vote-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button.vote-btn:hover {
  background-color: #0056b3;
}
</style>
