import React from 'react';
import { FaBox, FaFileAlt } from 'react-icons/fa';

const pricingData = [
  {
    type: "Document",
    icon: <FaFileAlt className="text-primary" />,
    size: "–",
    range: "Same District",
    base: 60,
    extra: 0,
    surcharge: 0,
    total: 60,
  },
  {
    type: "Document",
    icon: <FaFileAlt className="text-primary" />,
    size: "–",
    range: "Different District / Different Division",
    base: 80,
    extra: 0,
    surcharge: 0,
    total: 80,
  },
  {
    type: "Parcel",
    icon: <FaBox className="text-primary" />,
    size: "Medium (3kg)",
    range: "Same District",
    base: 110,
    extra: 0,
    surcharge: 0,
    total: 110,
  },
  {
    type: "Parcel",
    icon: <FaBox className="text-primary" />,
    size: "Large (5kg)",
    range: "Same District",
    base: 110,
    extra: 80,
    surcharge: 0,
    total: 190,
  },
  {
    type: "Parcel",
    icon: <FaBox className="text-primary" />,
    size: "Medium (3kg)",
    range: "Different District (Same Division)",
    base: 150,
    extra: 0,
    surcharge: 0,
    total: 150,
  },
  {
    type: "Parcel",
    icon: <FaBox className="text-primary" />,
    size: "Large (5kg)",
    range: "Different Division",
    base: 150,
    extra: 80,
    surcharge: 40,
    total: 270,
  },
];

const Pricing = () => {
  return (
    <div className="px-4 py-16">
      <div className='space-y-4'>
        <h2 className="text-3xl font-bold text-center text-neutral mb-4">
            Delivery Charges Overview
        </h2>
        <p className="text-center text-base text-base-content font-medium">
            Charges vary based on type, size, and delivery location. Here’s a sample breakdown:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {pricingData.map((item, index) => (
          <div
            key={index}
            className="bg-base-100 border border-primary shadow-xl p-6 rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="text-xl font-bold">{item.type}</h3>
            </div>
            <p className="text-base font-normal mb-1">
              <span className="font-medium">Size:</span> {item.size}
            </p>
            <p className="text-base font-normal mb-1">
              <span className="font-medium">Range:</span> {item.range}
            </p>
            <p className="text-base font-normal mb-1">
              <span className="font-medium">Base Cost:</span> ৳{item.base}
            </p>
            <p className="text-base font-normal mb-1">
              <span className="font-medium">Extra Weight Cost:</span> ৳{item.extra}
            </p>
            <p className="text-base font-normal mb-2">
              <span className="font-medium">Division Surcharge:</span> ৳{item.surcharge}
            </p>
            <hr className="border-primary my-2" />
            <p className="text-lg font-bold text-primary">
              Total: ৳{item.total}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-10 leading-relaxed">
        <span className="font-semibold">Note:</span> Extra weight charge is ৳40 per kg over 3kg. <br />
        A surcharge of ৳40 is added if the parcel crosses division boundaries. <br />
        <span className="font-medium">Final delivery charges are automatically calculated at checkout.</span>
      </p>
    </div>
  );
};

export default Pricing;
