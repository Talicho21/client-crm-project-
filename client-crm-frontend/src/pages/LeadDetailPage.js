import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewLead = id === 'new';

  // State for new lead form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'website',
    status: 'new'
  });

  // State for notes
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    {
      content: 'Called customer, interested in product',
      createdBy: 'Admin',
      createdAt: new Date().toISOString()
    }
  ]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle create new lead
  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in required fields');
      return;
    }
    alert('Lead created successfully!');
    navigate('/leads');
  };

  // Handle add note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    const note = {
      content: newNote,
      createdBy: 'Admin',
      createdAt: new Date().toISOString()
    };
    
    setNotes([note, ...notes]);
    setNewNote('');
  };

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      alert('Lead deleted');
      navigate('/leads');
    }
  };

  // NEW LEAD FORM
  if (isNewLead) {
    return (
      <div style={styles.container}>
        <button onClick={() => navigate('/leads')} style={styles.backButton}>
          ← Back to Leads
        </button>

        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Add New Lead</h2>
          
          <form onSubmit={handleCreateLead}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter full name"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter email"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter phone"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social">Social Media</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            <div style={styles.buttonGroup}>
              <button type="button" onClick={() => navigate('/leads')} style={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" style={styles.createButton}>
                Create Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // EXISTING LEAD DETAILS (John Doe view)
  return (
    <div style={styles.container}>
      {/* Header with Back and Delete */}
      <div style={styles.detailHeader}>
        <button onClick={() => navigate('/leads')} style={styles.backButton}>
          ← Back to Leads
        </button>
        <button onClick={handleDelete} style={styles.deleteButton}>
          Delete
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.detailGrid}>
        {/* Left Column - Lead Info */}
        <div style={styles.infoCard}>
          <h2 style={styles.cardTitle}>Lead Information</h2>
          
          <div style={styles.avatar}>
            JD
          </div>
          
          <h1 style={styles.leadName}>John Doe</h1>
          
          <div style={styles.infoItem}>
            <strong>Email:</strong> john@example.com
          </div>
          
          <div style={styles.infoItem}>
            <strong>Phone:</strong> +1234567890
          </div>
          
          <div style={styles.infoItem}>
            <strong>Source:</strong> website
          </div>
          
          <div style={styles.infoItem}>
            <strong>Created:</strong> 3/4/2026, 12:20:27 PM
          </div>
        </div>

        {/* Right Column - Status and Notes */}
        <div style={styles.rightColumn}>
          {/* Status Card */}
          <div style={styles.statusCard}>
            <h2 style={styles.cardTitle}>Status</h2>
            <div style={styles.statusBadge}>NEW</div>
            <button style={styles.changeStatusButton}>
              Change Status
            </button>
          </div>

          {/* Notes Card */}
          <div style={styles.notesCard}>
            <h2 style={styles.cardTitle}>Notes & Follow-ups</h2>
            
            <form onSubmit={handleAddNote} style={styles.noteForm}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                style={styles.textarea}
                placeholder="Enter note or follow-up reminder..."
                rows="3"
              />
              <button type="submit" style={styles.addNoteButton}>
                Add Note
              </button>
            </form>

            <div style={styles.notesList}>
              {notes.map((note, index) => (
                <div key={index} style={styles.noteItem}>
                  <p style={styles.noteContent}>{note.content}</p>
                  <small style={styles.noteMeta}>
                    {note.createdBy} • {new Date(note.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  detailGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  infoCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  statusCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  notesCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    margin: '0 0 20px 0',
    paddingBottom: '10px',
    borderBottom: '2px solid #f0f0f0'
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    margin: '0 auto 15px'
  },
  leadName: {
    textAlign: 'center',
    margin: '0 0 20px 0'
  },
  infoItem: {
    padding: '10px',
    borderBottom: '1px solid #f0f0f0'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '8px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  changeStatusButton: {
    padding: '8px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  noteForm: {
    marginBottom: '20px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px',
    fontFamily: 'inherit'
  },
  addNoteButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  notesList: {
    marginTop: '20px'
  },
  noteItem: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  noteContent: {
    margin: '0 0 10px 0'
  },
  noteMeta: {
    color: '#999'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  formCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '20px auto'
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px'
  },
  cancelButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  createButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default LeadDetailPage;