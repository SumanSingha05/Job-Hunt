import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'; // Using more modern icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-100 border-t border-gray-200 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 tracking-wide mb-4">Job Hunt</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Your go-to platform for discovering exciting career opportunities. We connect talented individuals with leading companies.
            </p>
            <p className="text-xs text-gray-500">© {currentYear} Your Company. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Jobs</Link></li>
              <li><Link to="/browse" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Browse Companies</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center">
                  <Facebook className="w-4 h-4 mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center">
                  <Twitter className="w-4 h-4 mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:info@yourcompany.com" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              Stay updated with our latest job postings and news.
            </p>
            <div className="mt-2">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="Your Email"
              />
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mt-2 w-full transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 py-4 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors duration-200 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors duration-200 mr-4">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-indigo-600 transition-colors duration-200">Sitemap</Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;