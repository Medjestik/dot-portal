const DEFAULT_API_URL = 'https://api.emiit.ru/_wt';

export const API_URL =
  (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
  DEFAULT_API_URL;