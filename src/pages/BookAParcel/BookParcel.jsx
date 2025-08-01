import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure'
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const districtsData = [
  // Dhaka Division
  { division: "Dhaka", district: "Dhaka" },
  { division: "Dhaka", district: "Gazipur" },
  { division: "Dhaka", district: "Narayanganj" },
  { division: "Dhaka", district: "Tangail" },
  { division: "Dhaka", district: "Kishoreganj" },

  // Chattogram Division
  { division: "Chattogram", district: "Chattogram" },
  { division: "Chattogram", district: "Cox's Bazar" },
  { division: "Chattogram", district: "Comilla" },
  { division: "Chattogram", district: "Feni" },
  { division: "Chattogram", district: "Noakhali" }
];


const BookParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };


  const pickupDivision = watch("pickupDivision");
  const deliveryDivision = watch("deliveryDivision");
  const parcelType = watch("parcelType");

  const getDistricts = (division) =>
    districtsData.filter(d => d.division === division).map(d => d.district);

  const onSubmit = async (data) => {
    const { parcelType, parcelSize, pickupDivision, pickupDistrict, deliveryDivision, deliveryDistrict, paymentMethod } = data;

    const isSameDistrict = pickupDistrict === deliveryDistrict;
    const isSameDivision = pickupDivision === deliveryDivision;

    let totalCost = 0, baseCost = 0, extraCost = 0, surcharge = 0;
    let weightValue = 1;
    if (parcelSize === "Medium") weightValue = 3;
    else if (parcelSize === "Large") weightValue = 5;

    if (parcelType === "Document") {
      totalCost = isSameDistrict ? 60 : 80;
    } else {
      baseCost = isSameDistrict ? 110 : 150;
      if (weightValue > 3) {
        extraCost = (weightValue - 3) * 40;
      }
      if (!isSameDivision) {
        surcharge = 40;
      }
      totalCost = baseCost + extraCost + surcharge;
    }

    const result = await Swal.fire({
      title: "Confirm Parcel Booking",
      html: `Total Cost: ৳${totalCost} <br/> Payment Type: ${paymentMethod}`,
      icon: "info",
      showDenyButton: true,
      confirmButtonText: paymentMethod === "Prepaid" ? "Proceed to Payment" : "Confirm Booking",
      denyButtonText: "Edit Info"
    });

    if (result.isConfirmed) {
      const parcelData = {
        ...data,
        totalCost,
        trackingId: generateTrackingID(),
        paymentStatus: paymentMethod === "COD" ? "unpaid" : "paid",
        deliveryStatus: "not_collected",
        createdAt: new Date().toISOString()
      };

      if (paymentMethod === "COD") {
        const res = await axiosSecure.post("/parcels", parcelData);
        if (res?.data?.insertedId) {
          Swal.fire("Success!", "Parcel booked. Pay at delivery.", "success");
        }
      } else {
        navigate('/');
      }
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-10">
      <h2 className="text-2xl font-bold mb-4">Book a Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <h3 className="font-semibold mb-2">Pickup Address</h3>
          <input {...register("senderName")} defaultValue={user?.displayName || ""} readOnly className="input input-bordered w-full mb-2" />
          <input {...register("pickupPhone")} placeholder="Phone" className="input input-bordered w-full mb-2" required />
          <input {...register("senderEmail")} defaultValue={user?.email || ""}  placeholder="Email" className="input input-bordered w-full mb-2" required />
          <select {...register("pickupDivision")} className="select select-bordered w-full mb-2" required>
            <option value="">Select Division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
          <select {...register("pickupDistrict")} className="select select-bordered w-full mb-2" required>
            <option value="">Select District</option>
            {getDistricts(pickupDivision).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input {...register("pickupArea")} placeholder="Area" className="input input-bordered w-full mb-2" required />
          <input {...register("pickupAddress")} placeholder="Street Address" className="input input-bordered w-full" required />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <input {...register("deliveryName")} placeholder="Recipient Name" className="input input-bordered w-full mb-2" required />
          <input {...register("deliveryPhone")} placeholder="Phone" className="input input-bordered w-full mb-2" required />
          <input {...register("deliveryEmail")} placeholder="Email" className="input input-bordered w-full mb-2" required />
          <select {...register("deliveryDivision")} className="select select-bordered w-full mb-2" required>
            <option value="">Select Division</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
          <select {...register("deliveryDistrict")} className="select select-bordered w-full mb-2" required>
            <option value="">Select District</option>
            {getDistricts(deliveryDivision).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input {...register("deliveryArea")} placeholder="Area" className="input input-bordered w-full mb-2" required />
          <input {...register("deliveryAddress")} placeholder="Street Address" className="input input-bordered w-full" required />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select {...register("parcelType")} className="select select-bordered w-full" required>
            <option value="">Parcel Type</option>
            <option value="Document">Document</option>
            <option value="Non-Document">Non-Document</option>
          </select>
          <select
            {...register("parcelSize")}
            className={`select select-bordered w-full transition-all duration-200
              ${parcelType !== "Non-Document" ? "bg-base-100 text-base-content opacity-30 cursor-not-allowed" : ""}
            `}
            disabled={parcelType !== "Non-Document"}
            required={parcelType === "Non-Document"}
          >
            <option value="">Select a Type</option>
            <option value="Small">Small (0-1kg)</option>
            <option value="Medium">Medium (1-3kg)</option>
            <option value="Large">Large (3kg+)</option>
          </select>
          <select {...register("paymentMethod")} className="select select-bordered w-full" required>
            <option value="">Payment Method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="Prepaid">Prepaid</option>
          </select>
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="btn btn-primary">Book Now</button>
        </div>
      </form>
    </div>

  );
};

export default BookParcel;
