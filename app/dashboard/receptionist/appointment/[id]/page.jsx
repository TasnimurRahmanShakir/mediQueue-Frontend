import AppointmentDetailsClient from "./AppointmentDetailsClient";
import AppointmentBookingClient from "./AppointmentBookingClient";
import { getUsers } from "@/app/actions/userAction";

export default async function AppointmentDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);

  if (id === "new") {
    // Fetch doctors for the dropdown
    const users = await getUsers();
    const doctors = users.filter((user) => user.role === "Doctor");

    return <AppointmentBookingClient doctors={doctors} />;
  }

  // Ideally, fetch appointment data here. For now, we'll pass the ID to the client.
  // const appointment = await getAppointmentById(id);

  // Mock data to simulate the response structure
  const mockAppointment = {
    Id: id,
    Reason: "Regular Checkup",
    Status: "Scheduled",
    Schedule: new Date().toISOString(),
    CreatedAt: new Date().toISOString(),
    DoctorId: "doc-123",
    DoctorName: "Dr. Emily Carter",
    PatientId: "pat-456",
    PatientName: "John Doe",
  };

  return <AppointmentDetailsClient initialData={mockAppointment} id={id} />;
}
