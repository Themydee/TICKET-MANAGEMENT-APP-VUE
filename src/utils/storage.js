// ===== TICKET STORAGE FUNCTIONS =====

// Get all tickets from localStorage
export const getTickets = () => {
  const tickets = localStorage.getItem('ticketapp_tickets');
  return tickets ? JSON.parse(tickets) : [];
};

// Get a single ticket by ID
export const getTicketById = (id) => {
  const tickets = getTickets();
  return tickets.find(ticket => ticket.id === id);
};

// Create a new ticket
export const createTicket = (ticketData) => {
  const tickets = getTickets();
  
  // Generate a unique ID
  const newTicket = {
    id: 'ticket_' + Date.now(),
    ...ticketData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  tickets.push(newTicket);
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
  
  return newTicket;
};

// Update an existing ticket
export const updateTicket = (id, ticketData) => {
  const tickets = getTickets();
  const index = tickets.findIndex(ticket => ticket.id === id);
  
  if (index !== -1) {
    tickets[index] = {
      ...tickets[index],
      ...ticketData,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
    return tickets[index];
  }
  
  return null;
};

// Delete a ticket
export const deleteTicket = (id) => {
  const tickets = getTickets();
  const filteredTickets = tickets.filter(ticket => ticket.id !== id);
  localStorage.setItem('ticketapp_tickets', JSON.stringify(filteredTickets));
  return true;
};

// Get ticket statistics
export const getTicketStats = () => {
  const tickets = getTickets();
  
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };
  
  return stats;
};

// Initialize with sample tickets (for demo purposes)
export const initializeSampleTickets = () => {
  const existingTickets = getTickets();
  
  // Only create sample tickets if none exist
  if (existingTickets.length === 0) {
    const sampleTickets = [
      {
        id: 'ticket_1',
        title: 'Login Issue',
        description: 'Users cannot login with correct credentials',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'ticket_2',
        title: 'Dashboard Loading Slow',
        description: 'Dashboard takes more than 5 seconds to load',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'ticket_3',
        title: 'Update Profile Feature',
        description: 'Add ability to update user profile information',
        status: 'closed',
        priority: 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('ticketapp_tickets', JSON.stringify(sampleTickets));
  }
};