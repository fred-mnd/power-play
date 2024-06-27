import React, { useState } from "react";
import { Link } from "react-router-dom";

const Support = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section: any) => {
    setActiveSection(section);
  };

  return (
    <div className="w-dvw">
      <div className="font-sans text-blue-900">
        <div className="relative h-[450px] overflow-hidden">
          <img 
            src="src/assets/support-header.jpg" 
            className="w-dvw h-full object-cover"
            alt="Support Header" 
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-6xl text-[#0D4274] font-bold animate-fadeIn text-shadow-custom">Support</h1>
          </div>
        </div>
        <section className="bg-[#ebf8ff] py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#0D4274] animate-slideInLeft">How Can We Help?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-10">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 md:mr-4 animate-slideInLeft">
                <h3 className="text-2xl font-bold mb-4 text-[#0D4274]">FAQs</h3>
                <p className="text-lg mb-4 text-gray-700">Find answers to the most frequently asked questions. If you have a question, just click our FAQ section. It covers a wide range of topics to help you out.</p>
                <button onClick={() => handleSectionClick("faq")} className="bg-[#0D4274] text-white py-2 px-4 rounded-full font-bold transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Go to FAQs
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 md:mb-0 md:mr-4 animate-slideInRight">
                <h3 className="text-2xl font-bold mb-4 text-[#0D4274]">Contact Us</h3>
                <p className="text-lg mb-4 text-gray-700">Get in touch with our support team for personalized assistance. Whether you have a question or need help, our support team is here to assist you.</p>
                <button onClick={() => handleSectionClick("contact")} className="bg-[#0D4274] text-white py-2 px-4 rounded-full font-bold transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>

        {activeSection === "faq" && (
          <section className="bg-[#ebf8ff] py-5">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6 text-[#0D4274]">FAQs</h2>
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">What types of electronic accessories does PowerPlay sell?</h3>
                <p className="text-lg mb-4 text-gray-700">Currently, PowerPlay specializes in selling mice and keyboards.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">How can I search for products on PowerPlay?</h3>
                <p className="text-lg mb-4 text-gray-700">You can filter products based on various specifications, such as specific features and technical details. Searching by product name is not available.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">Can I sort products by their specifications?</h3>
                <p className="text-lg mb-4 text-gray-700">Yes, you can sort products based on their specifications to find the perfect match for your needs.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">Are the product specifications detailed on the product pages?</h3>
                <p className="text-lg mb-4 text-gray-700">Yes, each product page includes comprehensive details about the specifications and features of the item.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">Do you offer any warranty on your products?</h3>
                <p className="text-lg mb-4 text-gray-700">Yes, all our products come with a manufacturer’s warranty. The duration and terms vary depending on the product and brand.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">What is the return policy for purchased products?</h3>
                <p className="text-lg mb-4 text-gray-700">We offer a 30-day return policy for most products. Items must be returned in their original condition. For more details, please visit our Return Policy page.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">How can I track my order?</h3>
                <p className="text-lg mb-4 text-gray-700">Once your order is shipped, you will receive a tracking number via email. You can use this number on our website to track your order’s status.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">What payment methods are accepted on PowerPlay?</h3>
                <p className="text-lg mb-4 text-gray-700">Currently, we only accept integrated money as our payment method.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">Does PowerPlay offer customer support?</h3>
                <p className="text-lg mb-4 text-gray-700">Yes, our customer support team is available via email, phone, and live chat to assist you with any queries or issues.</p>

                <h3 className="text-2xl font-semibold mb-4 text-[#0D4274]">Can I leave reviews for products I’ve purchased?</h3>
                <p className="text-lg mb-4 text-gray-700">At the moment, PowerPlay does not have a review feature. We plan to introduce this feature in the future.</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === "contact" && (
          <section className="bg-[#ebf8ff] py-5">
            <div className="max-w-6xl mx-auto px-4">
              <h3 className="text-3xl font-bold mb-4 text-[#0D4274]">Contact Us</h3>
              <p className="text-lg mb-4 text-gray-700">Get in touch with our support team for personalized assistance.</p>
              <p className="text-lg mb-4 text-gray-700">Email: support@powerplay.com</p>
              <p className="text-lg mb-4 text-gray-700">Phone: +123 456 7890</p>
              <p className="text-lg mb-4 text-gray-700">WhatsApp: +123 456 7890</p>
              <p className="text-lg mb-4 text-gray-700">Instagram: @powerplay</p>
            </div>
          </section>
        )}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#0D4274] animate-slideInRight">Customer Support</h2>
            <p className="text-lg mb-6 text-gray-700">We are here to help you 24/7. Reach out to us anytime, and we'll be happy to assist you with any issues or questions you may have.</p>
            <Link to="/contact" className="bg-[#0D4274] text-white py-2 px-6 rounded-full font-bold transition-transform duration-300 ease-in-out transform hover:scale-105">
              Contact Us Now
            </Link>
          </div>
        </section>
        <footer className="bg-[#0D4274] text-white py-6">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2024 PowerPlay. All rights reserved.</p>
            <div className="mt-2">
              <Link to="/privacy" className="underline">Privacy Policy</Link> | <Link to="/terms" className="underline">Terms of Service</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Support;
