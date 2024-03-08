"use client";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { sendEmail } from "@/utils/send-mail.util";
import { Loader2 } from "lucide-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("All fields are required");
    }
    setLoading(true);
    const emailData = {
      email: email.trim(),
      name: name.trim(),
      message: message.trim(),
    };
    sendEmail(emailData)
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="space-y-4 py-4">
      <h2 className="font-[600] text-[18px] uppercase">CONTACT FORM</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your Name"
            className="border w-full p-3"
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your Email"
            className="border w-full p-3"
          />
        </div>
        <div>
          <label>Message</label>
          <br />
          <textarea
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="border w-full p-3 min-h-[8lh]"
          />
        </div>
        <button
          type="submit"
          className="bg-black barlow py-3 flex items-center justify-center uppercase w-[200px] md:w-[300px] text-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : "  Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
