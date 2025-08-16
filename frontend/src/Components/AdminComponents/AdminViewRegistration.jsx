import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const API_URL = import.meta.env.VITE_API;
const AdminViewRegistration = () => {
  const { id } = useParams();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const exportToExcel = () => {
    // 1. Convert JSON to worksheet
    console.log(registrations);
    let count = 0;
    const filterRegistrations = registrations.map((i, index) => ({
      id: index + 1,
      fullName: i.fullName,
      Email: i.email,
      Department: i.department,
      Contact: i.phone,
      year: i.year,
      College: i.college,
    }));

    const worksheet = XLSX.utils.json_to_sheet(filterRegistrations);

    // 2. Create a new workbook
    const workbook = XLSX.utils.book_new();

    // 3. Append the worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 4. Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // 5. Create Blob and save
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "myData.xlsx");
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(`${API_URL}/event-registrations/${id}`);
      setRegistrations(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching registrations", err);
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (registration_id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this event?"))
        return;
      await axios.delete(`${API_URL}/deleteregistration/${registration_id}`);
      alert("Successfully Deleted Registration");
      fetchRegistrations();
    } catch (err) {
      console.error("Error Deleting Registration", err);
      if (err.response?.data?.error) {
        alert(`Error: ${err.response.data.error}`); // backend message
      } else {
        alert("Something went wrong while deleting the registration."); // fallback
      }
    }
  };
 

  return (
    <div className="p-6">
      <button
        className="mb-4 text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Student Registrations</h2>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>No registrations found for this event.</p>
      ) : (
        <>
          <div className="flex justify-between"> 
            <p className="mb-2 text-gray-600">
              Total Registrations: <strong>{registrations.length}</strong>
            </p>
            <div>
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer m-1"
              >
                Download Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">College</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg._id} className="text-center">
                    <td className="border px-4 py-2">{reg.fullName}</td>
                    <td className="border px-4 py-2">{reg.email}</td>
                    <td className="border px-4 py-2">{reg.department}</td>
                    <td className="border px-4 py-2">{reg.year}</td>
                    <td className="border px-4 py-2">{reg.phone}</td>
                    <td className="border px-4 py-2">{reg.college}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => {
                          handleDelete(reg._id);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminViewRegistration;
