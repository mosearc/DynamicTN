<template>
  <div id="poll-create">
    <h1>Crea Poll</h1>
    <form @submit.prevent="createPoll">
      <div class="form-group">
        <label for="question">Domanda:</label>
        <input id="question" v-model="question" class="form-control" required />
      </div>
      <div v-for="(answer, index) in answers" v-bind:key="index" class="form-group">
        <label for="answer">Opzione {{ index + 1 }}:</label>
        <div class="answer-input">
          <input id="answer" v-model="answer.answer" class="form-control" required />
          <button type="button" @click="removeAnswer(index)" class="btn remove-btn">Rimuovi</button>
        </div>
      </div>
      <div class="form-group">
        <button type="button" @click="addAnswer" class="btn add-btn">Aggiungi opzione</button>
      </div>
      <div class="form-group">
        <button type="submit" class="btn submit-btn">Crea Poll</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
      })
      .then(response => {
        this.$router.push('/');
      })
      .catch(error => {
        console.error(error);
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

.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.add-btn {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #0056b3;
}

.remove-btn {
  margin-left: 10px;
  background-color: #dc3545;
  color: #fff;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

</style>
