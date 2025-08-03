import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Shared/Loading/Loading";


const AssignedParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const agentEmail = user?.email;

  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ["assignedParcels", agentEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentassignedparcels?email=${agentEmail}`);
      return res.data;
    },
    enabled: !!agentEmail,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-red-600">Error loading parcels: {error.message}</p>;

  return (
    <div className="my-10">
        <h2 className="mb-4 font-medium text-xl">All Assigned Parcels</h2>
        <div className="overflow-x-auto p-4 shadow-xl rounded-2xl">
        <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th>Tracking ID</th>
            <th>Parcel Type</th>
            <th>Pickup Address</th>
            <th>Delivery Address</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No assigned parcels found.
              </td>
            </tr>
          ) : (
            parcels.map((parcel) => (
              <tr key={parcel._id} className="text-center">
                <td>{parcel.trackingId}</td>
                <td>{parcel.parcelType}</td>
                <td>
                  <strong>{parcel.pickupDistrict}</strong><br />
                  {parcel.pickupArea}<br />
                  <small>{parcel.pickupAddress}</small>
                </td>
                <td>
                  <strong>{parcel.deliveryDistrict}</strong><br />
                  {parcel.deliveryArea}<br />
                  <small>{parcel.deliveryAddress}</small>
                </td>
                <td>{parcel.paymentStatus || "Pending"}</td>
                <td>{parcel.deliveryStatus}</td>
                <td><button className="btn btn-primary">Update</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AssignedParcels;
