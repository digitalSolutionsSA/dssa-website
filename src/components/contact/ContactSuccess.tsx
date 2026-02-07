
import React from "react";
import { CheckCircle2 } from "lucide-react";

const ContactSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="inline-flex items-center justify-center p-4 bg-digital-teal/20 rounded-full mb-6">
        <CheckCircle2 className="h-10 w-10 text-digital-teal" />
      </div>
      <h4 className="text-xl font-bold text-white mb-2">Message Received!</h4>
      <p className="text-gray-300">Thank you for reaching out. We'll get back to you shortly.</p>
    </div>
  );
};

export default ContactSuccess;
