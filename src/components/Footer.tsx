import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative border-t bg-black text-white mt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: "0s", animationDuration: "3s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: "1s", animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: "2s", animationDuration: "3s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Kyboot Qatar
            </h3>
            <p className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
              Premium footwear for Qatar's active lifestyle
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-semibold mb-4 relative inline-block group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    All Products
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    New Arrivals
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    Sale
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-semibold mb-4 relative inline-block group">
              Company
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h4 className="font-semibold mb-4 relative inline-block group">
              Legal
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </li>
              <li className="transform hover:translate-x-2 transition-transform duration-300">
                <a href="#" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative">
                    Terms of Service
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <p className="hover:text-white transition-colors duration-300">
            © {new Date().getFullYear()} Kyboot Qatar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
