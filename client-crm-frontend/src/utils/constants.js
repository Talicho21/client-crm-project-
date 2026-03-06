export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CONVERTED: 'converted',
  LOST: 'lost'
};

export const LEAD_SOURCES = {
  WEBSITE: 'website',
  REFERRAL: 'referral',
  SOCIAL_MEDIA: 'social_media',
  ADVERTISEMENT: 'advertisement',
  OTHER: 'other'
};

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  LEADS: '/leads',
  LEAD_DETAIL: '/lead/:id',
  NEW_LEAD: '/lead/new'
};