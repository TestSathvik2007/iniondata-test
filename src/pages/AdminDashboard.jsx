import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  .dashboard {
    min-height: 100vh;
    background: #07100e;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }
  .dash-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .dash-content {
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
  }
  .btn {
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }
  .btn-primary { background: #1D9E75; color: #fff; }
  .btn-primary:hover { background: #16a34a; }
  .btn-danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
  .btn-danger:hover { background: rgba(239, 68, 68, 0.3); }
  .btn-outline { background: transparent; border: 1px solid rgba(255, 255, 255, 0.2); color: #fff; }
  .btn-outline:hover { background: rgba(255, 255, 255, 0.05); }

  .job-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }
  .job-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
  }
  .job-item h3 { margin: 0 0 8px 0; font-size: 18px; }
  .job-item p { margin: 0; color: #7a9e8e; font-size: 14px; }
  
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .modal {
    background: #0c1a16;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 500px;
  }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; margin-bottom: 8px; color: #7a9e8e; font-size: 13px; font-weight: 600; }
  .form-input, .form-textarea {
    width: 100%;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
  }
  .form-textarea { min-height: 120px; resize: vertical; }
`;

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");

  useEffect(() => {
    checkUser();
    fetchJobs();
  }, []);

  async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
    }
  }

  async function fetchJobs() {
    const { data } = await supabase.from("careers").select("*").order("created_at", { ascending: false });
    if (data) setJobs(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  async function handleAddJob(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("careers").insert([
        { title, location, type, description }
      ]);
      if (error) throw error;
      
      setIsModalOpen(false);
      setTitle("");
      setLocation("");
      setDescription("");
      setType("Full-time");
      fetchJobs();
    } catch (err) {
      alert("Error adding job: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteJob(id) {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      const { error } = await supabase.from("careers").delete().eq("id", id);
      if (error) {
        alert("Error deleting job");
      } else {
        fetchJobs();
      }
    }
  }

  return (
    <div className="dashboard">
      <style>{styles}</style>
      
      <nav className="dash-nav">
        <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn btn-outline" onClick={() => navigate("/")}>Back to Site</button>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dash-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Job Postings</h2>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Job</button>
        </div>

        <div className="job-list">
          {jobs.length === 0 ? (
            <p style={{ color: "#7a9e8e" }}>No job postings yet.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-item">
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.location} • {job.type}</p>
                </div>
                <button className="btn btn-danger" onClick={() => handleDeleteJob(job.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{ marginTop: 0 }}>Add New Job</h2>
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input required className="form-input" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input required className="form-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Remote, NY, USA" />
              </div>
              <div className="form-group">
                <label className="form-label">Job Type</label>
                <select required className="form-input" value={type} onChange={e => setType(e.target.value)}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea required className="form-textarea" value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
