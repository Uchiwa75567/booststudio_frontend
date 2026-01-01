import { useEffect, useState } from 'react';
import { Search, Trash2, Eye } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../stores/authStore';
import { API_BASE_URL } from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  serviceType: string;
  location: string;
  duration: number;
  dateTime: string;
  comments?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [searchTerm, filterStatus, reservations]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/reservations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setReservations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservations;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm)
      );
    }

    setFilteredReservations(filtered);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/admin/reservations/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Statut mis à jour',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#DC2626'
        });
        fetchReservations();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de mettre à jour le statut',
        background: '#000000',
        color: '#ffffff',
        confirmButtonColor: '#DC2626'
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Confirmer la suppression',
      text: 'Voulez-vous vraiment supprimer cette réservation ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      background: '#000000',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/admin/reservations/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Supprimée',
            text: 'Réservation supprimée avec succès',
            background: '#000000',
            color: '#ffffff',
            confirmButtonColor: '#DC2626'
          });
          fetchReservations();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer la réservation',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#DC2626'
        });
      }
    }
  };

  const viewDetails = (reservation: Reservation) => {
    Swal.fire({
      title: 'Détails de la réservation',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Client:</strong> ${reservation.fullName}</p>
          <p><strong>Téléphone:</strong> ${reservation.phone}</p>
          <p><strong>Service:</strong> ${reservation.serviceType}</p>
          <p><strong>Lieu:</strong> ${reservation.location}</p>
          <p><strong>Durée:</strong> ${reservation.duration}h</p>
          <p><strong>Date:</strong> ${new Date(reservation.dateTime).toLocaleString('fr-FR')}</p>
          <p><strong>Commentaires:</strong> ${reservation.comments || 'Aucun'}</p>
        </div>
      `,
      background: '#000000',
      color: '#ffffff',
      confirmButtonColor: '#DC2626'
    });
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

  return (
    <AdminLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="text-boost-red">GESTION</span>
            <span className="text-white ml-2">DES RÉSERVATIONS</span>
          </h1>
          <p className="text-gray-400">Administration et suivi des réservations clients</p>
        </div>

        {/* Filters */}
        <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-boost-red/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black border border-boost-red/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-boost-red focus:border-boost-red transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-black border border-boost-red/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-boost-red focus:border-boost-red transition-all"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="completed">Terminée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-boost-red/20 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-boost-red/10">
                <tr>
                  <th className="text-left py-4 px-6 text-boost-red font-bold uppercase text-xs tracking-wider">Client</th>
                  <th className="text-left py-4 px-6 text-boost-red font-bold uppercase text-xs tracking-wider">Service</th>
                  <th className="text-left py-4 px-6 text-boost-red font-bold uppercase text-xs tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-boost-red font-bold uppercase text-xs tracking-wider">Statut</th>
                  <th className="text-left py-4 px-6 text-boost-red font-bold uppercase text-xs tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-gray-800/30 hover:bg-boost-red/5 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-medium">{reservation.fullName}</p>
                        <p className="text-gray-400 text-sm">{reservation.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{reservation.serviceType}</td>
                    <td className="py-4 px-6 text-gray-400">
                      {new Date(reservation.dateTime).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={reservation.status}
                        onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-black border ${
                          reservation.status === 'confirmed' ? 'border-green-500 text-green-500' :
                          reservation.status === 'pending' ? 'border-yellow-500 text-yellow-500' :
                          reservation.status === 'completed' ? 'border-blue-500 text-blue-500' :
                          'border-red-500 text-red-500'
                        }`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="completed">Terminée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewDetails(reservation)}
                          className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            Aucune réservation trouvée
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReservations;