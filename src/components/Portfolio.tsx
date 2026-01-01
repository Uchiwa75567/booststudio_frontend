import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockPortfolioItems } from '../data/mockData';
import type { ProjectCategory } from '../types';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  description?: string;
  category?: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  category: ProjectCategory;
  tags: string[];
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(mockPortfolioItems);
  const autoPlayRef = useRef<number | null>(null);

  const categories: { value: ProjectCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'video', label: 'Vidéo' },
    { value: 'photo', label: 'Photo' },
    { value: 'event', label: 'Événement' },
    { value: 'corporate', label: 'Corporate' },
  ];

  // Fetch media from API
  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/media?visible=true`);
      if (response.data.success && response.data.data.length > 0) {
        // Convert media items to portfolio items
        const apiItems: PortfolioItem[] = response.data.data.map((media: MediaItem, index: number) => {
          const categoryMap: Record<string, ProjectCategory> = {
            'video': 'video',
            'photo': 'photo',
            'portrait': 'photo',
            'événement': 'event',
            'event': 'event',
            'corporate': 'corporate'
          };

          const category = media.category?.toLowerCase() || '';
          const mappedCategory = categoryMap[category] || (media.type === 'video' ? 'video' : 'photo');

          return {
            id: media.id,
            title: media.title || `Projet ${index + 1}`,
            description: media.description || 'Découvrez notre travail',
            imageUrl: media.type === 'image' ? media.url : undefined,
            videoUrl: media.type === 'video' ? media.url : undefined,
            category: mappedCategory,
            tags: media.category ? [media.category] : [media.type === 'video' ? 'Vidéo' : 'Photo']
          };
        });

        // Combine with mock data if needed, or replace entirely
        setPortfolioItems([...apiItems, ...mockPortfolioItems]);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
      // Keep using mock data on error
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && filteredItems.length > 0) {
      autoPlayRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
      }, 2000);
    }

    return () => {
      if (autoPlayRef.current !== null) {
        window.clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, filteredItems.length]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      // Dragged right - go to previous
      handlePrevious();
    } else if (info.offset.x < -threshold) {
      // Dragged left - go to next
      handleNext();
    }
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const length = filteredItems.length;
    
    // Normalize the difference to handle circular indexing
    let normalizedDiff = diff;
    if (diff > length / 2) normalizedDiff = diff - length;
    if (diff < -length / 2) normalizedDiff = diff + length;
    
    return normalizedDiff;
  };

  const getCardStyle = (position: number) => {
    if (position === 0) {
      // Center card - straight, facing forward, in front
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg) translateZ(100px)',
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1)',
      };
    } else if (position === 1) {
      // Right card - rotated to look toward center (negative Y rotation)
      return {
        transform: 'translateX(70%) scale(0.8) rotateY(-45deg) translateZ(-100px)',
        opacity: 1,
        zIndex: 20,
        filter: 'brightness(0.7)',
      };
    } else if (position === -1) {
      // Left card - rotated to look toward center (positive Y rotation)
      return {
        transform: 'translateX(-70%) scale(0.8) rotateY(45deg) translateZ(-100px)',
        opacity: 1,
        zIndex: 20,
        filter: 'brightness(0.7)',
      };
    } else if (position > 1) {
      // Far right - more rotation, further back
      return {
        transform: 'translateX(120%) scale(0.6) rotateY(-55deg) translateZ(-200px)',
        opacity: 0.3,
        zIndex: 10,
        filter: 'brightness(0.5)',
      };
    } else {
      // Far left - more rotation, further back
      return {
        transform: 'translateX(-120%) scale(0.6) rotateY(55deg) translateZ(-200px)',
        opacity: 0.3,
        zIndex: 10,
        filter: 'brightness(0.5)',
      };
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Notre <span className="text-boost-red">Portfolio</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              Des contenus qui cartonnent ! 🎥
            </p>
            <p className="text-gray text-lg md:text-xl leading-relaxed mb-3">
              Découvrez nos réalisations qui ont fait le buzz et boosté la visibilité de nos clients
            </p>
            <p className="text-light-gray text-base md:text-lg">
              Clips viraux, photos pros, couvertures d'événements - Du contenu qui marque les esprits
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-boost-red text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                  : 'bg-card-bg text-gray hover:text-white hover:border-boost-red border border-border-gray'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* 3D Coverflow Carousel */}
        <div 
          className="relative h-[500px] md:h-[600px] mb-8"
          style={{ 
            perspective: '1500px',
            perspectiveOrigin: '50% 50%'
          }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div 
            className="relative w-full h-full flex items-center justify-center touch-pan-y" 
            style={{ transformStyle: 'preserve-3d' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {filteredItems.map((item, index) => {
              const position = getSlidePosition(index);
              const style = getCardStyle(position);

              return (
                <motion.div
                  key={item.id}
                  className="absolute w-[75%] md:w-[500px] h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] cursor-pointer"
                  style={{
                    ...style,
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onClick={() => position === 0 && setSelectedItem(item)}
                >
                  {/* Media */}
                  {item.videoUrl ? (
                    <div className="relative w-full h-full">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                      </video>
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                          <Play fill="black" className="text-black ml-1" size={32} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Text overlay always visible on center card */}
                  {position === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 md:p-8"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs md:text-sm px-3 py-1 bg-boost-red/90 rounded-full font-medium uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-gray-300 text-sm md:text-base">{item.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Navigation Buttons - Hidden on mobile, completely on edges for desktop */}
          <button
            onClick={handlePrevious}
            className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="text-white" size={32} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
            {filteredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-boost-red'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
              onClick={() => setSelectedItem(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-boost-red transition-colors"
                onClick={() => setSelectedItem(null)}
              >
                <X size={32} />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedItem.videoUrl ? (
                  <video controls className="w-full rounded-lg">
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="w-full rounded-lg"
                  />
                )}
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-gray mb-4">{selectedItem.description}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-boost-red rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;