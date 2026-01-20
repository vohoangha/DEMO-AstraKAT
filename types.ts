
export enum MediaType {
  NONE = 'None',
  STANDARD = 'Standard',
  POSTER = 'Poster',
  KEY_VISUAL = 'Key Visual',
  SOCIAL_POST = 'Social Media Post',
  WALLPAPER = 'Wallpaper',
  COVER_ART = 'Cover Art',
  BANNER = 'Web Banner',
  CARD = 'Greeting Card'
}

export enum ArchitectureStyle {
  NONE = 'None',
  FRAME_HOUSE = 'Frame House',
  FUTURISTIC = 'Futuristic',
  INDOCHINE = 'Indochine',
  INDUSTRIAL = 'Industrial',
  JAPANDI = 'Japandi',
  LUXURY = 'Luxury Contemporary',
  MINIMALIST = 'Minimalist',
  MODERN = 'Modern',
  NEOCLASSIC = 'Neoclassical',
  SCANDINAVIAN = 'Scandinavian',
  STANDARD = 'Standard',
  TROPICAL = 'Tropical Resort',
  WABI_SABI = 'Wabi Sabi',
  OTHERS = 'Others'
}

export enum ImageQuality {
  AUTO = 'Auto',
  STANDARD = 'Standard',
  HD = 'HD',
  Q2K = '2K',
  Q4K = '4K'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  type: MediaType;
  timestamp: number;
}

export const ASPECT_RATIOS = [
  { label: '1:1', value: '1:1', desc: 'Square' },
  { label: '9:16', value: '9:16', desc: 'Story' },
  { label: '16:9', value: '16:9', desc: 'Wide' },
  { label: '3:4', value: '3:4', desc: 'Portrait' },
  { label: '4:3', value: '4:3', desc: 'Classic' },
];

export interface GenerationConfig {
  prompt: string;
  mediaType: MediaType;
  aspectRatio: string;
}