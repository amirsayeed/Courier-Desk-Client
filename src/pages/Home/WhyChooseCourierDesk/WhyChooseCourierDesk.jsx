import { CreditCard, ListChecks, ReceiptText } from "lucide-react";

const benefits = [
    {
        icon: <ListChecks size={36} className="text-primary" />,
        title: "Clear delivery updates",
        description: "See parcel status changes and their timestamps from your customer dashboard."
    },
    {
        icon: <ReceiptText size={36} className="text-primary" />,
        title: "Know the price upfront",
        description: "Review delivery charges based on parcel type, size, and delivery locations before booking."
    },
    {
        icon: <CreditCard size={36} className="text-primary" />,
        title: "Payment options",
        description: "Choose online payment or Cash on Delivery when placing an eligible parcel booking."
    }
];

const WhyChooseCourierDesk = () => (
    <section className="px-4 py-16 bg-primary/5">
        <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl font-bold text-neutral">Why choose CourierDesk?</h2>
                <p className="mt-3 text-base-content">
                    Helpful tools make it easier to book a delivery and stay informed along the way.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {benefits.map((benefit) => (
                    <article
                        key={benefit.title}
                        className="card bg-base-100 border border-primary/30 shadow-md rounded-2xl"
                    >
                        <div className="card-body items-center text-center">
                            {benefit.icon}
                            <h3 className="card-title mt-2">{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

export default WhyChooseCourierDesk;
