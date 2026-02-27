import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-xl font-bold text-orange-400">M R Hotel</h4>
          <p className="mt-2 text-sm">Best non-veg food in town. Open daily 11:00 - 23:00</p>
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="text-sm mt-2">
            <a href="tel:+919827550629" className="hover:text-orange-400">
               📞 +91 9827550629
              </a>
          </p>
          <p className="text-sm">
              <a
                  href="https://www.google.com/maps/place/Mochipura,+Nayapura,+Barnagar,+Madhya+Pradesh+456771/@23.0431397,75.3768661,18z/data=!3m1!4b1!4m6!3m5!1s0x3963bfb0f05fde97:0x252051bfaf464342!8m2!3d23.0434742!4d75.3781638!16s%2Fg%2F11b6b8n22q?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400"
  >
    Toronto Colony,Barnagar
  </a>
          </p>
        </div>

        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 text-sm space-y-1">
            <li>Menu</li>
            <li>Booking</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © 1999 M R Hotel — All rights reserved
      </div>
    </footer>
  );
}