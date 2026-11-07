import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading/Loading";
import { Link } from "react-router";

const trackableStatuses = new Set(["picked up", "in transit", "delivered", "failed"]);

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, error } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get("/myparcels", {
        params: { email: user.email },
        });
        return res.data;
    },
      enabled: !!user?.email,
    }
  );

  if (isLoading) return <Loading/>;
  if (error){
    return <p>Error loading parcels.</p>
  } 

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 border-2 border-secondary rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Booked Parcels</h2>
      {parcels.length === 0 ? (
        <p>You have no parcels booked yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Parcel Type</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => {
                const {
                  _id,
                  trackingId,
                  parcelType,
                  paymentStatus,
                  deliveryStatus,
                  statusLogs = [],
                  createdAt
                } = parcel;
                const currentStatus = (deliveryStatus || "").replace(/_/g, " ").toLowerCase();
                const hasBeenPickedUp = trackableStatuses.has(currentStatus) ||
                  statusLogs.some((log) =>
                    trackableStatuses.has((log.status || "").replace(/_/g, " ").toLowerCase())
                  );

                return (
                  <tr key={_id.$oid || _id}>
                    <td className="font-mono">
                      {trackingId}
                      {hasBeenPickedUp && (
                        <Link
                          to={`/dashboard/track?trackingId=${encodeURIComponent(trackingId)}`}
                          className="link link-primary ml-3 font-sans"
                        >
                          Track
                        </Link>
                      )}
                    </td>
                    <td>{parcelType}</td>
                    <td className={paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                      {paymentStatus}
                    </td>
                    <td>{(deliveryStatus || "Pending").replace(/_/g, " ")}</td>
                    <td>{new Date(createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
