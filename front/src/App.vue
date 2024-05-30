<template>
  <div>
    <PopUp :isVisible="showPopup" @close="handleClose">
      <h2>Informativa Sulla Privacy e Consenso Informato</h2>
      <p>cose legali e blablabla, navigando in questo sito accetti che i tuoi dati vengano registrati ecc ecc</p>
    </PopUp>

    <NavBar/>

    <router-view/>
  </div>
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
    // Check session storage to see if the popup has been shown
    if (!sessionStorage.getItem('popupShown')) {
      this.showPopup = true;
    }
  },
  methods: {
    handleClose() {
      this.showPopup = false;
      sessionStorage.setItem('popupShown', 'true'); // Set session storage to indicate the popup has been shown
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
}

#page-wrap {
  margin: auto;
  max-width: 800px;
  flex: 1; /* Allow the page content to expand */
  padding: 20px;
}

footer {
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

button {
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 12px 20px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #333;
}

button.back-btn {
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
