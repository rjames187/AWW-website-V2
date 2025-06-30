import DataService from "./DataService";
import { errorResponse, jsonResponse } from "./utils";

export async function dataController(request: Request): Promise<Response> {
  if (request.method !== "GET" && request.method !== "PUT") {
    return errorResponse("Method Not Allowed", 405);
  }
  
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const key = searchParams.get('key');

  if (!key) {
    return errorResponse("Missing 'key' query parameter", 400);
  }

  const ALLOWED_KEYS = ["sponsors", "horses", "members"];

  if (!ALLOWED_KEYS.includes(key)) {
    return errorResponse(`Invalid key: ${key}`, 400);
  }

  if (request.method == "GET") {
    const res = await DataService.instance.fetchData(key);
    const data = JSON.parse(res);
    return jsonResponse(data, 200);

  } else {

    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return errorResponse("Invalid data format", 400);
    }

    await DataService.instance.putData(key, JSON.stringify(body));
    return jsonResponse({ message: "Data updated successfully" }, 201);
  }
}