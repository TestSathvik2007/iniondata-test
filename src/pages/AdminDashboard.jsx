import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .dashboard {
    min-height: 100vh;
    background: #060f0c;
    font-family: 'DM Sans', sans-serif;
    color: #e8f5f0;
  }

  /* ── NAV ── */
  .dash-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    height: 60px;
    background: rgba(6,15,12,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .dash-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #e8f5f0;
  }
  .dash-nav-brand-dot {
    width: 8px; height: 8px;
    background: #1D9E75;
    border-radius: 50%;
    box-shadow: 0 0 8px #1D9E75;
  }
  .dash-nav-actions { display: flex; gap: 8px; align-items: center; }

  /* ── LAYOUT ── */
  .dash-content {
    max-width: 1180px;
    margin: 0 auto;
    padding: 32px 24px 64px;
  }

  /* ── PAGE HEADER ── */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .page-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    color: #e8f5f0;
  }
  .page-subtitle {
    font-size: 13px;
    color: #4a7060;
    margin: 4px 0 0;
    font-weight: 400;
  }

  /* ── TABS ── */
  .tabs {
    display: flex;
    gap: 2px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    padding: 3px;
    width: fit-content;
    margin-bottom: 32px;
  }
  .tab {
    padding: 8px 18px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #4a7060;
    transition: all 0.18s;
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: inherit;
    letter-spacing: -0.01em;
  }
  .tab.active { background: #1D9E75; color: #fff; }
  .tab:hover:not(.active) { background: rgba(255,255,255,0.04); color: #b0d4c5; }
  .tab-count {
    background: rgba(255,255,255,0.18);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    padding: 1px 7px;
    letter-spacing: 0;
  }
  .tab:not(.active) .tab-count {
    background: rgba(45,212,191,0.15);
    color: #2dd4bf;
  }

  /* ── BUTTONS ── */
  .btn {
    padding: 9px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.18s;
    font-family: inherit;
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .btn-primary { background: #1D9E75; color: #fff; }
  .btn-primary:hover { background: #18b87f; transform: translateY(-1px); }
  .btn-danger { background: rgba(239,68,68,0.1); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .btn-danger:hover { background: rgba(239,68,68,0.18); }
  .btn-outline { background: transparent; border: 1px solid rgba(255,255,255,0.12); color: #a0c4b5; }
  .btn-outline:hover { background: rgba(255,255,255,0.04); color: #fff; border-color: rgba(255,255,255,0.2); }
  .btn-teal { background: rgba(45,212,191,0.1); color: #2dd4bf; border: 1px solid rgba(45,212,191,0.2); }
  .btn-teal:hover { background: rgba(45,212,191,0.18); }
  .btn-ghost { background: transparent; border: none; color: #4a7060; padding: 6px 10px; }
  .btn-ghost:hover { color: #e8f5f0; background: rgba(255,255,255,0.04); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── STATS ROW ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    padding: 16px 20px;
  }
  .stat-label { font-size: 11px; font-weight: 600; color: #3a6050; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .stat-value { font-size: 28px; font-weight: 700; letter-spacing: -0.04em; color: #e8f5f0; }
  .stat-accent { color: #1D9E75; }

  /* ── JOB LIST ── */
  .job-list { display: flex; flex-direction: column; gap: 10px; }
  .job-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 20px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    transition: border-color 0.2s;
    gap: 12px;
  }
  .job-item:hover { border-color: rgba(29,158,117,0.3); }
  .job-item-info { min-width: 0; }
  .job-item-title { font-size: 15px; font-weight: 600; margin: 0 0 4px; color: #e8f5f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .job-item-meta { font-size: 12px; color: #4a7060; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .job-meta-dot { width: 3px; height: 3px; background: #3a6050; border-radius: 50%; }
  .job-type-badge {
    font-size: 11px; font-weight: 600;
    padding: 2px 8px; border-radius: 999px;
    background: rgba(29,158,117,0.1);
    color: #1D9E75;
    border: 1px solid rgba(29,158,117,0.2);
  }

  /* ── FILTERS ── */
  .filters-bar {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    align-items: center;
  }
  .search-wrap {
    flex: 1;
    min-width: 200px;
    position: relative;
  }
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #3a6050;
    pointer-events: none;
  }
  .app-search {
    width: 100%;
    padding: 9px 14px 9px 36px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #e8f5f0;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }
  .app-search::placeholder { color: #3a6050; }
  .app-search:focus { border-color: rgba(29,158,117,0.4); background: rgba(255,255,255,0.04); }
  .filter-select {
    padding: 9px 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #e8f5f0;
    font-size: 13px;
    font-family: inherit;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .filter-select:focus { border-color: rgba(29,158,117,0.4); }
  .filter-select option { background: #0c1a16; }

  /* ── TABLE ── */
  .table-wrap {
    overflow-x: auto;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .app-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    min-width: 620px;
  }
  .app-table th {
    padding: 12px 16px;
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3a6050;
    background: rgba(255,255,255,0.02);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    white-space: nowrap;
  }
  .app-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: middle;
  }
  .app-table tr:last-child td { border-bottom: none; }
  .app-table tbody tr { transition: background 0.15s; }
  .app-table tbody tr:hover td { background: rgba(29,158,117,0.04); }

  .applicant-name { font-weight: 600; color: #e8f5f0; font-size: 13px; }
  .applicant-email { color: #4a7060; font-size: 12px; margin-top: 2px; font-family: 'DM Mono', monospace; }

  .results-count {
    font-size: 12px;
    color: #3a6050;
    margin-bottom: 10px;
    font-family: 'DM Mono', monospace;
  }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 16px;
    backdrop-filter: blur(4px);
  }
  .modal {
    background: #0a1712;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 28px;
    width: 100%;
    max-width: 500px;
    max-height: 92vh;
    overflow-y: auto;
  }
  .modal::-webkit-scrollbar { width: 4px; }
  .modal::-webkit-scrollbar-track { background: transparent; }
  .modal::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 12px;
  }
  .modal-title { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.03em; }
  .modal-close {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #4a7060;
    width: 30px; height: 30px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: all 0.18s;
    font-family: inherit;
  }
  .modal-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

  .detail-grid { display: flex; flex-direction: column; gap: 0; }
  .detail-row {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    align-items: baseline;
  }
  .detail-row:last-child { border-bottom: none; }
  .detail-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #3a6050; padding-top: 1px; }
  .detail-value { font-size: 13px; color: #c8e8d8; line-height: 1.55; word-break: break-word; }
  .detail-link { color: #2dd4bf; text-decoration: none; }
  .detail-link:hover { text-decoration: underline; }

  /* ── FORM ── */
  .form-group { margin-bottom: 14px; }
  .form-label { display: block; margin-bottom: 6px; color: #6a9080; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
  .form-input, .form-textarea, .form-select {
    width: 100%;
    padding: 10px 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
    color: #e8f5f0;
    font-family: inherit;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: rgba(29,158,117,0.5); background: rgba(255,255,255,0.05); }
  .form-textarea { min-height: 100px; resize: vertical; }
  .form-select option { background: #0c1a16; }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center;
    padding: 64px 20px;
    color: #3a6050;
  }
  .empty-icon {
    width: 48px; height: 48px;
    margin: 0 auto 14px;
    opacity: 0.3;
  }
  .empty-state p { margin: 0; font-size: 14px; }

  /* ── LOADING ── */
  .loading-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 32px 0;
    color: #3a6050;
    font-size: 13px;
  }
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(29,158,117,0.2);
    border-top-color: #1D9E75;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── DIVIDER ── */
  .modal-footer {
    display: flex;
    gap: 10px;
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid rgba(255,255,255,0.06);
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .dash-nav { padding: 0 16px; }
    .dash-content { padding: 20px 14px 48px; }
    .page-title { font-size: 22px; }
    .tabs { width: 100%; }
    .tab { flex: 1; justify-content: center; padding: 8px 10px; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .stat-value { font-size: 22px; }
    .filters-bar { flex-direction: column; }
    .search-wrap { min-width: unset; width: 100%; }
    .filter-select { width: 100%; }
    .modal { padding: 20px 16px; }
    .detail-row { grid-template-columns: 90px 1fr; }
    .btn-nav-label { display: none; }
    .page-header { flex-direction: column; align-items: flex-start; }
    .modal-footer { flex-direction: column-reverse; }
    .modal-footer .btn { width: 100%; justify-content: center; }
  }
`;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filterJob, setFilterJob] = useState("all");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }
      fetchJobs();
      fetchApplications();
    }
    init();
  }, []);

  useEffect(() => {
    let result = [...applications];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        `${a.first_name} ${a.last_name}`.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.experience?.toLowerCase().includes(q)
      );
    }
    if (filterJob !== "all") result = result.filter(a => String(a.job_id) === filterJob);
    setFilteredApps(result);
  }, [applications, search, filterJob]);

  async function fetchJobs() {
    const { data } = await supabase.from("careers").select("*").order("created_at", { ascending: false });
    if (data) setJobs(data);
  }

  async function fetchApplications() {
    setAppLoading(true);
    const { data } = await supabase.from("job_applications").select("*").order("created_at", { ascending: false });
    if (data) setApplications(data);
    setAppLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  async function handleAddJob(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("careers").insert([{ title, location, type, description }]);
      if (error) throw error;
      setIsAddJobOpen(false);
      setTitle(""); setLocation(""); setDescription(""); setType("Full-time");
      fetchJobs();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteJob(id) {
    if (window.confirm("Delete this job posting?")) {
      const { error } = await supabase.from("careers").delete().eq("id", id);
      if (!error) fetchJobs();
    }
  }

  async function handleDeleteApp(id) {
    if (window.confirm("Delete this application? This cannot be undone.")) {
      const { error } = await supabase.from("job_applications").delete().eq("id", id);
      if (!error) { setSelectedApp(null); fetchApplications(); }
    }
  }

  function jobTitleFor(jobId) {
    return jobs.find(j => String(j.id) === String(jobId))?.title || "—";
  }

  function formatDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  const totalJobs = jobs.length;
  const totalApps = applications.length;

  return (
    <div className="dashboard">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="dash-nav">
        <div className="dash-nav-brand">
          <div className="dash-nav-brand-dot" />
          Admin Dashboard
        </div>
        <div className="dash-nav-actions">
          <button className="btn btn-outline btn-sm" onClick={() => navigate("/")}>
            <span className="btn-nav-label">← Site</span>
            <span style={{display:'none'}} className="btn-nav-short">←</span>
          </button>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dash-content">
        {/* TABS */}
        <div className="tabs">
          <button className={`tab${activeTab === "jobs" ? " active" : ""}`} onClick={() => setActiveTab("jobs")}>
            Jobs
            {totalJobs > 0 && <span className="tab-count">{totalJobs}</span>}
          </button>
          <button className={`tab${activeTab === "applications" ? " active" : ""}`} onClick={() => setActiveTab("applications")}>
            Applications
            {totalApps > 0 && <span className="tab-count">{totalApps}</span>}
          </button>
        </div>

        {/* ── JOBS TAB ── */}
        {activeTab === "jobs" && (
          <>
            <div className="page-header">
              <div>
                <h1 className="page-title">Job Postings</h1>
                <p className="page-subtitle">{totalJobs} active position{totalJobs !== 1 ? "s" : ""}</p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsAddJobOpen(true)}>
                + Add Job
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                <p>No job postings yet. Add your first one.</p>
              </div>
            ) : (
              <div className="job-list">
                {jobs.map(job => (
                  <div key={job.id} className="job-item">
                    <div className="job-item-info">
                      <h3 className="job-item-title">{job.title}</h3>
                      <div className="job-item-meta">
                        <span>{job.location}</span>
                        <div className="job-meta-dot" />
                        <span className="job-type-badge">{job.type}</span>
                      </div>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteJob(job.id)}>Delete</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── APPLICATIONS TAB ── */}
        {activeTab === "applications" && (
          <>
            <div className="page-header">
              <div>
                <h1 className="page-title">Applications</h1>
                <p className="page-subtitle">{totalApps} total submission{totalApps !== 1 ? "s" : ""}</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={fetchApplications}>↻ Refresh</button>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">Total</div>
                <div className="stat-value">{totalApps}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Positions</div>
                <div className="stat-value">{totalJobs}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">With Resume</div>
                <div className="stat-value stat-accent">
                  {applications.filter(a => a.resume_url).length}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
              <div className="search-wrap">
                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  className="app-search"
                  placeholder="Search name or email…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select className="filter-select" value={filterJob} onChange={e => setFilterJob(e.target.value)}>
                <option value="all">All positions</option>
                {jobs.map(j => <option key={j.id} value={String(j.id)}>{j.title}</option>)}
              </select>
            </div>

            {appLoading ? (
              <div className="loading-row">
                <div className="spinner" />
                Loading applications…
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <p>{search || filterJob !== "all" ? "No applications match your filters." : "No applications yet."}</p>
              </div>
            ) : (
              <>
                <p className="results-count">{filteredApps.length} result{filteredApps.length !== 1 ? "s" : ""}</p>
                <div className="table-wrap">
                  <table className="app-table">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Position</th>
                        <th>Experience</th>
                        <th>Applied</th>
                        <th>Resume</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="applicant-name">{app.first_name} {app.last_name}</div>
                            <div className="applicant-email">{app.email}</div>
                          </td>
                          <td style={{ color: "#7a9e8e" }}>{jobTitleFor(app.job_id)}</td>
                          <td style={{ color: "#7a9e8e" }}>{app.experience || "—"}</td>
                          <td style={{ color: "#4a7060", whiteSpace: "nowrap", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{formatDate(app.created_at)}</td>
                          <td>
                            {app.resume_url
                              ? <a href={app.resume_url} target="_blank" rel="noreferrer" className="btn btn-teal btn-sm">View</a>
                              : <span style={{ color: "#3a5040", fontSize: 12 }}>—</span>
                            }
                          </td>
                          <td>
                            <button className="btn btn-outline btn-sm" onClick={() => setSelectedApp(app)}>Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* ── ADD JOB MODAL ── */}
      {isAddJobOpen && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setIsAddJobOpen(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Add New Job</h2>
              <button className="modal-close" onClick={() => setIsAddJobOpen(false)}>×</button>
            </div>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input required className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Frontend Engineer" />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input required className="form-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Remote, Bengaluru" />
              </div>
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select required className="form-select" value={type} onChange={e => setType(e.target.value)}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required className="form-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Role overview, responsibilities, requirements…" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddJobOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving…" : "Save Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── APPLICATION DETAIL MODAL ── */}
      {selectedApp && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedApp(null)}>
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedApp.first_name} {selectedApp.last_name}</h2>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "#4a7060", fontFamily: "'DM Mono', monospace" }}>{selectedApp.email}</p>
              </div>
              <button className="modal-close" onClick={() => setSelectedApp(null)}>×</button>
            </div>

            <div className="detail-grid">
              {[
                { label: "Phone", value: selectedApp.phone || "—" },
                { label: "Location", value: selectedApp.location || "—" },
                { label: "Position", value: jobTitleFor(selectedApp.job_id) },
                { label: "Experience", value: selectedApp.experience || "—" },
                {
                  label: "LinkedIn",
                  value: selectedApp.linkedin
                    ? <a href={selectedApp.linkedin} target="_blank" rel="noreferrer" className="detail-link">{selectedApp.linkedin}</a>
                    : "—"
                },
                {
                  label: "Portfolio",
                  value: selectedApp.portfolio
                    ? <a href={selectedApp.portfolio} target="_blank" rel="noreferrer" className="detail-link">{selectedApp.portfolio}</a>
                    : "—"
                },
                { label: "How heard", value: selectedApp.how_heard || "—" },
                { label: "Applied", value: formatDate(selectedApp.created_at) },
                { label: "Cover Letter", value: selectedApp.cover_letter || "—" },
                {
                  label: "Resume",
                  value: selectedApp.resume_url
                    ? <a href={selectedApp.resume_url} target="_blank" rel="noreferrer" className="detail-link">Download {selectedApp.resume_name || "resume"}</a>
                    : (selectedApp.resume_name || "Not uploaded")
                },
              ].map(({ label, value }) => (
                <div className="detail-row" key={label}>
                  <span className="detail-label">{label}</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteApp(selectedApp.id)}>
                Delete Application
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => setSelectedApp(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}