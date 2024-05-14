<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">DynamicTN</router-link>

      <div v-if="!logged">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link active">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import {logged, setLogged} from "@/global";

export default {
  name: 'NavBar',
}
</script>
