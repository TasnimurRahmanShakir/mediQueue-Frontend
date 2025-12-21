"use server";

import { api } from "@/app/service/api";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData) {
  try {
    const response = await api.post("/Appointment/book", formData);
    if (response?.result) {
      revalidatePath("/dashboard/receptionist");
      return { success: true, data: response.result };
    }
    return {
      success: false,
      error: response?.message || "Failed to book appointment",
    };
  } catch (error) {
    console.error("Create Appointment Error:", error);
    return { success: false, error: "An error occurred while booking." };
  }
}

export async function searchSpecializations(query) {
  try {
    const response = await api.get(`/Doctor/departments/${query}`);

    if (response?.result && Array.isArray(response.result)) {
      return { success: true, data: response.result };
    }

    return { success: false, data: [] };
  } catch (error) {
    console.error("Search Specializations Error:", error);
    return { success: false, data: [], error: error.message };
  }
}

export async function getDoctorAvailableSlots(doctorId, date) {
  try {
    const response = await api.get(
      `/Appointment/slots?doctorId=${doctorId}&date=${date}`
    );

    if (response?.result) {
      return { success: true, data: response.result };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error("Get Slots Error:", error);
    return { success: false, error: "Failed to fetch slots" };
  }
}

export async function searchPatient(param) {
  try {
    const response = await api.get(`/Patient/search/${param}`);
    if (response?.result) {
      return { success: true, data: response.result };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error("Search Patient Error:", error);
    return { success: false, data: [], error: error.message };
  }
}
