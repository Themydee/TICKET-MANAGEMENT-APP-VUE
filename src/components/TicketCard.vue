<template>
  <div class="ticket-card">
    <!-- Ticket title -->
    <h3>{{ ticket.title }}</h3>

    <!-- Ticket description -->
    <p>{{ ticket.description || 'No description provided' }}</p>

    <!-- Ticket footer with status and actions -->
    <div class="ticket-footer">
      <!-- Status and priority badges -->
      <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap">
        <span :class="['status-badge', getStatusClass(ticket.status)]">
          {{ formatStatus(ticket.status) }}
        </span>
        <span
          v-if="ticket.priority"
          :style="{
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: getPriorityColor(ticket.priority) + '20',
            color: getPriorityColor(ticket.priority)
          }"
        >
          {{ ticket.priority.toUpperCase() }}
        </span>
      </div>

      <!-- Action buttons -->
      <div class="ticket-actions">
        <button
          class="icon-btn"
          @click="$emit('edit', ticket)"
          aria-label="Edit ticket"
          title="Edit ticket"
        >
          <Edit :size="18" />
        </button>
        <button
          class="icon-btn delete"
          @click="$emit('delete', ticket.id)"
          aria-label="Delete ticket"
          title="Delete ticket"
        >
          <Trash2 :size="18" />
        </button>
      </div>
    </div>

    <!-- Created date -->
    <div
      v-if="ticket.createdAt"
      style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #e5e7eb; font-size: 0.75rem; color: #9ca3af"
    >
      Created: {{ formatDate(ticket.createdAt) }}
    </div>
  </div>
</template>

<script setup>
import { Edit, Trash2 } from 'lucide-vue-next';

/**
 * Ticket Card Component - Displays a single ticket
 * 
 * Props:
 * - ticket: object - Ticket data
 * 
 * Emits:
 * - edit: When edit button is clicked
 * - delete: When delete button is clicked
 */
defineProps({
  ticket: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);

// Get status badge class
const getStatusClass = (status) => {
  const classes = {
    open: 'status-open',
    in_progress: 'status-in_progress',
    closed: 'status-closed'
  };
  return classes[status] || 'status-open';
};

// Format status for display
const formatStatus = (status) => {
  const labels = {
    open: 'Open',
    in_progress: 'In Progress',
    closed: 'Closed'
  };
  return labels[status] || status;
};

// Get priority color
const getPriorityColor = (priority) => {
  const colors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };
  return colors[priority] || '#6b7280';
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
</script>