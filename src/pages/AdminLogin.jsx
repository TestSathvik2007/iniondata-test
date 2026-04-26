import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  .admin-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: #07100e;
    font-family: 'Inter', sans-serif;
  }
  .login-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  }
  .login-title {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 24px 0;
    text-align: center;
  }
  .form-group {
    margin-bottom: 20px;
  }
  .form-label {
    display: block;
    color: #7a9e8e;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
  }
  .form-input:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
  }
  .btn-submit {
    width: 100%;
    padding: 12px;
    background: #1D9E75;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-submit:hover {
    background: #16a34a;
  }
  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .error-msg {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }
`;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.session) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <style>{styles}</style>
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
