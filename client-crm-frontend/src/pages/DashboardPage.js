import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaUserPlus, FaEnvelope, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';

// Mock data
const mockStats = {
  totalLeads: 45,
  newLeads: 12,
  contactedLeads: 18,
  convertedLeads: 10,
  lostLeads: 5
};

const mockRecentLeads = [
  { _id: '1', name: 'John Doe', email: 'john@example.com', status: 'new', createdAt: new Date() },
  { _id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'contacted', createdAt: new Date() },
  { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'converted', createdAt: new Date() },
  { _id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'new', createdAt: new Date() }
];

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    setTimeout(() => {
      setStats(mockStats);
      setRecentLeads(mockRecentLeads);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      new: { background: '#17a2b8', color: 'white' },
      contacted: { background: '#ffc107', color: 'black' },
      converted: { background: '#28a745', color: 'white' },
      lost: { background: '#dc3545', color: 'white' }
    };
    return styles[status] || styles.new;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* LOGOUT BUTTON - FIXED POSITION */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: '100px',
          right: '30px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '12px 25px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: '600',
          boxShadow: '0 4px 10px rgba(220, 53, 69, 0.3)',
          zIndex: 999,
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = '#c82333'}
        onMouseOut={(e) => e.target.style.background = '#dc3545'}
      >
        <FaSignOutAlt /> Logout
      </button>

      {/* Welcome Section */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '5px' }}>
          Welcome back, Admin!
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Here's what's happening with your leads today.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {/* Total Leads Card */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#4361ee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <FaUsers />
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: '0', color: '#333' }}>{stats.totalLeads}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>TOTAL LEADS</p>
              <span style={{ color: '#28a745', fontSize: '14px' }}>+12%</span>
            </div>
          </div>
        </div>

        {/* New Leads Card */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#17a2b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <FaUserPlus />
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: '0', color: '#333' }}>{stats.newLeads}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>NEW LEADS</p>
              <span style={{ color: '#28a745', fontSize: '14px' }}>+5%</span>
            </div>
          </div>
        </div>

        {/* Contacted Card */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#ffc107',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <FaEnvelope />
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: '0', color: '#333' }}>{stats.contactedLeads}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>CONTACTED</p>
              <span style={{ color: '#28a745', fontSize: '14px' }}>+8%</span>
            </div>
          </div>
        </div>

        {/* Converted Card */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: '#28a745',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              <FaCheckCircle />
            </div>
            <div>
              <h2 style={{ fontSize: '32px', margin: '0', color: '#333' }}>{stats.convertedLeads}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>CONVERTED</p>
              <span style={{ color: '#28a745', fontSize: '14px' }}>+15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads Section */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', color: '#333', margin: 0 }}>Recent Leads</h2>
          <Link to="/leads" style={{ color: '#4361ee', textDecoration: 'none' }}>View All →</Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee' }}>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Created</th>
              <th style={{ textAlign: 'left', padding: '12px', color: '#666' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map(lead => (
              <tr key={lead._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{lead.name}</td>
                <td style={{ padding: '12px', color: '#666' }}>{lead.email}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    ...getStatusBadge(lead.status),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {lead.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#999' }}>{lead.createdAt.toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>
                  <Link to={`/lead/${lead._id}`} style={{
                    background: '#4361ee',
                    color: 'white',
                    padding: '6px 15px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    fontSize: '13px'
                  }}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '20px' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/lead/new" style={{
            background: '#28a745',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaUserPlus /> Add New Lead
          </Link>
          <Link to="/leads" style={{
            background: '#4361ee',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaUsers /> View All Leads
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;