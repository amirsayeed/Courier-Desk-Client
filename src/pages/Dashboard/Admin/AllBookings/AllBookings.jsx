import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading/Loading";
import AssignAgentModal from "./AssignAgentModal";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading parcels: {error.message}</p>;

  return (
    <div className="my-10">
      <div className="overflow-x-auto p-4 shadow-xl rounded-2xl">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Tracking ID</th>
              <th>Parcel Type</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No parcels found
                </td>
              </tr>
            )}
            {parcels.map((parcel, idx) => (
              <tr key={parcel._id} className="hover:bg-gray-50 text-center">
                <td>{idx + 1}</td>
                <td>{parcel.trackingId}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.paymentStatus || "Pending"}</td>
                <td>{parcel.deliveryStatus || "Pending"}</td>
                <td>
                  <label
                    htmlFor={parcel.deliveryStatus !== "Assigned" ? `assignModal-${parcel._id}` : undefined}
                    className={`btn btn-sm btn-primary ${
                      parcel.deliveryStatus === "Assigned" ? "btn-disabled cursor-not-allowed" : ""
                    }`}
                    style={{ pointerEvents: parcel.deliveryStatus === "Assigned" ? "none" : "auto" }}
                  >
                    Assign Agent
                  </label>

                  {parcel.deliveryStatus !== "Assigned" && (
                    <AssignAgentModal
                      parcelId={parcel._id}
                      deliveryStatus={parcel.deliveryStatus}
                      closeModalId={`assignModal-${parcel._id}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
