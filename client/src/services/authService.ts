import { NavigateFunction } from "react-router-dom";
import { AuthContextData, AuthContextValue } from "../context/AuthContext";

const workersHost = import.meta.env.VITE_WORKER_HOST || 'localhost:8787';

interface CallBackFunction {
  (...args: any[]): Promise<any>;
}

export async function orchestrateAuthenticatedCall(
  context: AuthContextValue,
  navigate: NavigateFunction,
  callback: CallBackFunction,
  args: any[]
): Promise<any> {
  let accessToken = await orchestrateAuthRefresh(context, navigate);
  if (accessToken === "") {
    return {
      success: false,
      reason: 'session_expired'
    }
  }

  const response = await callback(...args, accessToken);
  if (response.status === 401) {
    console.warn('Access token expired, refreshing...');
    accessToken = await orchestrateAuthRefresh(context, navigate);
    if (accessToken === "") {
      return {
        success: false,
        reason: 'session_expired'
      }
    }
    return callback(...args, accessToken);
  }
  return response;
}

export async function orchestrateAuthRefresh(context: AuthContextValue, navigate: NavigateFunction): Promise<string> {
  const { authData, setAuthData } = context;

  const { accessToken } = authData || {};

  if (!accessToken) {
    console.error('No access token found, triggering auth refresh');
    const refreshedData = await refreshAuth();
    if (!refreshedData) {
      console.error('Failed to refresh auth token');
      alert('Session expired. Please log in again.');
      navigate('/cms/login');
      return "";
    }
    setAuthData(refreshedData);
    return refreshedData.accessToken || "";
  }

  return authData?.accessToken || "";
}

export async function refreshAuth(): Promise<AuthContextData | undefined> {
  const response = await fetch(`${workersHost}/auth/refresh`, {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    console.error('Failed to refresh auth token');
    return;
  }

  return await response.json();
}
