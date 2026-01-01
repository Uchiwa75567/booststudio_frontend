import { motion } from 'framer-motion';
import { ArrowRight, Play, Smartphone, Video, TrendingUp } from 'lucide-react';

const Hero = () => {
  const scrollToReservation = () => {
    const element = document.querySelector('#reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dtksfg8kd/image/upload/background/Image_coll%C3%A9e_hqdszu"
          alt="Studio Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Image failed to load, trying alternate URL');
            e.currentTarget.src = "https://res.cloudinary.com/dtksfg8kd/image/upload/Image_coll%C3%A9e_hqdszu";
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 z-[1] opacity-15">
        <div className="absolute top-20 left-20 w-96 h-96 bg-boost-red rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-boost-red-dark rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Mesh pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="section-container relative z-10 text-center pt-24 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-light-gray text-base md:text-xl mb-4 md:mb-6 font-medium"
          >
            Bienvenue dans l'univers de
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="text-boost-red">BOOST</span>
            <span className="text-white ml-2">STUDIO</span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white via-gray to-white bg-clip-text text-transparent">
              Boostez votre présence digitale
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-base md:text-lg text-light-gray mb-4">
              <p className="flex items-center gap-2">
                <Smartphone className="text-boost-red" size={24} />
                <span className="whitespace-nowrap">Contenus viraux pour vos réseaux sociaux</span>
              </p>
              <span className="hidden md:inline text-border-gray">•</span>
              <p className="flex items-center gap-2">
                <Video className="text-boost-red" size={24} />
                <span className="whitespace-nowrap">Vidéos professionnelles qui captivent</span>
              </p>
              <span className="hidden md:inline text-border-gray">•</span>
              <p className="flex items-center gap-2">
                <TrendingUp className="text-boost-red" size={24} />
                <span className="whitespace-nowrap">Augmentez votre engagement et votre visibilité</span>
              </p>
            </div>
            <p className="mt-6 text-light-gray text-base md:text-lg">
              Studio de création audiovisuelle • Dakar, Sénégal
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button onClick={scrollToReservation} className="btn-primary group">
              Réserver maintenant
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="btn-secondary group">
              <Play className="inline-block mr-2" size={20} />
              Voir nos réalisations
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20"
          >
            <div className="w-6 h-10 border-2 border-light-gray rounded-full mx-auto relative">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-boost-red rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
              />
            </div>
            <p className="text-gray text-sm mt-4">Scroll pour découvrir</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;