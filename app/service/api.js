// utils/api.js
import { getSession } from "../lib/session";

export const BASE_URL = "https://localhost:7232/api";
export const BASE_URL2 = "https://localhost:7232";

export const apiCall = async (
  endpoint,
  { method = "GET", body, headers = {}, params } = {}
) => {
  let url = `${BASE_URL}${endpoint}`;

  const session = await getSession();
  const token = session?.token;
  // 2. Configure Headers
  const config = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body instanceof FormData) {
    // Let browser set Content-Type for FormData
    config.body = body;
  } else {
    config.headers["Content-Type"] = "application/json";
    if (body) {
      config.body = JSON.stringify(body);
    }
  }


  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage = "Unable to fetch data";

      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        errorMessage = await response.text();
      }

      return { error: errorMessage };
    }

    const data = await response.json();
    console.log("data" + data);

    return data;
  } catch (error) {
    console.error("API Call Failed:", error.message);
    throw error;
  }
};

// --- Convenience Methods (Optional) ---

export const api = {
  get: (endpoint, params, headers) =>
    apiCall(endpoint, { method: "GET", params, headers }),
  post: (endpoint, body, headers) =>
    apiCall(endpoint, { method: "POST", body, headers }),
  put: (endpoint, body, headers) =>
    apiCall(endpoint, { method: "PUT", body, headers }),
  del: (endpoint, headers) => apiCall(endpoint, { method: "DELETE", headers }),
};
