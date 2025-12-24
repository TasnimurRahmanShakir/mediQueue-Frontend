import React from "react";
import DoctorDashboardClient from "./DoctorDashboardClient";
import { getDoctorAppointments } from "@/app/actions/doctorAction";

export default async function DoctorDashboardPage() {
  const result = await getDoctorAppointments("today");
  const appointments = result.success ? result.data : [];

  return <DoctorDashboardClient appointments={appointments} />;
}
