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

  ImageService.instance.uploadImage(key, image);

  return jsonResponse({ message: "Image uploaded successfully" }, 201);
}