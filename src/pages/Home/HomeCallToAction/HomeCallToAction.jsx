import { Link } from "react-router";

const HomeCallToAction = () => (
    <section className="px-4 py-14">
        <div className="max-w-5xl mx-auto rounded-2xl bg-primary text-primary-content px-6 py-10 md:px-12 md:py-14 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to send a parcel?</h2>
            <p className="mt-3 max-w-2xl mx-auto">
                Start a booking, add pickup and delivery details, and review the delivery charge.
            </p>
            <Link to="/bookParcel" className="btn btn-secondary mt-6">
                Book a parcel
            </Link>
        </div>
    </section>
);

export default HomeCallToAction;
