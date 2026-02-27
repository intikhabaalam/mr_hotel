import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="p-8 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold mb-6 text-center">
          Popular Dishes 🍽️
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              src="https://images.pexels.com/photos/33947401/pexels-photo-33947401.jpeg?_gl=1*13nowj3*_ga*NTA2OTIyNjMyLjE3Mzc4MDUxODI.*_ga_8JE65Q40S6*czE3NzA4OTg0NTgkbzUkZzEkdDE3NzA4OTg2NTckajYwJGwwJGgw"
              alt="Chicken Biryani"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h4 className="text-xl font-semibold">Chicken Biryani</h4>
              <p className="text-gray-500 mt-1">Spicy & Delicious</p>
            
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              src="https://images.pexels.com/photos/12737808/pexels-photo-12737808.jpeg?_gl=1*m0icox*_ga*NTA2OTIyNjMyLjE3Mzc4MDUxODI.*_ga_8JE65Q40S6*czE3NzA4OTg0NTgkbzUkZzEkdDE3NzA4OTkyODAkajU2JGwwJGgw"
              alt="Mutton Korma"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h4 className="text-xl font-semibold">Mutton Korma</h4>
              <p className="text-gray-500 mt-1">Rich & Creamy</p>
           
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img
              src="https://images.pexels.com/photos/35267272/pexels-photo-35267272.jpeg?_gl=1*b6sbpr*_ga*NTA2OTIyNjMyLjE3Mzc4MDUxODI.*_ga_8JE65Q40S6*czE3NzA4OTg0NTgkbzUkZzEkdDE3NzA4OTg5MjMkajQ4JGwwJGgw"
              alt="Fish Fry"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h4 className="text-xl font-semibold">Fish Fry</h4>
              <p className="text-gray-500 mt-1">Crispy & Fresh</p>
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
