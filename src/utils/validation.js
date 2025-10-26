export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  return null;
};

export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  
  return null;
};

// Validate ticket title
export const validateTicketTitle = (title) => {
  if (!title || title.trim() === '') {
    return 'Title is required';
  }
  
  if (title.length < 3) {
    return 'Title must be at least 3 characters long';
  }
  
  if (title.length > 100) {
    return 'Title must not exceed 100 characters';
  }
  
  return null;
};

export const validateTicketDescription = (description) => {
  if (description && description.length > 500) {
    return 'Description must not exceed 500 characters';
  }
  
  return null;
};


export const validateStatus = (status) => {
  const validStatuses = ['open', 'in_progress', 'closed'];
  
  if (!status) {
    return 'Status is required';
  }
  
  if (!validStatuses.includes(status)) {
    return 'Status must be one of: open, in_progress, or closed';
  }
  
  return null;
};


export const validatePriority = (priority) => {
  if (!priority) {
    return null; 
  }
  
  const validPriorities = ['low', 'medium', 'high'];
  
  if (!validPriorities.includes(priority)) {
    return 'Priority must be one of: low, medium, or high';
  }
  
  return null;
};


export const validateTicketForm = (formData) => {
  const errors = {};
  
  const titleError = validateTicketTitle(formData.title);
  if (titleError) errors.title = titleError;
  
  const descriptionError = validateTicketDescription(formData.description);
  if (descriptionError) errors.description = descriptionError;
  
  const statusError = validateStatus(formData.status);
  if (statusError) errors.status = statusError;
  
  const priorityError = validatePriority(formData.priority);
  if (priorityError) errors.priority = priorityError;
  
  return errors;
};


export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};


export const validateSignupForm = (formData) => {
  const errors = {};
  
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;
  
  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};