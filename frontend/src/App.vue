<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <span>&copy; 2025 My Company</span>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
</script>
