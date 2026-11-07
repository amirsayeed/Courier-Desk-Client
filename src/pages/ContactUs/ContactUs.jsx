import Swal from "sweetalert2";

const ContactUs = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        await Swal.fire({
            icon: "success",
            title: "Thank you!",
            text: "You will be contacted soon."
        });
        form.reset();
    };

    return (
        <main className="max-w-3xl mx-auto px-6 py-16">
            <section className="text-center mb-8">
                <p className="font-semibold text-primary">Contact</p>
                <h1 className="text-3xl md:text-4xl font-bold mt-2">How can we help?</h1>
                <p className="mt-3 text-base-content/80">
                    Send us a message about a booking or a question. Contact form delivery is not set up yet.
                </p>
            </section>

            <form onSubmit={handleSubmit} className="bg-base-100 border border-base-300 shadow-md rounded-2xl p-6 md:p-8 space-y-4">
                <div>
                    <label htmlFor="contact-name" className="label font-medium">Name</label>
                    <input id="contact-name" name="name" autoComplete="name" className="input input-bordered w-full" required />
                </div>
                <div>
                    <label htmlFor="contact-email" className="label font-medium">Email</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" className="input input-bordered w-full" required />
                </div>
                <div>
                    <label htmlFor="contact-message" className="label font-medium">Message</label>
                    <textarea id="contact-message" name="message" rows="5" className="textarea textarea-bordered w-full" required />
                </div>
                <button type="submit" className="btn btn-primary">Send message</button>
            </form>
        </main>
    );
};

export default ContactUs;
