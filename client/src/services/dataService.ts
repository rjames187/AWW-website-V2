const workersHost = import.meta.env.VITE_WORKER_HOST || 'localhost:8787';
const API_BASE_URL = workersHost;

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export class DataService {
  private static readonly baseUrl = API_BASE_URL;

  /**
   * Fetches data from the backend for a specific key
   * @param key - The data key to fetch (sponsors, horses, members)
   * @returns Promise with the fetched data
   */
  static async fetchData<T = any>(key: string): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}/data?key=${encodeURIComponent(key)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Data fetched successfully'
      };
      
    } catch (error) {
      console.error(`Error fetching ${key} data:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch data'
      };
    }
  }

  /**
   * Updates data on the backend for a specific key
   * @param key - The data key to update (sponsors, horses, members)
   * @param data - The data to send to the backend
   * @returns Promise with the update result
   */
  static async updateData<T = any>(key: string, data: T): Promise<ApiResponse> {
    try {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format - must be an object');
      }

      const url = `${this.baseUrl}/data?key=${encodeURIComponent(key)}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Update failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Data updated successfully'
      };
      
    } catch (error) {
      console.error(`Error updating ${key} data:`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update data'
      };
    }
  }

}

// Export convenience functions for easier usage
export const {
  fetchData,
  updateData,
} = DataService;

export default DataService;
