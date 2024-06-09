<template>
  <div id="poll-create">
    <h1 class="h3 mb-3 fw-normal"><b>Crea Poll</b></h1>
    <form @submit.prevent="createPoll">
      <div class="form-group">
        <label for="question">Domanda:</label>
        <input id="question" v-model="question" class="form-control" placeholder="Inserisci domanda" required />
      </div>
      <div v-for="(answer, index) in answers" v-bind:key="index" class="form-group">
        <label for="answer">Risposta {{ index + 1 }}:</label>
        <div class="answer-input">
          <input id="answer" v-model="answer.answer" class="form-control" placeholder="Inserisci risposta" required />
          <button type="button" @click="removeAnswer(index)" class="remove-btn">Rimuovi</button>
        </div>
      </div>
      <div class="form-group">
        <button type="button" @click="addAnswer" class="add-btn">Aggiungi risposta</button>
      </div>
      <div class="form-group">
        <button type="submit" class="submit-btn">Pubblica</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {showErrMessage,loggedUser} from '@/global'


export default {
  name: 'PollCreate',
  data() {
    return {
      question: '',
      answers: [{ answer: '' }, { answer: '' }]
    };
  },
  methods: {
    addAnswer() {
      console.log("42")
      this.answers.push({ answer: '' });
    },
    removeAnswer(index) {
      console.log("42")
      this.answers.splice(index, 1);
    },
    createPoll() {
      console.log("42")
      const answersToSend = this.answers.map(answer => ({ answer: answer.answer }));

      axios.post(process.env.VUE_APP_BACK_PATH + 'polls', {
        question: this.question,
        answers: answersToSend
      },
      {
          headers:{
            Authorization: 'Bearer '+loggedUser.token
          }
      })
      .then(response => {
        this.$router.push('/');
      })
      .catch(err => {
		showErrMessage(err.response.status)
      });
    }
  }
};
</script>

<style scoped>
#poll-create {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.answer-input {
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn {
  background-color: #28a745;
  padding: 5px 10px;
}

.add-btn:hover {
  background-color: #218838;
}

.remove-btn {
  margin-left: 10px;
  background-color: #dc3545;
  padding: 5px 10px;
}

.remove-btn:hover {
  background-color: #c82333;
}

.submit-btn {
  background-color: #007bff;
  width: 100%;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
