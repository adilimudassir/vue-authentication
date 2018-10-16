<template>
  <div class="about">
    <h1>Home</h1>
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
