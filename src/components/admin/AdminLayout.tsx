import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Image, LogOut, Shield } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Swal from 'sweetalert2';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Swal.fire({
      title: 'Déconnexion',
      text: 'Voulez-vous vraiment vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler',
      background: '#000000',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/admin/login');
      }
    });
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/admin/reservations', icon: Calendar, label: 'Réservations' },
    { path: '/admin/media', icon: Image, label: 'Médias' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-boost-red/20 shadow-2xl">
        <div className="p-6 border-b border-boost-red/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-boost-red rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-boost-red">BOOST</h2>
              <h3 className="text-sm font-bold text-white -mt-1">STUDIO</h3>
            </div>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Administration</p>
        </div>

        <nav className="px-4 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-boost-red text-white shadow-lg shadow-boost-red/25'
                  : 'text-gray-400 hover:bg-boost-red/10 hover:text-boost-red border border-transparent hover:border-boost-red/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-boost-red/20 my-4"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 w-full border border-transparent hover:border-red-400/30"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-boost-red/20">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Boost Studio
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;