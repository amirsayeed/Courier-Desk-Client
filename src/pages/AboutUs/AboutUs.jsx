import { Link } from "react-router";

const AboutUs = () => (
    <main className="max-w-5xl mx-auto px-6 py-16">
        <section className="text-center max-w-3xl mx-auto">
            <p className="font-semibold text-primary">About CourierDesk</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">A clearer way to manage parcel delivery</h1>
            <p className="mt-5 text-lg text-base-content/80">
                CourierDesk is a parcel booking and delivery management platform. It brings booking
                details, payment choices, and delivery status updates together in one place.
            </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mt-12">
            <article className="p-6 rounded-2xl border border-primary/30 bg-base-100 shadow-sm">
                <h2 className="text-xl font-bold">For customers</h2>
                <p className="mt-3 text-base-content/80">
                    Create parcel bookings and view your parcels and their delivery progress from your dashboard.
                </p>
            </article>
            <article className="p-6 rounded-2xl border border-primary/30 bg-base-100 shadow-sm">
                <h2 className="text-xl font-bold">For delivery agents</h2>
                <p className="mt-3 text-base-content/80">
                    View assigned parcels and record delivery status updates as work progresses.
                </p>
            </article>
            <article className="p-6 rounded-2xl border border-primary/30 bg-base-100 shadow-sm">
                <h2 className="text-xl font-bold">For administrators</h2>
                <p className="mt-3 text-base-content/80">
                    Manage bookings and assign parcels to delivery agents through the dashboard.
                </p>
            </article>
        </section>

        <div className="text-center mt-10">
            <Link to="/bookParcel" className="btn btn-primary">Book a parcel</Link>
        </div>
    </main>
);

export default AboutUs;
