<template>
  <div class="ticket-form">
    <!-- Form header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem">
      <h2>{{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}</h2>
      <button
        v-if="onCancel"
        @click="$emit('cancel')"
        style="background: none; border: none; cursor: pointer; padding: 0.5rem"
        aria-label="Close form"
      >
        <X :size="24" />
      </button>
    </div>

    <form @submit.prevent="handleSubmit">
      <!-- Title field -->
      <div class="form-group">
        <label for="title">Title *</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          placeholder="Enter ticket title"
        />
        <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
      </div>

      <!-- Description field -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Enter ticket description (optional)"
          rows="4"
        />
        <div v-if="errors.description" class="error-message">{{ errors.description }}</div>
      </div>

      <!-- Status field -->
      <div class="form-group">
        <label for="status">Status *</label>
        <select id="status" v-model="formData.status">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <div v-if="errors.status" class="error-message">{{ errors.status }}</div>
      </div>

      <!-- Priority field -->
      <div class="form-group">
        <label for="priority">Priority</label>
        <select id="priority" v-model="formData.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div v-if="errors.priority" class="error-message">{{ errors.priority }}</div>
      </div>

      <!-- Form actions -->
      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem">
        <button
          v-if="onCancel"
          type="button"
          class="btn btn-secondary"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Ticket' : 'Create Ticket' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { X } from 'lucide-vue-next';
import { validateTicketForm } from '../utils/validation';

/**
 * Ticket Form Component - Create or edit tickets
 * 
 * Props:
 * - ticket: object | null - Ticket to edit (null for create)
 * - onCancel: boolean - Whether to show cancel button
 * 
 * Emits:
 * - submit: When form is submitted
 * - cancel: When cancel button is clicked
 */
const props = defineProps({
  ticket: {
    type: Object,
    default: null
  },
  onCancel: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const isEditing = computed(() => props.ticket !== null);

// Form state
const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium'
});

const errors = ref({});

// Watch for ticket prop changes (when editing)
watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    formData.value = {
      title: newTicket.title || '',
      description: newTicket.description || '',
      status: newTicket.status || 'open',
      priority: newTicket.priority || 'medium'
    };
  }
}, { immediate: true });

// Handle form submission
const handleSubmit = () => {
  // Validate form
  const validationErrors = validateTicketForm(formData.value);
  
  if (Object.keys(validationErrors).length > 0) {
    errors.value = validationErrors;
    return;
  }

  // Clear errors
  errors.value = {};

  // Emit submit event
  emit('submit', { ...formData.value });

  // Reset form if creating new ticket
  if (!isEditing.value) {
    formData.value = {
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    };
  }
};
</script>