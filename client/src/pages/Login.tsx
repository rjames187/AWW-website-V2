import React, { useState, useEffect, CSSProperties, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextData } from '../context/AuthContext';

interface LoginCredentials {
  username: string;
  password: string;
}

interface Styles {
  container: CSSProperties;
  card: CSSProperties;
  title: CSSProperties;
  subtitle: CSSProperties;
  form: CSSProperties;
  inputGroup: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  inputFocus: CSSProperties;
  button: CSSProperties;
  buttonHover: CSSProperties;
  buttonDisabled: CSSProperties;
  spinner: CSSProperties;
  errorMessage: CSSProperties;
}

const workersHost = import.meta.env.VITE_WORKER_HOST || 'localhost:8787';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear any previous errors
    
    // Here you can add your API call to your login endpoint
    const credentials: LoginCredentials = { username, password };
    console.log('Login attempt:', credentials);
    
    try {
      const response = await fetch(`${workersHost}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: AuthContextData = await response.json();
      console.log('Login successful:', data);

      setAuthData(data);
      navigate('/cms');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
    setIsLoading(false);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = '#8b5cf6';
    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = '#e5e7eb';
    e.target.style.boxShadow = 'none';
  };

  const handleButtonMouseEnter = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isLoading) {
      e.currentTarget.style.backgroundColor = '#7c3aed';
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
    }
  };

  const handleButtonMouseLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isLoading) {
      e.currentTarget.style.backgroundColor = '#8b5cf6';
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  const styles: Styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
      width: '100%',
      maxWidth: '400px',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#4c1d95',
      marginBottom: '8px',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      textAlign: 'center',
      marginBottom: '32px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
    },
    button: {
      backgroundColor: '#8b5cf6',
      color: 'white',
      border: 'none',
      padding: '14px 24px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '8px',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHover: {
      backgroundColor: '#7c3aed',
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 20px rgba(139, 92, 246, 0.4)'
    },
    buttonDisabled: {
      backgroundColor: '#a78bfa',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid #ffffff40',
      borderTop: '2px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      display: 'inline-block',
      marginRight: '8px'
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      padding: '12px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      border: '1px solid #fecaca',
      marginBottom: '20px',
      textAlign: 'center'
    }
  };

  // Add CSS animation for spinner
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Please sign in to your account</p>
        
        <div style={styles.form}>
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              style={styles.input}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {isLoading && <span style={styles.spinner}></span>}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;