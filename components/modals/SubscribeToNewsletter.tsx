"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useShowNewsletter from "@/hooks/useShowNewsletter";

const SubscribeNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { newsletterSigned, setNewsletterSigned } = useShowNewsletter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bool, setBool] = useState(false);

  async function subscribeToNewsLetter(): Promise<void> {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    if (!firstName) {
      toast.error("Please enter your first name!");
      return;
    }
    if (!lastName) {
      toast.error("Please enter your last name!");
      return;
    }
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
      }),
    };

    try {
      await fetch("/api/subscribe", options);
      setLoading(false);
      toast.success("Yay! you successfully subscribed to our newsletter!");
      setBool(false);
    } catch (error) {
      setLoading(false);
      toast.error("Oops! Something went wrong!");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setBool(!newsletterSigned);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={bool}
      onOpenChange={() => {
        setNewsletterSigned((prev) => !prev);
        setBool((prev) => !prev);
      }}
    >
      <DialogContent className="max-w-[95%] sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-[600] text-[18px] uppercase">
            Subscribe to Our Newsletter
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border w-full p-3"
            placeholder="First Name"
          />
        </div>
        <div className="flex flex-col  gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border w-full p-3"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-col  gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3"
            placeholder="Enter your email"
          />
        </div>
        <button
          aria-label="submit"
          onClick={subscribeToNewsLetter}
          className="bg-black barlow py-3 flex items-center justify-center uppercase w-[200px]  text-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Subscribe"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeNewsLetter;
