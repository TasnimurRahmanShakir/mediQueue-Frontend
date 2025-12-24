// utils/api.js
import { getSession } from "@/app/lib/session"; 

export const BASE_URL = "https://localhost:7232/api";
export const BASE_URL2 = "https://localhost:7232";

export const apiCall = async (
  endpoint,
  { method = "GET", body, headers = {}, params } = {}
) => {
  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const session = await getSession();
  const token = session?.token;

  const config = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body instanceof FormData) {
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
    return data;
  } catch (error) {
    console.error("API Call Failed:", error.message);
    throw error;
  }
};

export const api = {
  get: (endpoint, options = {}) =>
    apiCall(endpoint, { method: "GET", ...options }),

  post: (endpoint, body, options = {}) =>
    apiCall(endpoint, { method: "POST", body, ...options }),

  put: (endpoint, body, options = {}) =>
    apiCall(endpoint, { method: "PUT", body, ...options }),

  del: (endpoint, options = {}) =>
    apiCall(endpoint, { method: "DELETE", ...options }),
};
