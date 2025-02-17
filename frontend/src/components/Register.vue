<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card>
          <v-card-title>Register</v-card-title>
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

              <v-text-field
                v-model="passwordConfirmation"
                label="Confirm Password"
                type="password"
                :rules="[passwordConfirmRules]"
                required
              ></v-text-field>

              <v-btn @click="register" :disabled="!valid">Register</v-btn>
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
      passwordConfirmation: '',
      valid: false,
      emailRules: [(v) => !!v || 'Email is required'],
      passwordRules: [(v) => !!v || 'Password is required'],
      passwordConfirmRules: [(v) => v === this.password || 'Passwords must match'],
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('http://localhost:3000/api/v1/registrations', {
          user: {
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          },
        });

        this.$router.push('/login');
      } catch (error) {
        alert('Registration failed');
      }
    },
  },
};
</script>
