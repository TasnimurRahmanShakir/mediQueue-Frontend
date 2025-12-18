//app/actions/userAction.js
"use server";

import { api } from "@/app/service/api";
import { revalidatePath } from "next/cache";

// --- Fetching ---
export async function getUsers() {
  try {
    const response = await api.get("/Auth");
    return response?.result || [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

export async function searchUsers(param) {
  try {
    const response = await api.get(`/Auth/search/${param}`);
    return response?.result || [];
  } catch (error) {
    console.error("Failed to search users:", error);
    return [];
  }
}

export async function getUserById(userId) {
  try {
    const response = await api.get(`/Auth/${userId}`);
    return response?.result || null;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

// --- Mutations ---

export async function createUser(formData) {
  try {
    const cleanFormData = new FormData();

    console.log("Form Data from CreateUser", formData);

    for (const [key, value] of formData.entries()) {
      cleanFormData.append(key, value);
    }

    const response = await api.post("/Auth/register", cleanFormData);

    if (response?.result) {
      revalidatePath("/dashboard/admin/users");
      return {
        success: true,
        message: response.message,
        data: response.result,
      };
    }

    return {
      success: false,
      error: response?.message || "Unknown error occurred",
    };
  } catch (error) {
    const serverMessage = error.response?.data || error.message;
    return {
      success: false,
      error:
        typeof serverMessage === "string"
          ? serverMessage
          : "Registration failed",
    };
  }
}

export async function updateUser(userId, formData) {
  try {
    const dataToSend = new FormData();
    for (const key in formData) {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        key !== "doctorProfile" && // backend expects flat 'ConsultationFee', not nested
        key !== "receptionistProfile"
      ) {
        dataToSend.append(key, formData[key]);
      }
    }
    console.log("Data to send", dataToSend);
   

    const response = await api.put(`/Auth/edit/${userId}`, dataToSend);

    if (response?.result) {
      revalidatePath("/dashboard/admin/users");
      return { success: true, data: response.result };
    }
    return { success: false, error: response?.message || "Update failed" };
  } catch (error) {
    return { success: false, error: error.message || "Update failed" };
  }
}

export async function deleteUser(userId) {
  try {
    await api.del(`/Auth/delete/${userId}`);
    revalidatePath("/dashboard/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}
