// Format currency in FCFA
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString('fr-FR')} FCFA`;
};

// Format duration display
export const formatDuration = (hours: number): string => {
  return `${hours}h`;
};

// Format phone number
export const formatPhone = (phone: string): string => {
  // Format as +221 XX XXX XX XX
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('221')) {
    const number = cleaned.slice(3);
    return `+221 ${number.slice(0, 2)} ${number.slice(2, 5)} ${number.slice(5, 7)} ${number.slice(7)}`;
  }
  return phone;
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};