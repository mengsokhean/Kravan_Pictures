import axios from "axios";

// ── Base URL of Laravel backend ──────────────────────────
const API_BASE = "https://kravan-api.onrender.com/api";

// ── Create axios instance ─────────────────────────────────
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json",
  },
  withCredentials: false,
});

// ── Auto attach token to every request ───────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kravan_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ════════════════════════════════════════════════════════
// PUBLIC ROUTES (no login needed)
// ════════════════════════════════════════════════════════

// GET /api/projects — all projects
export const getAllProjects = async () => {
  const res = await api.get("/projects");
  return res.data.data;
};

// GET /api/projects/featured — featured projects
export const getFeaturedProjects = async () => {
  const res = await api.get("/projects/featured");
  return res.data.data;
};

// GET /api/projects/{slug} — single project
export const getProjectBySlug = async (slug) => {
  const res = await api.get(`/projects/${slug}`);
  return res.data.data;
};

// ════════════════════════════════════════════════════════
// AUTH ROUTES
// ════════════════════════════════════════════════════════

// POST /api/login
export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  const { token, user } = res.data;
  // Save token to localStorage
  localStorage.setItem("kravan_token", token);
  localStorage.setItem("kravan_user", JSON.stringify(user));
  return res.data;
};

// POST /api/logout
export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("kravan_token");
  localStorage.removeItem("kravan_user");
};

// Check if admin is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("kravan_token");
};

// Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem("kravan_user");
  return user ? JSON.parse(user) : null;
};

// ════════════════════════════════════════════════════════
// ADMIN ROUTES (need token)
// ════════════════════════════════════════════════════════

// POST /api/admin/projects — create project
export const createProject = async (formData) => {
  const res = await api.post("/admin/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// PUT /api/admin/projects/{id} — update project
export const updateProject = async (id, formData) => {
  // Laravel does not support PUT with FormData, use POST + _method
  formData.append("_method", "PUT");
  const res = await api.post(`/admin/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE /api/admin/projects/{id} — delete project
export const deleteProject = async (id) => {
  const res = await api.delete(`/admin/projects/${id}`);
  return res.data;
};

// POST /api/admin/projects/{id}/cast
export const addCastMember = async (projectId, formData) => {
  const res = await api.post(`/admin/projects/${projectId}/cast`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// POST /api/admin/projects/{id}/awards
export const addAward = async (projectId, data) => {
  const res = await api.post(`/admin/projects/${projectId}/awards`, data);
  return res.data;
};

// POST /api/admin/projects/{id}/producers
export const addProducer = async (projectId, formData) => {
  const res = await api.post(
    `/admin/projects/${projectId}/producers`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return res.data;
};
// DELETE cast member
export const deleteCastMember = async (id) => {
  const res = await api.delete(`/admin/cast/${id}`);
  return res.data;
};

// DELETE award
export const deleteAward = async (id) => {
  const res = await api.delete(`/admin/awards/${id}`);
  return res.data;
};

// DELETE producer
export const deleteProducerItem = async (id) => {
  const res = await api.delete(`/admin/producers/${id}`);
  return res.data;
};
// Keep Render awake — ping every 14 minutes
const keepAlive = () => {
  fetch('https://kravan-api-1.onrender.com/api/projects')
    .catch(() => {});
};
setInterval(keepAlive, 14 * 60 * 1000); // 14 minutes