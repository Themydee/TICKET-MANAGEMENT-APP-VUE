<template>
  <div class="modal-overlay" @click="$emit('cancel')">
    <div class="modal" @click.stop>
      <!-- Icon and title -->
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem">
        <AlertCircle
          :size="24"
          :color="type === 'danger' ? '#ef4444' : '#f59e0b'"
        />
        <h3 style="margin: 0">{{ title }}</h3>
      </div>

      <!-- Message -->
      <p style="color: #6b7280; margin-bottom: 1.5rem">
        {{ message }}
      </p>

      <!-- Action buttons -->
      <div class="modal-actions">
        <button class="btn btn-secondary" @click="$emit('cancel')">
          {{ cancelText }}
        </button>
        <button
          :class="['btn', type === 'danger' ? 'btn-danger' : 'btn-primary']"
          @click="$emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle } from 'lucide-vue-next';

/**
 * Confirmation Modal Component - Shows confirmation dialog
 * 
 * Props:
 * - title: string - Modal title
 * - message: string - Confirmation message
 * - confirmText: string - Text for confirm button
 * - cancelText: string - Text for cancel button
 * - type: 'danger' | 'warning' | 'info' - Modal type
 * 
 * Emits:
 * - confirm: When user confirms
 * - cancel: When user cancels
 */
defineProps({
  title: {
    type: String,
    default: 'Are you sure?'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'warning', 'info'].includes(value)
  }
});

defineEmits(['confirm', 'cancel']);
</script>