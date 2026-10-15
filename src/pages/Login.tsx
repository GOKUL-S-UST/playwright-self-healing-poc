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
    <form onSubmit={onSubmit} className="card">
      <h1>Login</h1>
      <input data-testid="login-username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input data-testid="login-password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button data-testid="login-submit" type="submit">Sign in</button>
      {error && <p data-testid="login-error" className="error">{error}</p>}
    </form>
  );
}
