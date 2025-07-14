import DataService from "./DataService";
import { errorResponse, jsonResponse } from "./utils";

export async function dataController(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "PUT") {
    return errorResponse("Method Not Allowed", 405);
  }

  // Check if DataService is properly initialized
  if (!DataService.instance) {
    console.error("DataService instance not initialized");
    return errorResponse("Service not available", 503);
  }
  
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const key = searchParams.get('key');

  if (!key) {
    return errorResponse("Missing 'key' query parameter", 400);
  }

  const ALLOWED_KEYS = ["sponsors", "horses", "directors", "data"];

  if (!ALLOWED_KEYS.includes(key)) {
    return errorResponse(`Invalid key: ${key}`, 400);
  }

  if (request.method == "GET") {
    try {
      const res = await DataService.instance.fetchData(key);
      const data = JSON.parse(res);
      return jsonResponse(data, 200);
    } catch (error: any) {
      console.error(`Error fetching data for key ${key}:`, error);
      return errorResponse(`Failed to fetch data: ${error.message}`, 500);
    }

  } else {
    try {
      const body = await request.json();
      if (!body || typeof body !== 'object') {
        return errorResponse("Invalid data format", 400);
      }

      console.log(`Updating KV data for key: ${key}`, { bodySize: JSON.stringify(body).length });
      await DataService.instance.putData(key, JSON.stringify(body));
      console.log(`Successfully updated KV data for key: ${key}`);
      return jsonResponse({ message: "Data updated successfully" }, 201);
    } catch (error: any) {
      console.error(`Error updating data for key ${key}:`, error);
      return errorResponse(`Failed to update data: ${error.message}`, 500);
    }
  }
}