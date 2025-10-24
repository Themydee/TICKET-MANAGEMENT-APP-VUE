<template>
  <div :class="['toast', type]">
    <!-- Icon based on type -->
    <Check v-if="type === 'success'" :size="20" color="#10b981" />
    <AlertCircle v-else :size="20" color="#ef4444" />
    
    <!-- Message -->
    <span>{{ message }}</span>
    
    <!-- Close button -->
    <button
      @click="$emit('close')"
      style="background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center"
      aria-label="Close notification"
    >
      <X :size="18" />
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Check, AlertCircle, X } from 'lucide-vue-next';

/**
 * Toast Component - Shows success or error notifications
 * 
 * Props:
 * - message: string - The message to display
 * - type: 'success' | 'error' - Type of notification
 * 
 * Emits:
 * - close: When toast should be closed
 */
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  }
});

const emit = defineEmits(['close']);

// Auto-close after 3 seconds
onMounted(() => {
  setTimeout(() => {
    emit('close');
  }, 3000);
});
</script>