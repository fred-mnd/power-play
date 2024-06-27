import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="w-dvw">
      <div className="font-sans text-blue-900">
        <div className="relative h-[500px] overflow-hidden">
          <img 
            src="https://img.freepik.com/premium-photo/3d-rendering-creative-flat-lay-workspace-with-computer-digital-tablet-accessories-stationery-blue-background_67155-15127.jpg" 
            className="w-dvw object-cover brightness-[70%]" 
            alt="About Us Header" 
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-6xl text-white font-bold animate-fadeIn">About Us</h1>
          </div>
        </div>
        <section className="bg-[#ebf8ff] py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <h2 className="text-4xl font-bold mb-4 text-[#054569] animate-slideInLeft">Welcome to PowerPlay!</h2>
              <p className="text-lg mb-4 text-[#054569]">PowerPlay is an e-commerce platform dedicated to selling electronic accessories, especially mouse and keyboards. Our main feature is the ability to search and sort products based on their specifications, making it easy for users to find exactly what they need.</p>
              <p className="text-lg mb-4 text-[#054569]">With a wide range of electronic accessories, each with different specifications, it's crucial to have the right accessory for your needs. Our search features help you find the perfect match efficiently and effortlessly.</p>
              <Link 
                to="/catalog" 
                className="bg-[#054569] text-white py-2 px-4 rounded font-bold transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Explore Products
              </Link>
            </div>
            <div className="md:w-1/2 p-4">
              <img src="https://st2.depositphotos.com/1177973/8716/i/950/depositphotos_87166052-stock-photo-computer-peripherals-with-heart.jpg" className="w-full rounded animate-slideInRight" alt="PowerPlay Products" />
            </div>
          </div>
        </section>
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 p-4">
              <h2 className="text-4xl font-bold mb-4 text-[#054569] animate-slideInRight">Our Vision</h2>
              <p className="text-lg mb-4 text-gray-700">At PowerPlay, we strive to empower your tech experience by providing high-quality electronic accessories that meet your specific needs. Whether you're a gamer, a professional, or just someone who loves tech, we have something for everyone.</p>
              <p className="text-lg mb-4 text-gray-700">Our platform is designed to be user-friendly, ensuring a seamless shopping experience from start to finish. Join us on this journey to elevate your tech game!</p>
            </div>
            <div className="md:w-1/2 p-4">
              <img src="https://st2.depositphotos.com/4304307/44754/i/600/depositphotos_447543592-stock-photo-overhead-shot-woman-hands-using.jpg" className="w-full rounded animate-slideInLeft" alt="Our Vision" />
            </div>
          </div>
        </section>
        <section className="bg-[#ebf8ff] py-12">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-4">
              <h2 className="text-4xl font-bold mb-4 text-[#054569] animate-slideInLeft">Why Choose Us?</h2>
              <p className="text-lg mb-4 text-[#054569]">Our commitment to quality and customer satisfaction sets us apart from the rest. We offer a curated selection of top-notch electronic accessories, backed by excellent customer service and support.</p>
              <p className="text-lg mb-4 text-[#054569]">With PowerPlay, you can shop with confidence, knowing that you're getting the best products at competitive prices. Experience the difference with PowerPlay today!</p>
            </div>
            <div className="md:w-1/2 p-4">
              <img src="src/assets/about-us-3.png" className="w-full h-80 rounded animate-slideInRight" alt="Why Choose Us" />
            </div>
          </div>
        </section>
        <footer className="bg-[#054569] text-white py-6">
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

export default AboutUs;
