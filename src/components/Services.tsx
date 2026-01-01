import { motion } from 'framer-motion';
import { Video, Camera, Film, ArrowRight } from 'lucide-react';
import { mockServices } from '../data/mockData';

const iconMap = {
  Video: Video,
  Camera: Camera,
  Film: Film,
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-dark-gray relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-boost-red opacity-10 rounded-full filter blur-3xl"></div>

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
            Nos <span className="text-boost-red">Services</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              Faites exploser vos réseaux sociaux ! 🚀
            </p>
            <p className="text-gray text-lg md:text-xl leading-relaxed mb-3">
              Créez du contenu qui fait le buzz, capte l'attention et transforme vos followers en fans engagés.
            </p>
            <p className="text-light-gray text-base md:text-lg">
              Des solutions complètes pour dominer Instagram, TikTok, YouTube et Facebook
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group card hover:shadow-[0_0_30px_rgba(220,38,38,0.2)] cursor-pointer"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 bg-boost-red/10 rounded-xl group-hover:bg-boost-red/20 transition-colors">
                  <IconComponent className="text-boost-red" size={40} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-boost-red transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-light-gray text-sm">
                      <span className="text-boost-red mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#reservation"
                  className="inline-flex items-center text-boost-red font-semibold group-hover:gap-2 transition-all"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;