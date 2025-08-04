import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaCalendarDay, FaTimesCircle, FaMoneyBillWave, FaBoxOpen, FaCheckCircle, FaShippingFast } from "react-icons/fa";
import Loading from "../../../../components/Shared/Loading/Loading";


const DashboardStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading, isError } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;
  if (isError) return <p className="text-center text-red-500">Failed to load statistics.</p>;

  const { bookingsToday, inTransitParcels, deliveredParcels, failedDeliveries, codCollected, totalParcels } = stats;


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
        <FaCalendarDay className="text-4xl text-primary mb-2" />
        <h2 className="card-title text-lg">Bookings Today</h2>
        <p className="text-3xl font-bold">{bookingsToday}</p>
        </div>
    </div>

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
            <FaShippingFast className="text-3xl text-primary mb-2" />
            <h2 className="card-title text-lg">In Transit Parcels</h2>
            <p className="text-3xl font-bold text-primary">{inTransitParcels}</p>
        </div>
    </div>

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
            <FaCheckCircle className="text-3xl text-success mb-2" />
            <h2 className="card-title text-lg">Delivered Parcels</h2>
            <p className="text-3xl font-bold text-success">{deliveredParcels}</p>
        </div>
    </div>

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
        <FaTimesCircle className="text-3xl text-error mb-2" />
        <h2 className="card-title text-lg">Failed Deliveries</h2>
        <p className="text-3xl font-bold text-error">{failedDeliveries}</p>
        </div>
    </div>

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
        <FaMoneyBillWave className="text-3xl text-success mb-2" />
        <h2 className="card-title text-lg">COD Collected</h2>
        <p className="text-3xl font-bold text-success">৳{codCollected.toLocaleString()}</p>
        </div>
    </div>

    <div className="card bg-base-100 shadow-lg border-2 border-secondary">
        <div className="card-body items-center text-center">
        <FaBoxOpen className="text-4xl text-warning mb-2" />
        <h2 className="card-title text-lg">Total Parcels</h2>
        <p className="text-3xl font-bold">{totalParcels}</p>
        </div>
    </div>
    </div>

  );
};

export default DashboardStats;
