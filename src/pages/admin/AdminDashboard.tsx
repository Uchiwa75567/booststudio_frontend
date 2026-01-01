import { useEffect, useState } from 'react';
import { BarChart3, Calendar, Image, TrendingUp, Users, Video } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import { API_BASE_URL } from '../../utils/api';
import type { DashboardStats } from '../../types/admin';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Chargement...</div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: 'Réservations totales',
      value: stats?.reservations.total || 0,
      icon: Calendar,
      color: 'bg-boost-red/10 text-boost-red border-boost-red/20'
    },
    {
      title: 'En attente',
      value: stats?.reservations.pending || 0,
      icon: Users,
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    },
    {
      title: 'Confirmées',
      value: stats?.reservations.confirmed || 0,
      icon: BarChart3,
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      title: 'Revenu total',
      value: `${stats?.revenue.total.toLocaleString()} CFA`,
      icon: TrendingUp,
      color: 'bg-boost-red/20 text-boost-red border-boost-red/30'
    },
    {
      title: 'Photos',
      value: stats?.media.images || 0,
      icon: Image,
      color: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    },
    {
      title: 'Vidéos',
      value: stats?.media.videos || 0,
      icon: Video,
      color: 'bg-gray-600/10 text-gray-300 border-gray-600/20'
    }
  ];

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="text-boost-red">TABLEAU</span>
            <span className="text-white ml-2">DE BORD</span>
          </h1>
          <p className="text-gray-400">Aperçu des performances et réservations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-boost-red/20 shadow-lg hover:shadow-boost-red/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg border ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1 font-medium">{stat.title}</p>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Reservations */}
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-boost-red/20 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-boost-red" />
            Réservations récentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-boost-red/20">
                  <th className="text-left py-4 px-4 text-boost-red font-bold uppercase text-xs tracking-wider">Client</th>
                  <th className="text-left py-4 px-4 text-boost-red font-bold uppercase text-xs tracking-wider">Service</th>
                  <th className="text-left py-4 px-4 text-boost-red font-bold uppercase text-xs tracking-wider">Date</th>
                  <th className="text-left py-4 px-4 text-boost-red font-bold uppercase text-xs tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-gray-800/30 hover:bg-boost-red/5 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{reservation.fullName}</td>
                    <td className="py-4 px-4 text-gray-300">{reservation.serviceType}</td>
                    <td className="py-4 px-4 text-gray-300">
                      {new Date(reservation.dateTime).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        reservation.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;