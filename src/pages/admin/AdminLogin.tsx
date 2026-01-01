import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Camera, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../stores/authStore';
import { API_BASE_URL } from '../../utils/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        password
      });

      if (response.data.success) {
        login(response.data.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie',
          text: 'Bienvenue dans l\'espace administrateur',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#DC2626'
        });
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.response?.data?.message || 'Mot de passe incorrect',
        background: '#000000',
        color: '#ffffff',
        confirmButtonColor: '#DC2626'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="admin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#admin-grid)" />
        </svg>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-boost-red rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-boost-red rounded-full blur-3xl opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-boost-red rounded-full blur-3xl opacity-10" />

      {/* Main Content */}
      <main className="w-full max-w-5xl relative z-10 flex flex-col items-center px-4">
        {/* Logo/Icon */}
        <div className="w-20 h-20 rounded-full bg-boost-red flex items-center justify-center mb-6 shadow-lg shadow-boost-red/30">
          <Camera className="text-white" size={32} />
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-2 text-center font-heading tracking-tight">
          Administration
        </h1>
        <p className="text-gray-300 mb-8 text-center text-lg font-light">
          OggyTaz Portfolio Management
        </p>

        {/* Login Form Card */}
        <div className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-4">
              <label 
                htmlFor="password" 
                className="block text-2xl font-semibold text-gray-200"
              >
                Mot de passe
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={26} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-16 py-6 text-xl rounded-xl bg-black/40 border-2 border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-boost-red focus:border-boost-red transition-all"
                  placeholder="Entrez le mot de passe admin"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-boost-red rounded p-2"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff size={26} /> : <Eye size={26} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-boost-red hover:bg-boost-red-dark text-white font-bold py-6 text-2xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 transition-all duration-300 hover:shadow-glow-red transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={28} />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Info Box */}
        <div className="w-full bg-black/30 border-2 border-white/10 rounded-xl p-4 mt-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div className="flex-1">
              <p className="text-white text-lg font-semibold mb-1">
                Interface d'administration sécurisée
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Contactez l'administrateur si vous avez oublié vos identifiants
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto pt-4 pb-4">
        <p className="text-gray-500 text-xs text-center">
          Zone réservée aux administrateurs • Boost Studio © 2025
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;