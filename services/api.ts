import axios from 'axios';

const api = axios.create({
  baseURL: 'https://byfernawhgsnygireuno.supabase.co/rest/v1',
  headers: {
    'Content-Type': 'application/json',
    'apikey': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmVybmF3aGdzbnlnaXJldW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNjI5MjMsImV4cCI6MTk5NjczODkyM30.LXH-A9bPEA_rCTaJsCncwmzloAIq2Nmg_qQE36ScG2g",
    'Authorization': "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZmVybmF3aGdzbnlnaXJldW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNjI5MjMsImV4cCI6MTk5NjczODkyM30.LXH-A9bPEA_rCTaJsCncwmzloAIq2Nmg_qQE36ScG2g",
    'prefer': 'return=minimal',
  },
});

export default api;