const workersHost = import.meta.env.VITE_WORKER_HOST || 'localhost:8787';
const API_BASE_URL = workersHost;

export interface UploadResult {
  success: boolean;
  message: string;
  url?: string;
}

/**
 * Uploads an image file to the backend in binary format
 * @param file - The file object from the file input
 * @param key - Unique identifier for the image (e.g., filename or ID)
 * @returns Promise with upload result
 */
export async function uploadImageFile(file: File, key: string, token: string): Promise<UploadResult> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Convert file to binary data
    const arrayBuffer = await file.arrayBuffer();
    
    // Create the upload URL with key parameter
    const uploadUrl = `${API_BASE_URL}/upload-image?key=${encodeURIComponent(key)}`;
    
    // Make the upload request
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
        'Content-Length': file.size.toString(),
        'Authorization': `Bearer ${token}`
      },
      body: arrayBuffer
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const CDN_BASE_URL = import.meta.env.CDN_HOST;
    if (!CDN_BASE_URL) {
      throw new Error('CDN host is not configured');
    }
    
    return {
      success: true,
      message: result.message || 'Image uploaded successfully',
      url: `${CDN_BASE_URL}/${key}`
    };
    
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

/**
 * Uploads an image from a data URL (base64 encoded) to binary format
 * @param dataUrl - The data URL from FileReader
 * @param key - Unique identifier for the image
 * @param fileName - Original filename
 * @returns Promise with upload result
 */
export async function uploadImageFromDataUrl(
  dataUrl: string, 
  key: string
): Promise<UploadResult> {
  try {
    // Extract the base64 data and content type
    const [header, base64Data] = dataUrl.split(',');
    const mimeType = header.match(/data:([^;]+)/)?.[1] || 'image/jpeg';
    
    // Convert base64 to binary
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Create the upload URL with key parameter
    const uploadUrl = `${API_BASE_URL}/upload-image?key=${encodeURIComponent(key)}`;
    
    // Make the upload request
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
        'Content-Length': bytes.length.toString(),
      },
      body: bytes
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      success: true,
      message: result.message || 'Image uploaded successfully',
      url: `${API_BASE_URL}/images/${key}`
    };
    
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}