import { useEffect, useState } from 'react';
import { Save, Trash2, Plus, LogOut, LogIn, UserPlus, Trophy, User } from 'lucide-react';

import {
  getAllProjects, createProject, updateProject, deleteProject,
  login, logout, isLoggedIn, getCurrentUser,
  addCastMember, addAward, addProducer,
  deleteCastMember, deleteAward, deleteProducerItem, // ✅ បន្ថែម
} from '../services/projectApi';
const emptyForm = {
  title: '', title_km: '', tagline: '', tagline_km: '',
  short_description: '', short_description_km: '',
  synopsis: '', synopsis_km: '',
  genre: '', duration: '', year: '', rating: '', votes: '',
  status: 'Development', release_date: '', country: 'Cambodia',
  language: 'Khmer', youtube_id: '', trailer_url: '',
  director: '', is_featured: true,
};

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [user, setUser] = useState(getCurrentUser());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // Cast/Award/Producer form states
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [castForm, setCastForm] = useState({ name: '', role_name: '', photo: null, preview: '' });
  const [awardForm, setAwardForm] = useState({ festival_name: '', award_title: '', year: '' });
  const [producerForm, setProducerForm] = useState({ name: '', photo: null, preview: '' });
  const [subMessage, setSubMessage] = useState('');

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn]);

  // ── Login ────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await login(email, password);
      setUser(res.user);
      setLoggedIn(true);
    } catch {
      setLoginError('Email ឬ Password មិនត្រឹមត្រូវ!');
    }
  };

  const handleLogout = async () => {
    await logout();
    setLoggedIn(false);
    setUser(null);
  };

  const updateField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handlePosterChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const editProject = (project) => {
    setEditingId(project.id);
    setForm({
      title: project.title || '', title_km: project.title_km || '',
      tagline: project.tagline || '', tagline_km: project.tagline_km || '',
      short_description: project.short_description || '',
      short_description_km: project.short_description_km || '',
      synopsis: project.synopsis || '', synopsis_km: project.synopsis_km || '',
      genre: project.genre || '', duration: project.duration || '',
      year: project.year || '', rating: project.rating || '', votes: project.votes || '',
      status: project.status || 'Development', release_date: project.release_date || '',
      country: project.country || '', language: project.language || '',
      youtube_id: project.youtube_id || '', trailer_url: project.trailer_url || '',
      director: project.director || '', is_featured: project.is_featured ?? true,
    });
    setPosterPreview(project.poster_image || '');
    setBannerPreview(project.banner_image || '');
    setActiveTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPosterFile(null);
    setBannerFile(null);
    setPosterPreview('');
    setBannerPreview('');
  };

  // ── Submit Project ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) { alert('ត្រូវការ Title!'); return; }
    setSaving(true);
    setMessage('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        fd.append(key, val === true ? 'true' : val === false ? 'false' : val ?? '');
      });
      if (posterFile) fd.append('poster_image', posterFile);
      if (bannerFile) fd.append('banner_image', bannerFile);

      if (editingId) {
        await updateProject(editingId, fd);
        setMessage('✅ Project updated!');
      } else {
        await createProject(fd);
        setMessage('✅ Project created!');
      }
      await loadProjects();
      clearForm();
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
      if (editingId === id) clearForm();
      setMessage('✅ Project deleted.');
    } catch { setMessage('❌ Failed to delete.'); }
  };

  // ── Add Cast ─────────────────────────────────────────────
  const handleAddCast = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !castForm.name) {
      setSubMessage('❌ ជ្រើស Project និងដាក់ Name!');
      return;
    }
    try {
      const fd = new FormData();
      fd.append('name', castForm.name);
      fd.append('role_name', castForm.role_name);
      if (castForm.photo) fd.append('photo', castForm.photo);
      await addCastMember(selectedProjectId, fd);
      setCastForm({ name: '', role_name: '', photo: null, preview: '' });
      setSubMessage('✅ Cast member added!');
      await loadProjects();
    } catch { setSubMessage('❌ Failed to add cast.'); }
  };

  // ── Add Award ────────────────────────────────────────────
  const handleAddAward = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !awardForm.festival_name) {
      setSubMessage('❌ ជ្រើស Project និងដាក់ Festival Name!');
      return;
    }
    try {
      await addAward(selectedProjectId, awardForm);
      setAwardForm({ festival_name: '', award_title: '', year: '' });
      setSubMessage('✅ Award added!');
      await loadProjects();
    } catch { setSubMessage('❌ Failed to add award.'); }
  };

  // ── Add Producer ─────────────────────────────────────────
  const handleAddProducer = async (e) => {
    e.preventDefault();
    if (!selectedProjectId || !producerForm.name) {
      setSubMessage('❌ ជ្រើស Project និងដាក់ Name!');
      return;
    }
    try {
      const fd = new FormData();
      fd.append('name', producerForm.name);
      if (producerForm.photo) fd.append('photo', producerForm.photo);
      await addProducer(selectedProjectId, fd);
      setProducerForm({ name: '', photo: null, preview: '' });
      setSubMessage('✅ Producer added!');
      await loadProjects();
    } catch { setSubMessage('❌ Failed to add producer.'); }
  };

  // ── LOGIN SCREEN ─────────────────────────────────────────
  if (!loggedIn) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark px-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-light rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-1">Kravan Admin</h1>
          <p className="text-gray-400">Login to manage projects</p>
        </div>
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-center">{loginError}</div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <FInput label="Email" type="email" value={email} onChange={setEmail} placeholder="admin@kravanpictures.com" />
          <FInput label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark">
            <LogIn size={20} /> Login
          </button>
        </form>
      </div>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 bg-gray-100 dark:bg-dark text-gray-900 dark:text-white">
      <div className="container-custom section-padding">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Kravan Admin Dashboard</h1>
            <p className="text-gray-500">Welcome, {user?.name || 'Admin'}</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 dark:border-white/10">
          {[
            { id: 'projects', label: '🎬 Projects', icon: null },
            { id: 'cast', label: '👤 Cast Members', icon: null },
            { id: 'awards', label: '🏆 Awards', icon: null },
            { id: 'producers', label: '🎥 Producers', icon: null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg font-semibold ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* ── PROJECTS TAB ── */}
        {activeTab === 'projects' && (
          <>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6 mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingId ? '✏️ Edit Project' : '➕ Add New Project'}</h2>
                <button type="button" onClick={clearForm} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark">
                  <Plus size={18} /> New Form
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FInput label="Title (English) *" value={form.title} onChange={(v) => updateField('title', v)} required />
                <FInput label="Title (Khmer)" value={form.title_km} onChange={(v) => updateField('title_km', v)} />
                <FInput label="Tagline (EN)" value={form.tagline} onChange={(v) => updateField('tagline', v)} />
                <FInput label="Tagline (KM)" value={form.tagline_km} onChange={(v) => updateField('tagline_km', v)} />
                <FTextarea label="Short Description (EN)" value={form.short_description} onChange={(v) => updateField('short_description', v)} />
                <FTextarea label="Short Description (KM)" value={form.short_description_km} onChange={(v) => updateField('short_description_km', v)} />
                <FTextarea label="Synopsis (EN)" value={form.synopsis} onChange={(v) => updateField('synopsis', v)} />
                <FTextarea label="Synopsis (KM)" value={form.synopsis_km} onChange={(v) => updateField('synopsis_km', v)} />
                <FInput label="Genre" value={form.genre} onChange={(v) => updateField('genre', v)} placeholder="Horror, Drama" />
                <FInput label="Duration (min)" value={form.duration} onChange={(v) => updateField('duration', v)} />
                <FInput label="Year" value={form.year} onChange={(v) => updateField('year', v)} />
                <FInput label="Rating (e.g. 8.5)" value={form.rating} onChange={(v) => updateField('rating', v)} />
                <FInput label="Votes" value={form.votes} onChange={(v) => updateField('votes', v)} />
                <FInput label="Release Date" value={form.release_date} onChange={(v) => updateField('release_date', v)} placeholder="2025-01-01" />
                <FInput label="Country" value={form.country} onChange={(v) => updateField('country', v)} />
                <FInput label="Language" value={form.language} onChange={(v) => updateField('language', v)} />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  >
                    {['Development', 'Pre-Production', 'Production', 'Post-Production', 'Completed'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <FInput label="Director" value={form.director} onChange={(v) => updateField('director', v)} />
                <FInput label="YouTube ID" value={form.youtube_id} onChange={(v) => updateField('youtube_id', v)} placeholder="yMeWOePqmI8" />
                <FInput label="Trailer URL" value={form.trailer_url} onChange={(v) => updateField('trailer_url', v)} />
              </div>

              {/* Image Upload */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">🖼️ Poster Image</label>
                  <input type="file" accept="image/*" onChange={handlePosterChange} className="w-full" />
                  {posterPreview && <img src={posterPreview} alt="Poster" className="mt-3 h-48 rounded-xl object-cover w-full" />}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">🖼️ Banner Image</label>
                  <input type="file" accept="image/*" onChange={handleBannerChange} className="w-full" />
                  {bannerPreview && <img src={bannerPreview} alt="Banner" className="mt-3 h-48 rounded-xl object-cover w-full" />}
                </div>
              </div>

              <label className="flex items-center gap-3 mt-5">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => updateField('is_featured', e.target.checked)} className="w-5 h-5" />
                <span className="font-semibold">Show on Homepage Featured Projects</span>
              </label>

              <button type="submit" disabled={saving} className="mt-6 inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50">
                <Save size={20} /> {saving ? 'Saving...' : 'Save Project'}
              </button>
            </form>

            {/* Project List */}
            <h2 className="text-2xl font-bold mb-6">All Projects ({projects.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-dark-light rounded-xl overflow-hidden shadow-lg">
                  {project.poster_image && (
                    <img src={project.poster_image} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{project.genre} • {project.year} • {project.status}</p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.short_description}</p>
                    <div className="flex gap-3">
                      <button onClick={() => editProject(project)} className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-bold">Edit</button>
                      <button onClick={() => handleDelete(project.id)} className="px-4 py-2 rounded-lg bg-red-600 text-white">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sub message */}
        {subMessage && (activeTab === 'cast' || activeTab === 'awards' || activeTab === 'producers') && (
          <div className={`mb-6 p-4 rounded-lg font-semibold ${subMessage.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {subMessage}
          </div>
        )}

        {/* Project selector for sub forms */}
        {(activeTab === 'cast' || activeTab === 'awards' || activeTab === 'producers') && (
          <div className="mb-6 bg-white dark:bg-dark-light rounded-xl p-5">
            <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">
              🎬 ជ្រើស Project
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- ជ្រើស Project --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* ── CAST TAB ── */}
        {activeTab === 'cast' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><UserPlus size={20} /> Add Cast Member</h2>
              <form onSubmit={handleAddCast} className="space-y-4">
                <FInput label="Name *" value={castForm.name} onChange={(v) => setCastForm(p => ({ ...p, name: v }))} />
                <FInput label="Role / Character Name" value={castForm.role_name} onChange={(v) => setCastForm(p => ({ ...p, role_name: v }))} placeholder="as Sophea" />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">📸 Photo</label>
                  <input
                    type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setCastForm(p => ({ ...p, photo: file, preview: URL.createObjectURL(file) }));
                    }}
                    className="w-full"
                  />
                  {castForm.preview && (
                    <img src={castForm.preview} alt="" className="mt-3 w-20 h-20 rounded-xl object-cover" />
                  )}
                </div>
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg">
                  <Plus size={18} /> Add Cast Member
                </button>
              </form>
            </div>

            {/* Cast List */}
            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5">Cast Members</h2>
              {selectedProjectId ? (
                projects.find(p => p.id == selectedProjectId)?.cast_members?.length > 0
                  ? projects.find(p => p.id == selectedProjectId).cast_members.map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-white/10">
                      {/* Left: Photo + Name */}
                      <div className="flex items-center gap-3">
                        {c.photo
                          ? <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />
                          : <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">
                              {c.name?.charAt(0)}
                            </div>
                        }
                        <div>
                          <p className="font-semibold">{c.name}</p>
                          {c.role_name && <p className="text-sm text-gray-500">as {c.role_name}</p>}
                        </div>
                      </div>
                      {/* Right: Delete Button */}
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete "${c.name}"?`)) return;
                          try {
                            await deleteCastMember(c.id);
                            await loadProjects();
                            setSubMessage('✅ Cast member deleted!');
                          } catch {
                            setSubMessage('❌ Failed to delete cast member.');
                          }
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                  : <p className="text-gray-500">No cast members yet.</p>
              ) : <p className="text-gray-400">ជ្រើស project ដើម្បីមើល cast members</p>}
            </div>
          </div>
        )}

        {/* ── AWARDS TAB ── */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><Trophy size={20} /> Add Award</h2>
              <form onSubmit={handleAddAward} className="space-y-4">
                <FInput label="Festival Name *" value={awardForm.festival_name} onChange={(v) => setAwardForm(p => ({ ...p, festival_name: v }))} placeholder="Toronto International Film Festival" />
                <FInput label="Award Title" value={awardForm.award_title} onChange={(v) => setAwardForm(p => ({ ...p, award_title: v }))} placeholder="Best Director" />
                <FInput label="Year" value={awardForm.year} onChange={(v) => setAwardForm(p => ({ ...p, year: v }))} placeholder="2025" />
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg">
                  <Plus size={18} /> Add Award
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5">Awards</h2>
              {selectedProjectId ? (
                projects.find(p => p.id == selectedProjectId)?.awards?.length > 0
                  ? projects.find(p => p.id == selectedProjectId).awards.map((a) => (
                    <div key={a.id} className="p-3 border-b border-gray-100 dark:border-white/10">
                      <p className="font-semibold">🏆 {a.festival_name}</p>
                      {a.award_title && <p className="text-sm text-gray-500">{a.award_title}</p>}
                      {a.year && <p className="text-xs text-primary">{a.year}</p>}
                    </div>
                  ))
                  : <p className="text-gray-500">No awards yet.</p>
              ) : <p className="text-gray-400">ជ្រើស project ដើម្បីមើល awards</p>}
            </div>
          </div>
        )}

        {/* ── PRODUCERS TAB ── */}
        {activeTab === 'producers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2"><User size={20} /> Add Producer</h2>
              <form onSubmit={handleAddProducer} className="space-y-4">
                <FInput label="Name *" value={producerForm.name} onChange={(v) => setProducerForm(p => ({ ...p, name: v }))} />
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">📸 Photo</label>
                  <input
                    type="file" accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setProducerForm(p => ({ ...p, photo: file, preview: URL.createObjectURL(file) }));
                    }}
                    className="w-full"
                  />
                  {producerForm.preview && (
                    <img src={producerForm.preview} alt="" className="mt-3 w-20 h-20 rounded-xl object-cover" />
                  )}
                </div>
                <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg">
                  <Plus size={18} /> Add Producer
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-dark-light rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-5">Producers</h2>
              {selectedProjectId ? (
                projects.find(p => p.id == selectedProjectId)?.producers?.length > 0
                  ? projects.find(p => p.id == selectedProjectId).producers.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/10">
                      {p.photo
                        ? <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        : <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center font-bold">{p.name?.charAt(0)}</div>
                      }
                      <p className="font-semibold">{p.name}</p>
                    </div>
                  ))
                  : <p className="text-gray-500">No producers yet.</p>
              ) : <p className="text-gray-400">ជ្រើស project ដើម្បីមើល producers</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Reusable Components ───────────────────────────────────
const FInput = ({ label, value, onChange, required, placeholder, type = 'text' }) => (
  <label className="block">
    <span className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">{label}</span>
    <input
      type={type} required={required} value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
    />
  </label>
);

const FTextarea = ({ label, value, onChange }) => (
  <label className="block">
    <span className="block text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">{label}</span>
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)} rows="3"
      className="w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
    />
  </label>
);

export default AdminDashboard;