"use server";

import { api } from "@/app/service/api";
import { getSession } from "@/app/lib/session";

export async function getDoctorAppointments(filterType) {
  console.log(filterType);
  try {
    const session = await getSession();
    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Unauthorized" };
    }

    console.log(session.user.doctorProfile.id);
    const doctorId = session.user.doctorProfile.id;
    
      const response = await api.get("/Patient", {
        params: {
          filter: filterType,
          doctorId: doctorId,
        },
      });
    

    if (response?.result) {
      return { success: true, data: response.result};
    }

    return {
      success: false,
      error: response?.message || "Failed to fetch appointments",
    };
  } catch (error) {
    console.error("Get Doctor Appointments Error:", error);
    return {
      success: false,
      error: "An error occurred while fetching appointments.",
    };
  }
}
