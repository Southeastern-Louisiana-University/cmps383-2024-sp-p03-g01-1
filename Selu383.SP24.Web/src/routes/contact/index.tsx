import React, { useState } from 'react';
import "./contact.css";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to send email (e.g., using a backend service or Formspree)
    // After sending email, you can display a success message or redirect the user
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <div>
        <h5>For inquiries, please fill out the form below or contact us at:</h5>
        <h5>Phone: +1234567890</h5>
      </div>
      {!submitted ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange}></textarea>
          </div>
          <button className="btn rounded-pill contact-btn-custom" type="submit">Submit</button>
        </form>
      ) : (
        <p>Thank you for your message! We will get back to you soon.</p>
      )}
    </div>
  );
};

export default ContactUs;
