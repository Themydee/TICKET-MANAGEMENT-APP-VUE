<template>
  <div class="auth-container">
    <!-- Toast notification -->
    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />

    <!-- Auth form box -->
    <div class="auth-box">
      <h2>{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>

      <form @submit.prevent="handleSubmit">
        <!-- Email field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
          />
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>

        <!-- Username field (signup only) -->
        <div v-if="!isLogin" class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Choose a username"
          />
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
          />
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>

        <!-- Confirm Password field (signup only) -->
        <div v-if="!isLogin" class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            placeholder="Confirm your password"
          />
          <div v-if="errors.confirmPassword" class="error-message">
            {{ errors.confirmPassword }}
          </div>
        </div>

        <!-- Submit button -->
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </button>
      </form>

      <!-- Toggle between login and signup -->
      <div class="auth-toggle">
        <p>
          {{ isLogin ? "Don't have an account? " : "Already have an account? " }}
          <button @click="toggleMode">
            {{ isLogin ? 'Sign Up' : 'Login' }}
          </button>
        </p>
      </div>

      <!-- Demo credentials info -->
      <div
        v-if="isLogin"
        style="margin-top: 1.5rem; padding: 1rem; background: #f3f4f6; border-radius: 0.5rem; font-size: 0.875rem; color: #6b7280"
      >
        <strong>Demo:</strong> Create an account or use test credentials
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Toast from '../components/Toast.vue';
import { useAuth } from '../stores/auth';
import { validateLoginForm, validateSignupForm } from '../utils/validation';

/**
 * Auth Page - Handles both Login and Signup
 * 
 * Props:
 * - mode: 'login' | 'signup' - Initial mode
 * 
 * Emits:
 * - navigate: Navigation event
 */
const props = defineProps({
  mode: {
    type: String,
    default: 'login',
    validator: (value) => ['login', 'signup'].includes(value)
  }
});

const emit = defineEmits(['navigate']);

const { login, signup } = useAuth();

const isLogin = ref(props.mode === 'login');

// Form state
const formData = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
});

const errors = ref({});
const toast = ref(null);

// Watch mode prop changes
watch(() => props.mode, (newMode) => {
  isLogin.value = newMode === 'login';
});

// Toggle between login and signup
const toggleMode = () => {
  isLogin.value = !isLogin.value;
  formData.value = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
  errors.value = {};
};

// Handle form submission
const handleSubmit = () => {
  // Validate form
  const validationErrors = isLogin.value
    ? validateLoginForm(formData.value)
    : validateSignupForm(formData.value);

  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors;
    return;
  }

  // Clear errors
  errors.value = {};

  // Process login or signup
  if (isLogin.value) {
    const result = login(formData.value.email, formData.value.password);

    if (result.success) {
      toast.value = { message: 'Login successful!', type: 'success' };
      setTimeout(() => emit('navigate', 'dashboard'), 1000);
    } else {
      toast.value = { message: result.error, type: 'error' };
    }
  } else {
    const result = signup(
      formData.value.email,
      formData.value.username,
      formData.value.password
    );

    if (result.success) {
      toast.value = { message: 'Account created successfully!', type: 'success' };
      setTimeout(() => emit('navigate', 'dashboard'), 1000);
    } else {
      toast.value = { message: result.error, type: 'error' };
    }
  }
};
</script>