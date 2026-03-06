import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { FaEnvelope, FaPhone, FaCalendar } from 'react-icons/fa';

function LeadCard({ lead }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{lead.name}</h5>
        <p className="card-text">
          <FaEnvelope className="me-2 text-muted" />
          <a href={`mailto:${lead.email}`}>{lead.email}</a>
        </p>
        {lead.phone && (
          <p className="card-text">
            <FaPhone className="me-2 text-muted" />
            <a href={`tel:${lead.phone}`}>{lead.phone}</a>
          </p>
        )}
        <p className="card-text">
          <FaCalendar className="me-2 text-muted" />
          {new Date(lead.createdAt).toLocaleDateString()}
        </p>
        <p className="card-text">
          <StatusBadge status={lead.status} />
        </p>
        <Link to={`/lead/${lead._id}`} className="btn btn-primary btn-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default LeadCard;