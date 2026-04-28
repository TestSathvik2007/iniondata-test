import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useReveal, ANIM_CSS } from "../animations";

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .apply-wrapper {
    max-width: 720px;
    margin: 0 auto;
  }

  .apply-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #7a9e8e;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    margin-bottom: 36px;
    transition: color 0.2s ease;
  }

  .apply-back:hover {
    color: #2dd4bf;
  }

  .apply-header {
    margin-bottom: 40px;
  }

  .apply-role-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(20, 184, 166, 0.12);
    border: 1px solid rgba(45, 212, 191, 0.25);
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    color: #2dd4bf;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .apply-form-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    padding: 48px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .form-grid .full-width {
    grid-column: 1 / -1;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-label {
    font-size: 13px;
    font-weight: 600;
    color: #a0aec0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .form-label span.required {
    color: #2dd4bf;
    margin-left: 3px;
  }

  .form-input,
  .form-select,
  .form-textarea {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 14px 16px;
    color: #fff;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.2s ease;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-color: rgba(45, 212, 191, 0.5);
    background: rgba(45, 212, 191, 0.05);
    box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.08);
  }

  .form-input.error,
  .form-select.error,
  .form-textarea.error {
    border-color: rgba(248, 113, 113, 0.5);
  }

  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a9e8e' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    cursor: pointer;
  }

  .form-select option {
    background: #0f1a16;
    color: #fff;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.6;
  }

  .form-error {
    font-size: 12px;
    color: #f87171;
    margin-top: 2px;
  }

  .file-upload-zone {
    border: 2px dashed rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.02);
    position: relative;
  }

  .file-upload-zone:hover,
  .file-upload-zone.dragging {
    border-color: rgba(45, 212, 191, 0.4);
    background: rgba(45, 212, 191, 0.04);
  }

  .file-upload-zone input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .file-upload-icon {
    width: 40px;
    height: 40px;
    margin: 0 auto 12px;
    color: #2dd4bf;
  }

  .file-upload-text {
    color: #a0aec0;
    font-size: 14px;
    line-height: 1.5;
  }

  .file-upload-text strong {
    color: #2dd4bf;
  }

  .file-selected {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(45, 212, 191, 0.08);
    border: 1px solid rgba(45, 212, 191, 0.2);
    border-radius: 8px;
    padding: 12px 16px;
    margin-top: 12px;
    font-size: 14px;
    color: #2dd4bf;
  }

  .form-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 32px 0;
  }

  .form-section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a7060;
    margin-bottom: 20px;
  }

  .submit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 36px;
    gap: 16px;
  }

  .submit-note {
    font-size: 13px;
    color: #4a7060;
    line-height: 1.5;
  }

  .btn-submit {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #14b8a6, #0d9488);
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    padding: 14px 32px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-family: inherit;
  }

  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(20, 184, 166, 0.3);
  }

  .btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .upload-progress {
    margin-top: 8px;
    font-size: 13px;
    color: #7a9e8e;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .upload-progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
  }

  .upload-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #14b8a6, #2dd4bf);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  .success-state {
    text-align: center;
    padding: 80px 40px;
  }

  .success-icon {
    width: 72px;
    height: 72px;
    background: rgba(45, 212, 191, 0.12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    color: #2dd4bf;
  }

  @media (max-width: 600px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    .apply-form-card {
      padding: 28px 20px;
    }
    .submit-row {
      flex-direction: column;
      align-items: stretch;
    }
    .btn-submit {
      justify-content: center;
    }
  }
`;

const EXPERIENCE_LEVELS = [
  "0–1 years (Entry level)",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years (Senior/Lead)",
];

const HOW_HEARD = [
  "LinkedIn",
  "Job board (Indeed, Naukri, etc.)",
  "Company website",
  "Referral",
  "Social media",
  "Other",
];

export default function JobApplication() {
  useReveal();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    howHeard: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0–100

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  }

  function validate() {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.experience) errs.experience = "Required";
    if (!form.coverLetter.trim()) errs.coverLetter = "Required";
    return errs;
  }

  async function uploadResume() {
    if (!resumeFile) return null;

    // Build a unique, clean path:  resumes/<timestamp>-<email>.<ext>
    const ext = resumeFile.name.split(".").pop();
    const safeName = form.email.replace(/[^a-z0-9]/gi, "_");
    const path = `${Date.now()}-${safeName}.${ext}`;

    // Supabase JS v2 does not expose upload progress natively,
    // so we fake a quick ramp to 80% while uploading then jump to 100%.
    const ramp = setInterval(() => {
      setUploadProgress((p) => (p < 80 ? p + 10 : p));
    }, 150);

    const { error } = await supabase.storage
      .from("resumes") // ← your bucket name
      .upload(path, resumeFile, { cacheControl: "3600", upsert: false });

    clearInterval(ramp);

    if (error) {
      setUploadProgress(0);
      throw new Error(`Resume upload failed: ${error.message}`);
    }

    setUploadProgress(100);

    // Get the public URL (works if bucket is set to public)
    const { data } = supabase.storage.from("resumes").getPublicUrl(path);
    return { url: data.publicUrl, name: resumeFile.name, path };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload resume (if provided)
      let resumeData = null;
      if (resumeFile) {
        resumeData = await uploadResume();
      }

      // 2. Insert application row
      const { error } = await supabase.from("job_applications").insert([
        {
          job_id: jobId || null,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone: form.phone,
          location: form.location,
          experience: form.experience,
          linkedin: form.linkedin,
          portfolio: form.portfolio,
          cover_letter: form.coverLetter,
          how_heard: form.howHeard,
          resume_name: resumeData?.name || null,   // original filename
          resume_url: resumeData?.url || null,      // public storage URL
          resume_path: resumeData?.path || null,    // storage path (for deletion later)
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert(`Something went wrong: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section">
        <div className="container">
          <div className="apply-wrapper">
            {/* ✅ FIX: no `rv` on the back link — it can be invisible on fast navigations */}
            <Link to="/careers" className="apply-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to open positions
            </Link>

            {submitted ? (
              // ✅ FIX: success card has NO `rv` — it renders in-place and the
              //         scroll-trigger would never fire since we're already on screen.
              <div className="apply-form-card">
                <div className="success-state">
                  <div className="success-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="h2" style={{ marginBottom: 16 }}>Application submitted!</h2>
                  <p className="lead" style={{ textAlign: "center", margin: "0 auto 32px", maxWidth: 440 }}>
                    Thanks for applying. Our team will review your application and reach out within 5–7 business days.
                  </p>
                  <Link to="/careers" className="btn btn--primary">
                    View more positions
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* ✅ FIX: `rv` only on form elements, not success state */}
                <div className="apply-header rv">
                  <div className="apply-role-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Job Application
                  </div>
                  <h1 className="h1" style={{ marginBottom: 12 }}>Apply for this position</h1>
                  <p className="lead">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <div className="apply-form-card rv">
                  <form onSubmit={handleSubmit} noValidate>

                    {/* Personal Info */}
                    <div className="form-section-title">Personal Information</div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">First name <span className="required">*</span></label>
                        <input
                          className={`form-input${errors.firstName ? " error" : ""}`}
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
                        />
                        {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Last name <span className="required">*</span></label>
                        <input
                          className={`form-input${errors.lastName ? " error" : ""}`}
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                        />
                        {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email <span className="required">*</span></label>
                        <input
                          className={`form-input${errors.email ? " error" : ""}`}
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@example.com"
                        />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone <span className="required">*</span></label>
                        <input
                          className={`form-input${errors.phone ? " error" : ""}`}
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && <span className="form-error">{errors.phone}</span>}
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Current location</label>
                        <input
                          className="form-input"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="form-divider" />

                    {/* Professional */}
                    <div className="form-section-title">Professional Details</div>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label className="form-label">Years of experience <span className="required">*</span></label>
                        <select
                          className={`form-select${errors.experience ? " error" : ""}`}
                          name="experience"
                          value={form.experience}
                          onChange={handleChange}
                        >
                          <option value="">Select experience level</option>
                          {EXPERIENCE_LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                        {errors.experience && <span className="form-error">{errors.experience}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">LinkedIn profile</label>
                        <input
                          className="form-input"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={handleChange}
                          placeholder="linkedin.com/in/yourname"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Portfolio / GitHub</label>
                        <input
                          className="form-input"
                          name="portfolio"
                          value={form.portfolio}
                          onChange={handleChange}
                          placeholder="github.com/yourname"
                        />
                      </div>

                      {/* Resume Upload */}
                      <div className="form-group full-width">
                        <label className="form-label">Resume / CV</label>
                        <div
                          className={`file-upload-zone${dragging ? " dragging" : ""}`}
                          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file) setResumeFile(file);
                          }}
                        >
                          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} />
                          <div className="file-upload-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <div className="file-upload-text">
                            <strong>Click to upload</strong> or drag and drop<br />
                            PDF, DOC, DOCX up to 10MB
                          </div>
                        </div>

                        {resumeFile && (
                          <div className="file-selected">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            {resumeFile.name}
                          </div>
                        )}

                        {/* Upload progress bar — only visible while submitting */}
                        {submitting && resumeFile && uploadProgress < 100 && (
                          <div className="upload-progress">
                            <span>Uploading resume…</span>
                            <div className="upload-progress-bar">
                              <div
                                className="upload-progress-fill"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <span>{uploadProgress}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-divider" />

                    {/* Cover Letter */}
                    <div className="form-section-title">Your Message</div>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label className="form-label">Cover letter <span className="required">*</span></label>
                        <textarea
                          className={`form-textarea${errors.coverLetter ? " error" : ""}`}
                          name="coverLetter"
                          value={form.coverLetter}
                          onChange={handleChange}
                          placeholder="Tell us why you're a great fit for this role, what excites you about this company, and what you'd bring to the team..."
                          rows={6}
                        />
                        {errors.coverLetter && <span className="form-error">{errors.coverLetter}</span>}
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">How did you hear about us?</label>
                        <select
                          className="form-select"
                          name="howHeard"
                          value={form.howHeard}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          {HOW_HEARD.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="submit-row">
                      <p className="submit-note">
                        Fields marked <span style={{ color: "#2dd4bf" }}>*</span> are required.<br />
                        We'll respond within 5–7 business days.
                      </p>
                      <button type="submit" className="btn-submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit Application
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}