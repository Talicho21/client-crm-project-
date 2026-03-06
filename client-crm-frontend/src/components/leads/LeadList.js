import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LeadsList() {
  const navigate = useNavigate();

  // Sample leads data
  const [leads] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'new',
      date: '3/4/2026'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      status: 'contacted',
      date: '3/4/2026'
    }
  ]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Leads Management</h1>
        <button 
          onClick={() => navigate('/lead/new')}
          style={styles.addButton}
        >
          + Add New Lead
        </button>
      </div>

      {/* Search and Filter */}
      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by name or email..."
          style={styles.searchInput}
        />
        <div style={styles.filterSection}>
          <select style={styles.filterSelect}>
            <option>All Status</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </select>
          <button style={styles.clearButton}>Clear</button>
        </div>
      </div>

      {/* Leads List */}
      <div style={styles.leadsList}>
        {leads.map(lead => (
          <div
            key={lead.id}
            onClick={() => navigate(`/lead/${lead.id}`)}
            style={styles.leadCard}
          >
            <h3 style={styles.leadName}>{lead.name}</h3>
            <div style={styles.leadEmail}>{lead.email}</div>
            <div style={styles.leadPhone}>{lead.phone}</div>
            <div style={styles.leadDate}>{lead.date}</div>
            <span style={{
              ...styles.statusBadge,
              backgroundColor: lead.status === 'new' ? '#007bff' : '#ffc107'
            }}>
              {lead.status === 'new' ? 'NEW' : 'CONTACTED'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    margin: 0,
    color: '#333'
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  searchSection: {
    marginBottom: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginBottom: '10px',
    fontSize: '14px'
  },
  filterSection: {
    display: 'flex',
    gap: '10px'
  },
  filterSelect: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    flex: 1
  },
  clearButton: {
    padding: '8px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  leadsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  leadCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  },
  leadName: {
    margin: '0 0 10px 0',
    color: '#333'
  },
  leadEmail: {
    color: '#666',
    marginBottom: '5px'
  },
  leadPhone: {
    color: '#666',
    marginBottom: '5px'
  },
  leadDate: {
    color: '#999',
    fontSize: '12px',
    marginBottom: '10px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white'
  }
};

export default LeadsList;