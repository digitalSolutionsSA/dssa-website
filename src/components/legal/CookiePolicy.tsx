
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CookiePolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cookie Policy</DialogTitle>
          <DialogDescription>
            Last updated: April 14, 2025
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto pr-6">
          <div className="space-y-4 text-left">
            <h2 className="text-lg font-semibold">1. Introduction</h2>
            <p>
              This Cookie Policy explains how Digital Solutions SA ("we", "us", or "our") uses cookies and similar technologies when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-lg font-semibold">2. What Are Cookies</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Digital Solutions SA) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>

            <h2 className="text-lg font-semibold">3. Types of Cookies We Use</h2>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
              <li><strong>Performance/Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
              <li><strong>Targeting/Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</li>
            </ul>

            <h2 className="text-lg font-semibold">4. How to Control Cookies</h2>
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-digital-teal hover:underline">http://www.aboutads.info/choices/</a> or <a href="http://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-digital-teal hover:underline">http://www.youronlinechoices.com</a>.
            </p>

            <h2 className="text-lg font-semibold">5. Cookies We Use</h2>
            <p>The specific cookies we use may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Session Cookies:</strong> These are temporary cookies that are deleted when you close your browser and help keep you logged in during your visit.</li>
              <li><strong>Persistent Cookies:</strong> These remain on your device for a specified period and are activated each time you visit our website.</li>
              <li><strong>Google Analytics:</strong> We use Google Analytics cookies to collect information about how visitors use our website. These cookies collect information such as the pages you visit and how many clicks you need to accomplish a task.</li>
              <li><strong>Social Media Cookies:</strong> These allow you to share content from our site on social media platforms and may also be used for advertising purposes.</li>
            </ul>

            <h2 className="text-lg font-semibold">6. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>

            <h2 className="text-lg font-semibold">7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us via our contact form on the website or via WhatsApp.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CookiePolicy;
