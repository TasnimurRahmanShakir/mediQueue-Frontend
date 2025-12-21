"use server";

import { api } from "@/app/service/api";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData) {
  try {
    const response = await api.post("/Appointment", formData);
    if (response?.isSuccess) {
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

export async function getDoctorsByDepartment(department) {
  try {
    const response = await api.get("/Auth");
    if (response?.result) {
      const doctors = response.result.filter(
        (user) =>
          user.role === "Doctor" &&
          user.doctorProfile?.specialization?.toLowerCase() ===
            department.toLowerCase()
      );
      return { success: true, data: doctors };
    }
    return { success: false, data: [] };
  } catch (error) {
    console.error("Get Doctors Error:", error);
    return { success: false, error: "Failed to fetch doctors" };
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
