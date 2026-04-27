import { useState, useEffect } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // New features state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [resetSent, setResetSent] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!isForgotPassword) {
      if (!password) {
        setPasswordError('Password is required');
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAuthenticating(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin(); // Proceed regardless of email for demo purposes
    }, 1500);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAuthenticating(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsAuthenticating(false);
      setResetSent(true);
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration workflow initiated!');
  };

  return (
    <div className={`login-page ${theme === 'light' ? 'light-mode' : ''}`}>
      <button className="theme-toggle-login" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <header className="header">
        <div className="logo-icon">G</div>
        <div className="logo-text">Gemini</div>
      </header>

      <div className="container">
        {/* Main Login Window */}
        <main className="glass-panel login-window">
          {!isForgotPassword ? (
            <div className="form-content fade-in">
              <h1 className="title">Welcome Back</h1>
              <p className="subtitle">Enter your credentials to access the portal.</p>
              
              <form onSubmit={handleLogin} id="loginForm" noValidate>
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={emailError ? 'error-input' : ''}
                    placeholder="name@gemini.corp" 
                    required 
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                  />
                  {emailError && <span className="error-text">{emailError}</span>}
                </div>
                
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className={passwordError ? 'error-input' : ''}
                    placeholder="••••••••" 
                    required 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                  />
                  {passwordError && <span className="error-text">{passwordError}</span>}
                </div>
                
                <button type="button" className="forgot-password" onClick={() => { setIsForgotPassword(true); setEmailError(''); setPasswordError(''); }}>
                  Forgot password?
                </button>
                
                <button type="submit" className="btn btn-primary" disabled={isAuthenticating}>
                  {isAuthenticating ? (
                    <span className="spinner-container">
                      <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                      </svg>
                      Authenticating...
                    </span>
                  ) : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          ) : (
            <div className="form-content fade-in">
              <h1 className="title">Reset Password</h1>
              <p className="subtitle">
                {resetSent 
                  ? "Check your email for reset instructions." 
                  : "Enter your email and we'll send you a recovery link."}
              </p>
              
              {!resetSent ? (
                <form onSubmit={handleForgotPassword} id="forgotPasswordForm" noValidate>
                  <div className="input-group">
                    <label htmlFor="reset-email">Email Address</label>
                    <input 
                      type="email" 
                      id="reset-email" 
                      className={emailError ? 'error-input' : ''}
                      placeholder="name@gemini.corp" 
                      required 
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    />
                    {emailError && <span className="error-text">{emailError}</span>}
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={isAuthenticating}>
                    {isAuthenticating ? (
                      <span className="spinner-container">
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Recovery Link'}
                  </button>
                  
                  <button type="button" className="btn btn-secondary" onClick={() => setIsForgotPassword(false)}>
                    Back to Sign In
                  </button>
                </form>
              ) : (
                <button type="button" className="btn btn-primary" onClick={() => { setIsForgotPassword(false); setResetSent(false); setEmail(''); }}>
                  Back to Sign In
                </button>
              )}
            </div>
          )}
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
