import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full py-8">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Column 2: Social Media (Now Aligned Properly) */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaGithub size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Column 3: Contact Information */}
        <div className="md:text-right flex flex-col items-center md:items-end">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p>Email: support@mywebsite.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-700 mx-auto w-11/12" />

      {/* Bottom Footer */}
      <div className="max-w-screen-xl mx-auto px-6 text-center text-sm">
        <p>© 2025 My Website. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:underline mx-2">Privacy Policy</a> | 
          <a href="#" className="hover:underline mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
