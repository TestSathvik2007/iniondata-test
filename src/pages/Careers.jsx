import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useReveal, ANIM_CSS } from "../animations";

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  .careers-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
  }
  
  .job-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .job-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(20, 184, 166, 0.3);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  
  .job-title {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
  
  .job-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    font-size: 14px;
    color: #7a9e8e;
  }
  
  .meta-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(20, 184, 166, 0.1);
    padding: 6px 12px;
    border-radius: 999px;
    color: #2dd4bf;
    font-weight: 500;
  }
  
  .job-desc {
    color: #a0aec0;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    border: 1px dashed rgba(255, 255, 255, 0.1);
  }
`;

export default function Careers() {
  useReveal();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
      }
    } catch (err) {
      console.error("Exception:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section">
        <div className="container">
          <div className="careers-header rv">
            <div className="accent-bar" style={{ margin: "0 auto 16px" }} />
            <div className="kicker" style={{ marginBottom: 16 }}>Join Our Team</div>
            <h1 className="h1" style={{ marginBottom: 24 }}>Build the future of enterprise tech with us.</h1>
            <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
              We're always looking for passionate engineers, data scientists, and problem solvers to join our growing team. Check out our open positions below.
            </p>
          </div>

          {loading ? (
            <div className="empty-state rv">
              <div style={{ color: "#2dd4bf" }}>Loading open positions...</div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-2 rv-group">
              {jobs.map((job) => (
                <div key={job.id} className="job-card rv">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="meta-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {job.location}
                    </span>
                    <span className="meta-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      {job.type}
                    </span>
                  </div>
                  <p className="job-desc">{job.description}</p>
                  <div style={{ marginTop: "auto", paddingTop: 16 }}>
                    <Link to="/contact" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state rv">
              <h3 className="h3" style={{ marginBottom: 12 }}>No open positions right now</h3>
              <p className="lead" style={{ textAlign: "center", margin: "0 auto" }}>
                We don't have any specific roles open at the moment, but we're always interested in meeting talented people. Send us an email at hello@iniondata.com.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
