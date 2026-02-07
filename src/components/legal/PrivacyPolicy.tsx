
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>
            Last updated: April 14, 2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto pr-6">
          <div className="space-y-4 text-left">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              Digital Solutions SA ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>

            <h2 className="text-lg font-semibold">2. Information We Collect</h2>
            <p>We may collect several types of information from and about users of our website, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identifiable information (such as name, email address, phone number) that you voluntarily provide when contacting us or using our services.</li>
              <li>Technical data (such as IP address, browser type, device information) collected automatically when you visit our website.</li>
              <li>Usage data about how you interact with our website and services.</li>
              <li>Marketing and communications data including your preferences in receiving marketing from us.</li>
            </ul>

            <h2 className="text-lg font-semibold">3. How We Use Your Information</h2>
            <p>We may use the information we collect from you for various purposes, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and services.</li>
              <li>Improve and personalize your experience on our website.</li>
              <li>Respond to your inquiries and fulfill your requests.</li>
              <li>Send administrative information, such as updates, security alerts, and support messages.</li>
              <li>Send marketing communications (with your consent where required by law).</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our website.</li>
              <li>Detect, prevent, and address technical issues.</li>
            </ul>

            <h2 className="text-lg font-semibold">4. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>

            <h2 className="text-lg font-semibold">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2 className="text-lg font-semibold">6. Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Digital Solutions SA. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>

            <h2 className="text-lg font-semibold">7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following data protection rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access, update, or delete your personal information.</li>
              <li>The right to rectification if your information is inaccurate or incomplete.</li>
              <li>The right to object to our processing of your personal data.</li>
              <li>The right to request restriction of processing your personal information.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent where we are relying on consent to process your personal data.</li>
            </ul>

            <h2 className="text-lg font-semibold">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>

            <h2 className="text-lg font-semibold">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via our contact form on the website or via WhatsApp.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
