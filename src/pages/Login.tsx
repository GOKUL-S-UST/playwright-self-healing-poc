import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    navigate('/products');
  };

  return (
    <form onSubmit={onSubmit} className="card form-card" aria-labelledby="login-title">
      <span className="brand-mark" aria-hidden="true">S</span>
      <h1 id="login-title">Welcome back</h1>
      <p>Sign in to continue to your workspace essentials.</p>
      <div className="form-field">
        <label htmlFor="login-username">Username</label>
        <input id="login-username" data-testid="login-username" autoComplete="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-field">
        <label htmlFor="login-password">Password</label>
        <input id="login-password" data-testid="login-password" type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="button button-primary" data-testid="login-submit" type="submit">Sign in</button>
      {error && <p data-testid="login-error" className="error">{error}</p>}
    </form>
  );
}
