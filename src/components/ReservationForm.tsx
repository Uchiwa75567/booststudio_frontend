import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Video, MapPin, Clock, Calendar, MessageSquare, Mail, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import axios from 'axios';
import Swal from 'sweetalert2';
import type { ReservationFormData, ServiceType, LocationType } from '../types';

const ReservationForm = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    serviceType: 'studio',
    location: 'studio',
    duration: 1,
    dateTime: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pricing logic
  const baseRates: Record<ServiceType, number> = {
    studio: 25000,
    clip_video: 35000,
    photographie: 30000,
    evenement: 40000
  };

  const locationMultipliers: Record<LocationType, number> = {
    studio: 1,
    exterieur: 1.2,
    domicile: 1.3
  };

  const calculateTotal = () => {
    const baseRate = baseRates[formData.serviceType];
    const locationMultiplier = locationMultipliers[formData.location];
    return baseRate * formData.duration * locationMultiplier;
  };

  const total = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || '';
      const response = await axios.post(`${apiBase}/api/reservations`, formData);

      setIsSuccess(true);
      setIsSubmitting(false);

      await Swal.fire({
        icon: 'success',
        title: 'Réservation confirmée',
        text: response?.data?.message || 'Nous avons bien reçu votre réservation.',
        timer: 3000,
        showConfirmButton: false,
      });

      setFormData({
        fullName: '',
        phone: '',
        serviceType: 'studio',
        location: 'studio',
        duration: 1,
        dateTime: '',
        comments: ''
      });

      setIsSuccess(false);
    } catch (error: any) {
      console.error('Reservation error:', error);
      setIsSubmitting(false);
      const message = error?.response?.data?.message || error?.message || 'Erreur lors de la réservation';
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: message,
      });
    }
  };

  const serviceLabels: Record<ServiceType, string> = {
    studio: 'Studio',
    clip_video: 'Clip Vidéo',
    photographie: 'Photographie',
    evenement: 'Événement'
  };

  const locationLabels: Record<LocationType, string> = {
    studio: 'Studio',
    exterieur: 'Extérieur',
    domicile: 'Domicile'
  };

  return (
    <section id="reservation" className="py-20 md:py-32 bg-black relative">
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
            Réservez Votre <span className="text-boost-red">Projet</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white mb-4">
              Prêt à booster votre contenu ? 🎯
            </p>
            <p className="text-gray text-lg md:text-xl leading-relaxed mb-3">
              Réservez votre session maintenant et recevez un devis instantané.
            </p>
            <p className="text-light-gray text-base md:text-lg">
              Créez du contenu viral qui fera exploser vos statistiques et captivera votre audience
            </p>
          </div>
        </motion.div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="card space-y-6">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <User size={20} />
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Votre nom"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <Phone size={20} />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="77 123 45 67"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Service Type & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <Video size={20} />
                    Type de Prestation
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as ServiceType })}
                    className="input-field"
                  >
                    {(Object.keys(serviceLabels) as ServiceType[]).map((key) => (
                      <option key={key} value={key}>{serviceLabels[key]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <MapPin size={20} />
                    Lieu
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value as LocationType })}
                    className="input-field"
                  >
                    {(Object.keys(locationLabels) as LocationType[]).map((key) => (
                      <option key={key} value={key}>{locationLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration & DateTime */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <Clock size={20} />
                    Durée (heures)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                    <Calendar size={20} />
                    Date & Heure
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.dateTime}
                    onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="flex items-center gap-2 text-boost-red font-medium mb-2">
                  <MessageSquare size={20} />
                  Commentaires (optionnel)
                </label>
                <textarea
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Décrivez votre projet, vos préférences, ou toute information utile..."
                  className="input-field resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                    Envoi en cours...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Réservation confirmée !
                  </>
                ) : (
                  'Réserver Maintenant'
                )}
              </button>
            </form>
          </motion.div>

          {/* Right: Price Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Price Details */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-boost-red">💳</span>
                Détails Tarif
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border-gray">
                  <span className="text-gray">Base ({serviceLabels[formData.serviceType]})</span>
                  <span className="font-semibold">{formatCurrency(baseRates[formData.serviceType])}/h</span>
                </div>

                <div className="flex justify-between py-3 border-b border-border-gray">
                  <span className="text-gray">Durée</span>
                  <span className="font-semibold">{formData.duration}h</span>
                </div>

                {formData.location !== 'studio' && (
                  <div className="flex justify-between py-3 border-b border-border-gray">
                    <span className="text-gray">Supplément {locationLabels[formData.location]}</span>
                    <span className="font-semibold text-boost-red">+{((locationMultipliers[formData.location] - 1) * 100).toFixed(0)}%</span>
                  </div>
                )}

                <div className="flex justify-between py-4 mt-4 bg-boost-red/10 rounded-lg px-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-boost-red">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="card bg-medium-gray">
              <h3 className="text-xl font-bold mb-4">Besoin d'Aide ?</h3>

              <div className="space-y-3">
                <a
                  href="tel:+221775853208"
                  className="flex items-center gap-3 text-light-gray hover:text-boost-red transition-colors"
                >
                  <Phone size={20} className="text-boost-red" />
                  <span>+221 77 585 32 08</span>
                </a>

                <a
                  href="mailto:oggytaz.pro@gmail.com"
                  className="flex items-center gap-3 text-light-gray hover:text-boost-red transition-colors"
                >
                  <Mail size={20} className="text-boost-red" />
                  <span>oggytaz.pro@gmail.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;