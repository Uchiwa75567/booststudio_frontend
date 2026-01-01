import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dark-gray border-t border-border-gray">
      <div className="section-container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold mb-4">
              <span className="text-boost-red">BOOST</span>
              <span className="text-white ml-1">STUDIO</span>
            </div>
            <p className="text-gray mb-6">
              Créativité sans limite. Studio de création audiovisuelle basé à Dakar.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/booststudio33/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card-bg rounded-full hover:bg-boost-red transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-boost-red">Navigation</h3>
            <ul className="space-y-2">
              {['Accueil', 'Services', 'Portfolio', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray hover:text-boost-red transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-boost-red">Nos Services</h3>
            <ul className="space-y-2">
              {['Production Vidéo', 'Photographie Pro', 'Montage & Post-production', 'Événementiel'].map((service) => (
                <li key={service}>
                  <span className="text-gray">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-boost-red">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+221775853208"
                  className="flex items-start gap-3 text-gray hover:text-boost-red transition-colors"
                >
                  <Phone size={18} className="mt-1 flex-shrink-0" />
                  <span>+221 77 585 32 08</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:oggytaz.pro@gmail.com"
                  className="flex items-start gap-3 text-gray hover:text-boost-red transition-colors"
                >
                  <Mail size={18} className="mt-1 flex-shrink-0" />
                  <span>oggytaz.pro@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span>Dakar, Sénégal</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-gray">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray text-sm">
              © {currentYear} Boost Studio. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray hover:text-boost-red transition-colors">
                Conditions générales
              </a>
              <a href="#" className="text-gray hover:text-boost-red transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;