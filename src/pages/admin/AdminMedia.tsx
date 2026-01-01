import { useEffect, useState } from 'react';
import { Upload, Trash2, Eye, EyeOff, Image as ImageIcon, Video } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../stores/authStore';
import { API_BASE_URL } from '../../utils/api';
import type { Media } from '../../types/admin';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminMedia = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/media`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setMedia(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Télécharger un média',
      html: `
        <div class="space-y-4">
          <div>
            <label class="block text-left text-sm mb-2">Type</label>
            <select id="type" class="swal2-input w-full">
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
            </select>
          </div>
          <div>
            <label class="block text-left text-sm mb-2">Fichier</label>
            <input type="file" id="file" class="swal2-file w-full" accept="image/*,video/*">
          </div>
          <div>
            <label class="block text-left text-sm mb-2">Titre (optionnel)</label>
            <input type="text" id="title" class="swal2-input w-full" placeholder="Titre du média">
          </div>
          <div>
            <label class="block text-left text-sm mb-2">Description (optionnel)</label>
            <textarea id="description" class="swal2-textarea w-full" placeholder="Description"></textarea>
          </div>
          <div>
            <label class="block text-left text-sm mb-2">Catégorie (optionnel)</label>
            <input type="text" id="category" class="swal2-input w-full" placeholder="Ex: Portrait, Événement">
          </div>
        </div>
      `,
      background: '#1a1a1a',
      color: '#fff',
      confirmButtonColor: '#8b5cf6',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Télécharger',
      preConfirm: () => {
        const fileInput = document.getElementById('file') as HTMLInputElement;
        const type = (document.getElementById('type') as HTMLSelectElement).value;
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLTextAreaElement).value;
        const category = (document.getElementById('category') as HTMLInputElement).value;

        if (!fileInput.files || !fileInput.files[0]) {
          Swal.showValidationMessage('Veuillez sélectionner un fichier');
          return null;
        }

        return { file: fileInput.files[0], type, title, description, category };
      }
    });

    if (formValues) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', formValues.file);
      formData.append('type', formValues.type);
      formData.append('title', formValues.title);
      formData.append('description', formValues.description);
      formData.append('category', formValues.category);

      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/admin/media`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Média téléchargé',
            text: 'Le média a été ajouté avec succès',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#8b5cf6'
          });
          fetchMedia();
        }
      } catch (error: any) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.response?.data?.message || 'Impossible de télécharger le média',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/admin/media/${id}`,
        { isVisible: !currentVisibility },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        fetchMedia();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de modifier la visibilité',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#8b5cf6'
      });
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Confirmer la suppression',
      text: 'Voulez-vous vraiment supprimer ce média ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      background: '#1a1a1a',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/api/admin/media/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Supprimé',
            text: 'Média supprimé avec succès',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#8b5cf6'
          });
          fetchMedia();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer le média',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#8b5cf6'
        });
      }
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

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Gestion des médias</h1>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            Télécharger un média
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map((item) => (
            <div key={item.id} className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center relative">
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.title || 'Media'} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" />
                )}
                {!item.isVisible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <EyeOff className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.type === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-pink-500" />
                  ) : (
                    <Video className="w-4 h-4 text-purple-500" />
                  )}
                  <span className="text-sm text-gray-400">{item.type}</span>
                  {item.category && (
                    <span className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  )}
                </div>
                {item.title && <h3 className="text-white font-medium mb-1">{item.title}</h3>}
                {item.description && (
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleVisibility(item.id, item.isVisible)}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors text-sm font-medium ${
                      item.isVisible
                        ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                    }`}
                  >
                    {item.isVisible ? (
                      <><Eye className="w-4 h-4 inline mr-1" />Visible</>
                    ) : (
                      <><EyeOff className="w-4 h-4 inline mr-1" />Caché</>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {media.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-12">
              <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Aucun média téléchargé</p>
              <button
                onClick={handleUpload}
                className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Télécharger votre premier média
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;