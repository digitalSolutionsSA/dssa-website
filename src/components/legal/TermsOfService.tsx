
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>
            Last updated: April 14, 2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto pr-6">
          <div className="space-y-4 text-left">
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the services provided by Digital Solutions SA ("we," "our," or "us"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-lg font-semibold">2. Description of Services</h2>
            <p>
              Digital Solutions SA provides various digital services, including but not limited to web development, digital marketing, cybersecurity, and IT support services. The specific details, deliverables, timelines, and costs of services will be outlined in separate agreements or statements of work provided to clients.
            </p>

            <h2 className="text-lg font-semibold">3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information as required for service delivery.</li>
              <li>Maintain the confidentiality of any account credentials provided to you.</li>
              <li>Use our services only for lawful purposes and in accordance with these Terms.</li>
              <li>Not use our services to transmit harmful code or engage in activities that could damage, disable, or impair our services.</li>
              <li>Comply with all applicable laws and regulations while using our services.</li>
            </ul>

            <h2 className="text-lg font-semibold">4. Payment Terms</h2>
            <p>
              <strong>All payments must be made upfront before commencement of any work</strong>. Unless otherwise specified in a separate written agreement signed by an authorized representative of Digital Solutions SA, payment terms are as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A non-refundable deposit of 50% of the total project cost is required to secure your booking and begin work.</li>
              <li>The remaining 50% is due before the final deliverables are released or deployed.</li>
              <li>For ongoing services, payment is due in full before the beginning of each service period.</li>
              <li>Invoices are payable immediately upon receipt.</li>
              <li>Late payments may result in immediate suspension of services and accrual of late fees at 1.5% per month.</li>
            </ul>

            <h2 className="text-lg font-semibold">5. Refund Policy</h2>
            <p>
              <strong>All sales are final.</strong> Refund requests will only be considered under exceptional circumstances and are subject to investigation. The decision to issue a refund is at the sole discretion of Digital Solutions SA. Approved refunds may take up to 30 business days to process. 
            </p>
            <p>
              No refunds will be provided for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Services already delivered or partially completed</li>
              <li>Changes to project requirements after work has commenced</li>
              <li>Client-caused delays or cancellations</li>
              <li>Issues resulting from third-party services or platforms</li>
            </ul>

            <h2 className="text-lg font-semibold">6. Intellectual Property Rights</h2>
            <p>
              Unless otherwise specified in a separate agreement, we retain all rights, title, and interest in and to our services, including all intellectual property rights. Any materials, designs, or code specifically created for you become your property only upon full payment and as specified in project agreements.
            </p>
            <p>
              You retain ownership of your content and materials provided to us for use in delivering our services. By providing such content, you grant us a license to use, reproduce, and display the content as necessary to provide the services.
            </p>

            <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
            <p>
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, DIGITAL SOLUTIONS SA SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES WHATSOEVER, INCLUDING BUT NOT LIMITED TO</strong> any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use our services;</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein;</li>
              <li>Any interruption or cessation of transmission to or from our services;</li>
              <li>Any bugs, viruses, or other harmful code that may be transmitted to or through our services by any third party;</li>
              <li>The content or conduct of any third party on our services.</li>
            </ul>
            <p>
              <strong>IN NO EVENT SHALL THE TOTAL LIABILITY OF DIGITAL SOLUTIONS SA EXCEED THE AMOUNT YOU HAVE PAID US IN THE PREVIOUS SIX (6) MONTHS, OR ONE HUNDRED DOLLARS ($100) IF NO SUCH PAYMENTS HAVE BEEN MADE.</strong>
            </p>

            <h2 className="text-lg font-semibold">8. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Digital Solutions SA and its employees, contractors, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of our services or your violation of these Terms.
            </p>

            <h2 className="text-lg font-semibold">9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms of Service. All provisions of the Terms which by their nature should survive termination shall survive termination.
            </p>

            <h2 className="text-lg font-semibold">10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in Gauteng, South Africa.
            </p>

            <h2 className="text-lg font-semibold">11. No Warranty</h2>
            <p>
              <strong>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</strong> We do not guarantee that the services will be uninterrupted, secure, or error-free, or that defects will be corrected.
            </p>

            <h2 className="text-lg font-semibold">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. It is your responsibility to review these Terms periodically for changes. Your continued use of our services following the posting of any changes constitutes acceptance of those changes.
            </p>

            <h2 className="text-lg font-semibold">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us via our contact form or WhatsApp.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
