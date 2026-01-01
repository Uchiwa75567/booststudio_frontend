import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % mockTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  return (
    <section className="py-20 md:py-32 bg-dark-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-boost-red opacity-10 rounded-full filter blur-3xl"></div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Témoignages <span className="text-boost-red">Clients</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              Ils ont boosté leur visibilité avec nous 💬
            </p>
            <p className="text-gray text-lg md:text-xl leading-relaxed mb-3">
              Découvrez comment nos clients ont transformé leur présence digitale et multiplié leur engagement
            </p>
            <p className="text-light-gray text-base md:text-lg">
              Des résultats concrets, des communautés engagées, des marques qui rayonnent
            </p>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="card text-center p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-boost-red/10 rounded-full">
                  <Quote className="text-boost-red" size={40} />
                </div>
              </div>

              {/* Content */}
              <p className="text-xl md:text-2xl text-light-gray mb-8 italic leading-relaxed">
                "{mockTestimonials[currentIndex].content}"
              </p>

              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(mockTestimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="text-boost-red text-2xl">★</span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={mockTestimonials[currentIndex].avatarUrl}
                  alt={mockTestimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full border-2 border-boost-red"
                />
                <div className="text-left">
                  <h4 className="font-bold text-lg">{mockTestimonials[currentIndex].name}</h4>
                  <p className="text-gray text-sm">{mockTestimonials[currentIndex].role}</p>
                  <p className="text-boost-red text-sm">{mockTestimonials[currentIndex].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-card-bg border border-border-gray rounded-full hover:bg-boost-red hover:border-boost-red transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-card-bg border border-border-gray rounded-full hover:bg-boost-red hover:border-boost-red transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {mockTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-boost-red w-8'
                    : 'bg-border-gray hover:bg-gray'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;