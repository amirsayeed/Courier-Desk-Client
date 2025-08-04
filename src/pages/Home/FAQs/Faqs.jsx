import React from 'react';

const faqs = [
  {
    id: 1,
    question: 'How do I create an account?',
    answer:
      'Click the "Sign Up" button in the top right corner and follow the registration process.',
  },
  {
    id: 2,
    question: 'I forgot my password. What should I do?',
    answer:
      'Click on "Forgot Password" on the login page and follow the instructions sent to your email.',
  },
  {
    id: 3,
    question: 'How do I update my profile information?',
    answer:
      'Go to "My Account" settings and select "Edit Profile" to make changes.',
  },
  {
    id: 4,
    question: 'How do I book a parcel?',
    answer:
      'Once logged in, click "Book a Parcel", fill out pickup and delivery info, and confirm the booking.',
  },
  {
    id: 5,
    question: 'Can I choose payment method for each parcel?',
    answer:
      'Yes, you can select Cash on Delivery (COD) or pay online via Stripe during parcel booking.',
  },
  {
    id: 6,
    question: 'How do I track my parcel?',
    answer:
      'Go to the "Track Parcel" page, enter your tracking ID, and follow real-time updates on delivery status.',
  },
  {
    id: 7,
    question: 'What areas does CourierDesk cover?',
    answer:
      'We currently support all districts under Dhaka and Chattogram divisions, with more coming soon.',
  },
];


const Faqs = () => {
  return (
     <div className="my-10">
      <div className="max-w-5xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-neutral">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="collapse collapse-plus bg-base-100 border border-primary shadow"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-lg font-bold">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base font-medium">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
