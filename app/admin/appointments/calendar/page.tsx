"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function AppointmentCalendar() {

  const [date, setDate] = useState<Date | null>(new Date());
  const [appointments, setAppointments] = useState<any[]>([]);

  const loadAppointments = async (selectedDate: Date) => {

    const formatted = selectedDate.toISOString();

    const res = await fetch(`/api/admin/appointments/by-date?date=${formatted}`);
    const data = await res.json();

    setAppointments(data);
  };

  useEffect(() => {
    if (date) {
      loadAppointments(date);
    }
  }, [date]);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Appointment Calendar
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* CALENDAR */}
        <div>
          <Calendar
            onChange={(value) => setDate(value as Date)}
            value={date}
          />
        </div>

        {/* APPOINTMENTS */}
        <div>

          <h2 className="text-xl font-semibold mb-4">
            Appointments
          </h2>

          {appointments.length === 0 && (
            <p>No appointments for this date</p>
          )}

          {appointments.map((a) => (

            <div
              key={a.id}
              className="border p-4 mb-3 bg-white shadow"
            >
              <p><b>Name:</b> {a.name}</p>
              <p><b>Phone:</b> {a.phone}</p>
              <p><b>Email:</b> {a.email}</p>
              <p><b>Status:</b> {a.status}</p>
              <p><b>Message:</b> {a.message}</p>
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}