import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBox, FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading/Loading";

const TrackParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const urlTrackingId = searchParams.get("trackingId")?.trim().toUpperCase() || "";
    const [trackingInput, setTrackingInput] = useState(urlTrackingId);
    const [trackingId, setTrackingId] = useState(urlTrackingId);

    useEffect(() => {
        setTrackingInput(urlTrackingId);
        setTrackingId(urlTrackingId);
    }, [urlTrackingId]);

    const {
        data: parcel,
        isLoading,
        isFetching,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ["trackedParcel", user?.email, trackingId],
        queryFn: async () => {
            const response = await axiosSecure.get("/myparcels", {
                params: { email: user.email }
            });
            return response.data.find(
                (item) => item.trackingId?.toUpperCase() === trackingId
            ) || null;
        },
        enabled: Boolean(user?.email && trackingId),
        refetchInterval: 10000
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const normalizedTrackingId = trackingInput.trim();
        if (normalizedTrackingId) {
            const normalizedUppercaseId = normalizedTrackingId.toUpperCase();
            setSearchParams({ trackingId: normalizedUppercaseId });
            if (normalizedUppercaseId === trackingId) {
                void refetch();
            } else {
                setTrackingId(normalizedUppercaseId);
            }
        }
    };

    const formatStatus = (status = "") =>
        status.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

    const statusHistory = parcel
        ? [...(parcel.statusLogs || [])]
            .sort((first, second) =>
                new Date(first.timestamp).getTime() - new Date(second.timestamp).getTime()
            )
        : [];
    const trackableStatuses = new Set(["picked up", "in transit", "delivered", "failed"]);
    const hasBeenPickedUp = parcel && (
        trackableStatuses.has((parcel.deliveryStatus || "").replace(/_/g, " ").toLowerCase()) ||
        statusHistory.some((entry) =>
            trackableStatuses.has((entry.status || "").replace(/_/g, " ").toLowerCase())
        )
    );

    return (
        <div className="max-w-3xl mx-auto p-6 my-10">
            <section className="bg-base-100 border-2 border-secondary rounded-2xl shadow-md p-6">
                <h1 className="text-2xl font-bold mb-2">Track your parcel</h1>
                <p className="text-base-content/70 mb-6">
                    Enter the tracking ID from your booking to see its latest delivery status.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={trackingInput}
                        onChange={(event) => setTrackingInput(event.target.value)}
                        placeholder="e.g. PCL-20261107-ABCDE"
                        aria-label="Tracking ID"
                        className="input input-bordered w-full"
                        required
                    />
                    <button type="submit" className="btn btn-primary">
                        <FaSearch aria-hidden="true" />
                        Track parcel
                    </button>
                </form>
            </section>

            {isLoading && trackingId && <div className="mt-6"><Loading /></div>}

            {isError && (
                <p role="alert" className="mt-6 text-center text-error">
                    {error.response?.data?.error || "There was a problem loading your parcels. Please try again."}
                </p>
            )}

            {trackingId && !isLoading && !isError && !parcel && (
                <p className="mt-6 text-center text-base-content/70">
                    We couldn't find a parcel with that tracking ID in your account.
                </p>
            )}

            {parcel && !hasBeenPickedUp && (
                <p className="mt-6 text-center text-base-content/70">
                    Tracking updates will be available after this parcel has been picked up.
                </p>
            )}

            {parcel && hasBeenPickedUp && (
                <section className="mt-6 bg-base-100 border border-base-300 rounded-2xl shadow-md p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                            <p className="text-sm text-base-content/60">Tracking ID</p>
                            <p className="font-mono font-semibold">{parcel.trackingId}</p>
                        </div>
                        <div className="sm:text-right">
                            <p className="text-sm text-base-content/60">Current status</p>
                            <p className="badge badge-primary badge-lg mt-1">
                                {formatStatus(parcel.deliveryStatus || "Pending")}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-base-content">Parcel type</p>
                            <p className="font-medium">{parcel.parcelType || "Parcel"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-base-content">Route</p>
                            <p className="font-medium">
                                {parcel.pickupDistrict || "Pickup"} → {parcel.deliveryDistrict || "Delivery"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 mb-3">
                        <h2 className="text-lg font-semibold">Delivery updates</h2>
                        <span className="text-xs text-base-content/60">
                            {isFetching ? "Refreshing…" : "Updates automatically"}
                        </span>
                    </div>

                    {statusHistory.length > 0 ? (
                        <ol className="space-y-4">
                            {statusHistory.map((entry, index) => (
                                <li key={`${entry.status}-${entry.timestamp}-${index}`} className="flex gap-3">
                                    <span className="mt-1 text-primary"><FaBox aria-hidden="true" /></span>
                                    <div>
                                        <p className="font-medium">{formatStatus(entry.status)}</p>
                                        <p className="text-sm text-base-content/60">
                                            {entry.timestamp
                                                ? new Date(entry.timestamp).toLocaleString()
                                                : "Time unavailable"}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-sm text-base-content/70">
                            No delivery updates yet. Your parcel was booked
                            {parcel.createdAt ? ` on ${new Date(parcel.createdAt).toLocaleString()}` : ""}.
                        </p>
                    )}
                </section>
            )}
        </div>
    );
};

export default TrackParcel;