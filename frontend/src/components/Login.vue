<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[emailRules]"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[passwordRules]"
                required
              ></v-text-field>

              <v-btn @click="login" :disabled="!valid">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [(v) => !!v || 'Email is required'],
      passwordRules: [(v) => !!v || 'Password is required'],
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://localhost:3000/api/v1/sessions', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('auth_token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Login failed');
        console.error('Błąd logowania:', error);
      }
    },
  },
};
</script>
