import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import LoadingSpinner from '../common/LoadingSpinner';
import AlertMessage from '../common/AlertMessage';
import { FaArrowLeft, FaEdit, FaTrash, FaEnvelope, FaPhone, FaCalendar, FaUser } from 'react-icons/fa';

// Mock data for now
const mockLead = {
  _id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  source: 'website',
  status: 'new',
  notes: [
    {
      _id: 'n1',
      content: 'Initial contact made via website form',
      createdBy: 'Admin',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'n2',
      content: 'Sent follow-up email',
      createdBy: 'Admin',
      createdAt: new Date().toISOString()
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLead(mockLead);
      setEditedStatus(mockLead.status);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    // In real app, this would be an API call
    const note = {
      _id: Date.now().toString(),
      content: newNote,
      createdBy: 'Admin',
      createdAt: new Date().toISOString()
    };
    
    setLead(prev => ({
      ...prev,
      notes: [...prev.notes, note]
    }));
    setNewNote('');
  };

  const handleStatusUpdate = () => {
    setLead(prev => ({
      ...prev,
      status: editedStatus
    }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      // In real app, this would be an API call
      navigate('/leads');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <AlertMessage type="danger" message={error} />;
  if (!lead) return <AlertMessage type="warning" message="Lead not found" />;

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/leads')}
        >
          <FaArrowLeft className="me-2" /> Back to Leads
        </button>
        
        <div>
          <button 
            className="btn btn-danger me-2"
            onClick={handleDelete}
          >
            <FaTrash className="me-2" /> Delete
          </button>
        </div>
      </div>

      {/* Lead Details */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Lead Information</h5>
            </div>
            <div className="card-body">
              <h4>{lead.name}</h4>
              
              <div className="mt-3">
                <p>
                  <FaEnvelope className="me-2 text-muted" />
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </p>
                {lead.phone && (
                  <p>
                    <FaPhone className="me-2 text-muted" />
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </p>
                )}
                <p>
                  <FaUser className="me-2 text-muted" />
                  Source: <span className="badge bg-info">{lead.source}</span>
                </p>
                <p>
                  <FaCalendar className="me-2 text-muted" />
                  Created: {new Date(lead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          {/* Status Card */}
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Status</h5>
            </div>
            <div className="card-body">
              {isEditing ? (
                <div className="d-flex gap-2">
                  <select 
                    className="form-select w-auto"
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                  <button 
                    className="btn btn-success"
                    onClick={handleStatusUpdate}
                  >
                    Save
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <StatusBadge status={lead.status} />
                  <button 
                    className="btn btn-sm btn-outline-primary ms-3"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit className="me-2" /> Change Status
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Notes Card */}
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Notes & Follow-ups</h5>
            </div>
            <div className="card-body">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="mb-4">
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">Add Note</label>
                  <textarea
                    className="form-control"
                    id="note"
                    rows="3"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter note or follow-up reminder..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!newNote.trim()}
                >
                  Add Note
                </button>
              </form>

              {/* Notes List */}
              <div className="notes-list">
                <h6>Previous Notes</h6>
                {lead.notes && lead.notes.length > 0 ? (
                  lead.notes.map((note, index) => (
                    <div key={note._id || index} className="card mb-2">
                      <div className="card-body">
                        <p className="card-text">{note.content}</p>
                        <small className="text-muted">
                          Added by {note.createdBy} on {new Date(note.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No notes yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetail;