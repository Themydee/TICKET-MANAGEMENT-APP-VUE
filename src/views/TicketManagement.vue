<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column">
    <!-- Toast notification -->
    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />

    <!-- Delete confirmation modal -->
    <ConfirmModal
      v-if="deleteConfirm"
      title="Delete Ticket"
      message="Are you sure you want to delete this ticket? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      type="danger"
      @confirm="confirmDelete"
      @cancel="deleteConfirm = null"
    />

    <!-- Header -->
    <AppHeader :showLogout="true" @navigate="$emit('navigate', $event)" />

    <!-- Main content -->
    <div class="tickets-page">
      <div class="container">
        <!-- Page header -->
        <div class="tickets-header">
          <div>
            <h1>Ticket Management</h1>
            <p style="color: #6b7280; margin-top: 0.25rem">
              Create, view, edit, and delete your tickets
            </p>
          </div>
          <button class="btn btn-primary" @click="handleNewTicket">
            <Plus :size="18" />
            New Ticket
          </button>
        </div>

        <!-- Ticket form (when creating or editing) -->
        <TicketForm
          v-if="showForm"
          :ticket="editingTicket"
          :onCancel="true"
          @submit="handleSubmit"
          @cancel="handleCancelForm"
        />

        <!-- Tickets list -->
        <div v-if="tickets.length > 0" class="ticket-grid">
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <h3>No tickets yet</h3>
          <p>Create your first ticket to get started</p>
          <button
            class="btn btn-primary"
            @click="handleNewTicket"
            style="margin-top: 1rem"
          >
            <Plus :size="18" />
            Create First Ticket
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from 'lucide-vue-next';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import TicketCard from '../components/TicketCard.vue';
import TicketForm from '../components/TicketForm.vue';
import ConfirmModal from '../components/ConfirmModal.vue';
import Toast from '../components/Toast.vue';
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  initializeSampleTickets
} from '../utils/storage';

/**
 * Ticket Management Page - Full CRUD for tickets
 * 
 * Emits:
 * - navigate: Navigation event
 */
defineEmits(['navigate']);

const tickets = ref([]);
const showForm = ref(false);
const editingTicket = ref(null);
const deleteConfirm = ref(null);
const toast = ref(null);

// Load tickets on mount
onMounted(() => {
  initializeSampleTickets();
  loadTickets();
});

// Load tickets from storage
const loadTickets = () => {
  tickets.value = getTickets();
};

// Handle create/update ticket
const handleSubmit = (formData) => {
  try {
    if (editingTicket.value) {
      // Update existing ticket
      updateTicket(editingTicket.value.id, formData);
      toast.value = { message: 'Ticket updated successfully!', type: 'success' };
      editingTicket.value = null;
    } else {
      // Create new ticket
      createTicket(formData);
      toast.value = { message: 'Ticket created successfully!', type: 'success' };
    }

    loadTickets();
    showForm.value = false;
  } catch (error) {
    toast.value = { message: 'Failed to save ticket. Please try again.', type: 'error' };
  }
};

// Handle edit ticket
const handleEdit = (ticket) => {
  editingTicket.value = ticket;
  showForm.value = true;
};

// Handle delete ticket
const handleDelete = (ticketId) => {
  deleteConfirm.value = ticketId;
};

// Confirm delete
const confirmDelete = () => {
  try {
    deleteTicket(deleteConfirm.value);
    toast.value = { message: 'Ticket deleted successfully!', type: 'success' };
    loadTickets();
  } catch (error) {
    toast.value = { message: 'Failed to delete ticket. Please try again.', type: 'error' };
  }
  deleteConfirm.value = null;
};

// Handle new ticket button
const handleNewTicket = () => {
  editingTicket.value = null;
  showForm.value = true;
};

// Handle cancel form
const handleCancelForm = () => {
  showForm.value = false;
  editingTicket.value = null;
};
</script>