<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-black mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><b>DynamicTN</b></router-link>

      <div v-if="!logged">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/postCreation" class="nav-link active">Crea</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">Accedi</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link active">Registrati</router-link>
          </li>
        </ul>

    </div>
  </nav>

</template>

<script>
import {logged, setLogged} from "@/global";

export default {
  name: 'NavBar',
}
</script>
