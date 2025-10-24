<template>
  <div style="min-height: 100vh; display: flex; flex-direction: column">
    <!-- Header -->
    <AppHeader :showLogout="true" @navigate="$emit('navigate', $event)" />

    <!-- Main content -->
    <div class="dashboard">
      <div class="container">
        <!-- Dashboard header -->
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <button class="btn btn-primary" @click="$emit('navigate', 'tickets')">
            Manage Tickets
            <ArrowRight :size="18" />
          </button>
        </div>

        <!-- Statistics cards -->
        <div class="stats-grid">
          <!-- Total Tickets -->
          <div class="stat-card">
            <h3>{{ stats.total }}</h3>
            <p>Total Tickets</p>
          </div>

          <!-- Open Tickets -->
          <div class="stat-card">
            <h3 style="color: #10b981">{{ stats.open }}</h3>
            <p>Open Tickets</p>
          </div>

          <!-- In Progress Tickets -->
          <div class="stat-card">
            <h3 style="color: #f59e0b">{{ stats.inProgress }}</h3>
            <p>In Progress</p>
          </div>

          <!-- Closed Tickets -->
          <div class="stat-card">
            <h3 style="color: #6b7280">{{ stats.closed }}</h3>
            <p>Closed Tickets</p>
          </div>
        </div>

        <!-- Quick actions section -->
        <div
          style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 2rem"
        >
          <h2 style="margin-bottom: 1rem">Quick Actions</h2>
          <p style="color: #6b7280; margin-bottom: 1.5rem">
            Get started by managing your tickets or viewing detailed statistics.
          </p>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap">
            <button class="btn btn-primary" @click="$emit('navigate', 'tickets')">
              View All Tickets
            </button>
            <button class="btn btn-secondary" @click="$emit('navigate', 'tickets')">
              Create New Ticket
            </button>
          </div>
        </div>

        <!-- Welcome message -->
        <div
          v-if="stats.total === 0"
          style="background: #eff6ff; padding: 2rem; border-radius: 1rem; margin-top: 2rem; text-align: center; border: 2px dashed #93c5fd"
        >
          <h3 style="color: #1e40af; margin-bottom: 0.5rem">
            Welcome to TicketFlow! 🎉
          </h3>
          <p style="color: #3b82f6">
            You don't have any tickets yet. Create your first ticket to get started.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import { getTicketStats } from '../utils/storage';

/**
 * Dashboard Page - Shows ticket statistics and overview
 * 
 * Emits:
 * - navigate: Navigation event
 */
defineEmits(['navigate']);

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
});

// Load statistics on mount
onMounted(() => {
  stats.value = getTicketStats();
});
</script>