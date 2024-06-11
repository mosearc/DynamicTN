<template>
  <div>
    <PopUp :isVisible="showPopup" @close="handleClose">
      <h2>Benvenuta/o!</h2>
      <p>Rispetta tutti i membri e usa un linguaggio appropriato. Il mancato rispetto di queste regole può comportare l'esclusione dalla piattaforma. Grazie!</p>
    </PopUp>

    <NavBar/>

    <router-view/>
  </div>
  <footer>
    <p>Made with ❤️ by Arcaro Mosè, Hangu David, Santaniello Mattia - <em>UniTrento 2023/2024</em></p>
  </footer>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import PopUp from "@/components/PopUp.vue";

export default {
  name: 'App',
  components: {
    PopUp,
    NavBar,
  },
  data() {
    return {
      showPopup: false
    };
  },
  mounted() {
    if (!sessionStorage.getItem('popupShown')) {
      this.showPopup = true;
    }
  },
  methods: {
    handleClose() {
      this.showPopup = false;
      sessionStorage.setItem('popupShown', 'true');
    }
  }
}

</script>

<style>
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

body {
  background-color: #edf2f4;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

#page-wrap {
  margin: auto;
  max-width: 800px;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

footer {
  padding: 20px;
  text-align: center;
  width: 100%;
  background-color: black;
  color: white;
  margin-top: auto;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

button {
  background-color: black;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #333;
}

.back-btn {
    width: 100%;
    margin: 1px;
}

.form-signin {
  max-width: 330px;
  margin: auto;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
