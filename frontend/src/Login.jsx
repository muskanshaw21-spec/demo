import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    setIsAuthenticating(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(); // Proceed regardless of email for demo purposes
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration workflow initiated!');
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="logo-icon">G</div>
        <div className="logo-text">Gemini</div>
      </header>

      <div className="container">
        {/* Main Login Window */}
        <main className="glass-panel login-window">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Enter your credentials to access the portal.</p>
          
          <form onSubmit={handleLogin} id="loginForm">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="name@gemini.corp" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <a href="#" className="forgot-password">Forgot password?</a>
            
            <button type="submit" className="btn btn-primary" disabled={isAuthenticating}>
              {isAuthenticating ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </main>

        {/* New User Window */}
        <aside className="glass-panel new-user-window">
          <h2 className="title" style={{ fontSize: '1.4rem' }}>New User?</h2>
          <p className="subtitle" style={{ marginBottom: '1.5rem' }}>Join the Gemini ecosystem today.</p>
          
          <form onSubmit={handleRegister} id="registerForm">
            <div className="input-group">
              <label htmlFor="reg-email" style={{ fontSize: '0.8rem' }}>Work Email</label>
              <input type="email" id="reg-email" placeholder="email@company.com" required style={{ padding: '0.75rem' }} />
            </div>
            
            <div className="input-group">
              <label htmlFor="reg-token" style={{ fontSize: '0.8rem' }}>Access Token</label>
              <input type="text" id="reg-token" placeholder="Provided by HR" required style={{ padding: '0.75rem' }} />
            </div>
            
            <button type="submit" className="btn btn-secondary" style={{ padding: '0.75rem' }}>
              Request Access
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
