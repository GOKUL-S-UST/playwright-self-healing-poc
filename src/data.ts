export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
  rating?: number;
  stock?: number;
  tags?: string[];
};

export const products: Product[] = [
  { id: 1, name: 'Laptop Stand', price: 45, description: 'Adjustable aluminium laptop stand.', category: 'Workspace', image: 'https://picsum.photos/seed/laptop-stand/600/400', rating: 4.8, stock: 18, tags: ['ergonomic', 'aluminium'] },
  { id: 2, name: 'Mechanical Keyboard', price: 90, description: 'Tactile switches, USB-C.', category: 'Peripherals', image: 'https://picsum.photos/seed/mechanical-keyboard/600/400', rating: 4.9, stock: 12, tags: ['mechanical', 'usb-c'] },
  { id: 3, name: 'Wireless Mouse', price: 25, description: 'Ergonomic, 2.4GHz wireless.', category: 'Peripherals', image: 'https://picsum.photos/seed/wireless-mouse/600/400', rating: 4.6, stock: 24, tags: ['wireless', 'ergonomic'] },
  { id: 4, name: 'Noise-Cancelling Headphones', price: 129, description: 'Immersive over-ear sound with active noise cancellation.', category: 'Audio', image: 'https://picsum.photos/seed/noise-cancelling-headphones/600/400', rating: 4.7, stock: 9, tags: ['wireless', 'noise-cancelling'] },
  { id: 5, name: 'USB-C Hub', price: 39, description: 'Seven versatile ports in a compact aluminium hub.', category: 'Accessories', image: 'https://picsum.photos/seed/usb-c-hub/600/400', rating: 4.5, stock: 31, tags: ['usb-c', 'travel'] },
  { id: 6, name: 'Desk Lamp', price: 55, description: 'Dimmable task lighting with a clean, modern profile.', category: 'Workspace', image: 'https://picsum.photos/seed/desk-lamp/600/400', rating: 4.4, stock: 14, tags: ['lighting', 'dimmable'] },
  { id: 7, name: 'Webcam 4K', price: 99, description: 'Sharp 4K video for calls, streaming, and recording.', category: 'Peripherals', image: 'https://picsum.photos/seed/webcam-4k/600/400', rating: 4.6, stock: 8, tags: ['4k', 'streaming'] },
  { id: 8, name: 'Desk Mat', price: 28, description: 'A smooth, generously sized surface for your setup.', category: 'Workspace', image: 'https://picsum.photos/seed/desk-mat/600/400', rating: 4.3, stock: 42, tags: ['desk', 'comfort'] },
  { id: 9, name: 'Bluetooth Speaker', price: 65, description: 'Room-filling portable sound with all-day battery life.', category: 'Audio', image: 'https://picsum.photos/seed/bluetooth-speaker/600/400', rating: 4.5, stock: 16, tags: ['bluetooth', 'portable'] },
  { id: 10, name: 'Laptop Sleeve', price: 32, description: 'Protective padded sleeve for everyday commutes.', category: 'Accessories', image: 'https://picsum.photos/seed/laptop-sleeve/600/400', rating: 4.2, stock: 27, tags: ['travel', 'protection'] },
  { id: 11, name: 'Monitor Light Bar', price: 48, description: 'Glare-free lighting that clips neatly onto your monitor.', category: 'Workspace', image: 'https://picsum.photos/seed/monitor-light-bar/600/400', rating: 4.6, stock: 11, tags: ['lighting', 'monitor'] },
  { id: 12, name: 'Wireless Earbuds', price: 79, description: 'Comfortable true wireless audio with a pocket-sized case.', category: 'Audio', image: 'https://picsum.photos/seed/wireless-earbuds/600/400', rating: 4.4, stock: 19, tags: ['wireless', 'portable'] },
  { id: 13, name: 'Ergonomic Wrist Rest', price: 22, description: 'Soft support designed for comfortable all-day typing.', category: 'Peripherals', image: 'https://picsum.photos/seed/wrist-rest/600/400', rating: 4.1, stock: 36, tags: ['comfort', 'ergonomic'] },
  { id: 14, name: 'Cable Organizer Set', price: 16, description: 'Keep charging and desk cables tidy and close at hand.', category: 'Accessories', image: 'https://picsum.photos/seed/cable-organizer/600/400', rating: 4.0, stock: 50, tags: ['organization', 'desk'] },
  { id: 15, name: 'Monitor Stand', price: 72, description: 'Raise your display and add useful storage to your desk.', category: 'Workspace', image: 'https://picsum.photos/seed/monitor-stand/600/400', rating: 4.7, stock: 7, tags: ['ergonomic', 'storage'] },
  { id: 16, name: 'USB Microphone', price: 84, description: 'Clear plug-and-play audio for meetings and podcasts.', category: 'Audio', image: 'https://picsum.photos/seed/usb-microphone/600/400', rating: 4.5, stock: 13, tags: ['usb', 'recording'] },
];
