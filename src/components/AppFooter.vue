<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} TicketFlow. All rights reserved.</p>
      <p style="margin-top: 0.5rem; font-size: 0.875rem; opacity: 0.8">

      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

/**
 * Footer Component - Site footer displayed on all pages
 */
const currentYear = computed(() => new Date().getFullYear());
</script>