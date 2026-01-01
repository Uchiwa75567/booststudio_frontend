import type { Service, PortfolioItem, Testimonial } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Production Vidéo',
    description: 'Création de vidéos professionnelles pour tous vos besoins : clips, publicités, documentaires et contenus corporate.',
    iconName: 'Video',
    features: [
      'Captation vidéo HD/4K',
      'Équipe professionnelle',
      'Matériel haut de gamme',
      'Post-production incluse'
    ]
  },
  {
    id: '2',
    title: 'Photographie Pro',
    description: 'Services photographiques professionnels pour événements, portraits, produits et architecture.',
    iconName: 'Camera',
    features: [
      'Shooting photo professionnel',
      'Retouche et édition',
      'Livraison rapide',
      'Formats adaptés'
    ]
  },
  {
    id: '3',
    title: 'Montage & Post-production',
    description: 'Montage vidéo créatif, effets spéciaux, étalonnage colorimétrique et sound design de qualité studio.',
    iconName: 'Film',
    features: [
      'Montage créatif',
      'Effets visuels',
      'Étalonnage professionnel',
      'Sound design'
    ]
  }
];

const cloudName = 'dtksfg8kd';

const photoItems = [
  '1767116841230_vltaix',
  '1767116836011_scrcku',
  '1767116839365_ewy9ve',
  '1767116189338_r2rotl',
  '1767116181469_lcqtow',
  '1767116142591_ypxha3',
  '1767116138395_qusvpv',
  '1767116125907_u3tkak'
].map((id, index) => ({
  id,
  title: `Photo ${index + 1}`,
  category: 'photo' as const,
  imageUrl: `https://res.cloudinary.com/${cloudName}/image/upload/${id}`,
  videoUrl: '',
  description: 'Photographie professionnelle',
  tags: ['Photo', 'Studio']
}));

const videoItems = [
  '3791193867543118447_hb9wko',
  '3648460051463674634_cjwefw',
  '3640588108566647949_erg1xv',
  '3504904519241175838_1_ajmysi',
  '3442536931345842657_qrzxyq'
].map((id, index) => ({
  id,
  title: `Vidéo ${index + 1}`,
  category: 'video' as const,
  imageUrl: `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${id}.jpg`,
  videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/${id}`,
  description: 'Production vidéo professionnelle',
  tags: ['Vidéo', 'Production']
}));

const eventItems = [
  '3717835956218009465_bzfsyf',
  '3794168706302243144_uszhyf',
  '3656248291853149801_orm0n3'
].map((id, index) => ({
  id,
  title: `Événement ${index + 1}`,
  category: 'event' as const,
  imageUrl: `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${id}.jpg`,
  videoUrl: `https://res.cloudinary.com/${cloudName}/video/upload/${id}`,
  description: 'Couverture d\'événement',
  tags: ['Événement', 'Vidéo']
}));

const corporateItems = [
  { id: '3788136091203934568_a2fhr7', type: 'video' as const },
  { id: '1767116163942_njdco5', type: 'image' as const }
].map((item, index) => ({
  id: item.id,
  title: `Corporate ${index + 1}`,
  category: 'corporate' as const,
  imageUrl: item.type === 'video' ? `https://res.cloudinary.com/${cloudName}/video/upload/so_0/${item.id}.jpg` : `https://res.cloudinary.com/${cloudName}/image/upload/${item.id}`,
  videoUrl: item.type === 'video' ? `https://res.cloudinary.com/${cloudName}/video/upload/${item.id}` : '',
  description: 'Contenu corporate professionnel',
  tags: ['Corporate', item.type === 'video' ? 'Vidéo' : 'Photo']
}));

export const mockPortfolioItems: PortfolioItem[] = [
  ...photoItems,
  ...videoItems,
  ...eventItems,
  ...corporateItems
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Fatou Diop',
    role: 'Directrice Marketing',
    company: 'Tech Solutions Dakar',
    content: 'Boost Studio a transformé notre vision en réalité. La qualité de leur travail est exceptionnelle et leur professionnalisme remarquable.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=fatou.diop'
  },
  {
    id: '2',
    name: 'Moussa Ndiaye',
    role: 'Entrepreneur',
    company: 'Startup Innovation',
    content: 'Une équipe créative et à l\'écoute. Nos vidéos promotionnelles ont eu un impact énorme sur notre visibilité.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=moussa.ndiaye'
  },
  {
    id: '3',
    name: 'Aminata Sall',
    role: 'Event Manager',
    company: 'Events & More',
    content: 'Leur couverture de nos événements est toujours impeccable. Photos et vidéos de qualité professionnelle à chaque fois.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=aminata.sall'
  },
  {
    id: '4',
    name: 'Ibrahima Fall',
    role: 'Artiste Musicien',
    company: 'Independent',
    content: 'Mon clip vidéo a dépassé toutes mes attentes ! L\'équipe est talentueuse et comprend vraiment la vision artistique.',
    rating: 5,
    avatarUrl: 'https://i.pravatar.cc/150?u=ibrahima.fall'
  }
];