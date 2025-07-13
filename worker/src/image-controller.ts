import ImageService from "./ImageService";
import { errorResponse, jsonResponse } from "./utils";

export async function imageController(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const key = searchParams.get('key');

  if (!key) {
    return errorResponse("Missing 'key' query parameter", 400);
  }
  
  const image = request.body;
  if (!image) {
    return errorResponse("No image provided", 400);
  }

  try {
    const result = await ImageService.instance.uploadImage(key, image);
    
    if (result.success) {
      return jsonResponse({ message: result.message }, 201);
    } else {
      return errorResponse(result.message, 500);
    }
  } catch (error) {
    console.error('Upload controller error:', error);
    return errorResponse("Internal server error during upload", 500);
  }
}