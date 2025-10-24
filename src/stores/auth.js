import { ref, computed } from 'vue';

// Shared state (like a global store)
const user = ref(null);
const loading = ref(true);

/**
 * Auth Store Composable
 * Manages authentication state and operations
 */
export function useAuth() {
  // Initialize - check if user is already logged in
  const initialize = () => {
    const token = localStorage.getItem('ticketapp_session');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('ticketapp_user') || '{}');
      user.value = userData;
    }
    loading.value = false;
  };

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const token = 'token_' + Date.now();
      localStorage.setItem('ticketapp_session', token);
      
      const userData = { email: foundUser.email, username: foundUser.username };
      localStorage.setItem('ticketapp_user', JSON.stringify(userData));
      
      user.value = userData;
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  // Signup function
  const signup = (email, username, password) => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = { email, username, password };
    users.push(newUser);
    localStorage.setItem('ticketapp_users', JSON.stringify(users));

    const token = 'token_' + Date.now();
    localStorage.setItem('ticketapp_session', token);
    
    const userData = { email, username };
    localStorage.setItem('ticketapp_user', JSON.stringify(userData));
    
    user.value = userData;
    return { success: true };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_user');
    user.value = null;
  };

  // Check if authenticated
  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    loading,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout
  };
}