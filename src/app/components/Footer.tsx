import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] h-[480px] bg-white flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex sm:flex-col md:flex-row justify-between mt-20 px-10">
          {/* Left Section / Morrent Section */}
          <div className="sm:mb-10">
            <h1 className="text-[32px] font-bold text-blue-500">MORENT</h1>
            <p className="text-[16px] text-gray-600 mt-2 leading-relaxed">
              Our vision is to provide convenience <br /> and help increase
              your sales business.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-4">
            {/* About Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">About</h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Partnership
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Business Relation
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Community</h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Podcast
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Invite a friend
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Socials</h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-500"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full border-t border-gray-200 pt-8 flex sm:flex-col md:flex-row justify-between items-center md:px-10 py-20">
          

          {/* Right Section */}
          <p className="text-sm text-gray-600 font-bold">
            © 2022 MORENT. All rights reserved
          </p>

          {/* Left Section */}
          <div className="flex gap-6 md:mr-8">
            <p className="text-sm text-gray-600 hover:text-blue-500 font-bold">
              Privacy & Policy
            </p>
            <p className="text-sm text-gray-600 hover:text-blue-500 font-bold">
              Terms & Condition
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;