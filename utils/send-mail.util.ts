import { toast } from "sonner";

export const sendEmail = async (emailData: {
  email: string;
  name: string;
  message: string;
}) => {
  try {
    const response = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      toast.success("We've received your email! Thank You!");
    } else {
      toast.error("Failed to send email");
    }
  } catch (err) {
    toast.error("Oops something bad happened!");
    console.log(err);
  }
};
