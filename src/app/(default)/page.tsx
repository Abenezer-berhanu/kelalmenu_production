import React from "react";
import Link from "next/link";
import Image from "next/image";
import { links, constants, images, basic_info } from "@/lib/exporter";
import { Button } from "@/components/ui/button";

async function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Landing Section */}
      <section
        id="home"
        className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero_bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Transform Your Restaurant Menu into a Digital QR Code
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Revolutionize your dining experience. Easily convert traditional
            menus to interactive digital QR code menus.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={links.register}>
              <Button className="p-5 font-bold">Get Your Digital Menu</Button>
            </Link>
            <Link href={links.about}>
              <Button className="p-5 font-bold">Learn more</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Services & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-qrcode"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Digital QR Menus
              </h3>
              <p className="text-gray-600">
                Convert your traditional paper menus into sleek, interactive
                digital menus accessible via QR codes.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-sync-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Unlimited Updates
              </h3>
              <p className="text-gray-600">
                Update your menu items, prices, and descriptions in real-time,
                as often as you need, without extra costs.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-user-plus"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Easy Owner Registration
              </h3>
              <p className="text-gray-600">
                Simple and quick registration process for restaurant and hotel
                owners to get started immediately.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Mobile-Friendly Access
              </h3>
              <p className="text-gray-600">
                Customers can easily scan and view your menu on any smartphone
                or tablet.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Enhanced Customer Experience
              </h3>
              <p className="text-gray-600">
                Provide a modern, hygienic, and convenient way for your
                customers to browse your offerings.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-green-500 text-4xl mb-4">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Cost-Effective Solution
              </h3>
              <p className="text-gray-600">
                Reduce printing costs and save money by going digital with your
                menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src={images.about_side}
              alt={`${constants.name} Logo`}
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              About {constants.name}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              At {constants.name}, we believe in empowering restaurants and
              hotels to embrace the digital age. Our platform offers a seamless
              solution to transform traditional paper menus into dynamic, easily
              updatable QR code menus.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Say goodbye to printing costs and outdated menus. With{" "}
              {constants.name}, you can update your offerings in real-time,
              showcase beautiful food photography, and provide a modern,
              hygienic, and convenient experience for your customers.
            </p>
            <p className="text-lg text-gray-700">
              Join the future of dining with {constants.name} and give your
              customers an unforgettable experience.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact_us" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Get in Touch
          </h2>
          <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 text-center mb-6">
              Have questions or want to learn more about how {constants.name}{" "}
              can help your business? Contact us today!
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center gap-3 text-gray-800 text-lg">
                <i className="fas fa-envelope"></i>
                <a
                  href={`mailto:${basic_info.email}`}
                  className="text-green-500 hover:underline"
                >
                  {basic_info.email}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-800 text-lg">
                <i className="fas fa-phone"></i>
                <a
                  href={basic_info.phoneCTA}
                  className="text-green-500 hover:underline"
                >
                  {basic_info.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Optional, but good practice) */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} {constants.name}. All rights
            reserved.
          </p>
          <div className="mt-4">
            <Link
              href={links.home}
              className="text-gray-400 hover:text-white mx-2"
            >
              Home
            </Link>
            <Link
              href={links.about}
              className="text-gray-400 hover:text-white mx-2"
            >
              About
            </Link>
            <Link
              href={links.contact_us}
              className="text-gray-400 hover:text-white mx-2"
            >
              Contact Us
            </Link>
            <Link
              href={links.pricing}
              className="text-gray-400 hover:text-white mx-2"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
