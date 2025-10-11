export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageId: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  imageId: string;
};

export type MakeupLook = {
  id: string;
  name: string;
  description: string;
  imageId: string;
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number;
  imageId: string;
};

export const products: Product[] = [
  { id: 'prod1', name: 'Velvet Kiss Lipstick', category: 'Lips', price: 24.0, description: 'A rich, creamy lipstick that provides a bold, long-lasting color.', imageId: 'product1' },
  { id: 'prod2', name: 'Celestial Glow Eyeshadow', category: 'Eyes', price: 45.0, description: 'A palette of 12 vibrant, blendable eyeshadows for any occasion.', imageId: 'product2' },
  { id: 'prod3', name: 'Second Skin Foundation', category: 'Face', price: 38.0, description: 'A lightweight, full-coverage foundation with a natural, satin finish.', imageId: 'product3' },
  { id: 'prod4', name: 'Sunbeam Highlighter', category: 'Face', price: 30.0, description: 'A powder highlighter that gives a radiant, lit-from-within glow.', imageId: 'product4' },
  { id: 'prod5', name: 'Sky High Mascara', category: 'Eyes', price: 22.0, description: 'Volumizing and lengthening mascara for dramatic lashes.', imageId: 'product5' },
  { id: 'prod6', name: 'Nail Enamel - Blush', category: 'Nails', price: 12.0, description: 'High-shine, long-lasting nail enamel in a soft blush tone.', imageId: 'product6' },
  { id: 'prod7', name: 'Matte Liquid Lipstick - Rose', category: 'Lips', price: 26.0, description: 'Long-wear matte liquid lipstick with comfortable, non-drying formula.', imageId: 'product7' },
  { id: 'prod8', name: 'Nail Strengthener Serum', category: 'Nails', price: 18.0, description: 'A fortifying serum to strengthen and protect nails.', imageId: 'product8' },
];

export const services: Service[] = [
  { id: 'serv1', name: 'Bridal Makeup', description: 'Complete bridal makeup for your special day, including a pre-wedding trial.', price: 250, duration: '2 hours', imageId: 'service1' },
  { id: 'serv2', name: 'Evening Glam', description: 'A stunning look for any special event, from proms to galas.', price: 120, duration: '90 mins', imageId: 'service2' },
  { id: 'serv3', name: 'Makeup Lesson', description: 'A personalized one-on-one lesson to master your makeup skills.', price: 150, duration: '2 hours', imageId: 'service3' },
];

export const makeupLooks: MakeupLook[] = [
  { id: 'look1', name: 'Natural', description: 'A subtle, fresh-faced look that enhances your natural features.', imageId: 'look_natural' },
  { id: 'look2', name: 'Smokey Eye', description: 'A classic, dramatic look with blended dark eyeshadows.', imageId: 'look_smokey' },
  { id: 'look3', name: 'Bridal', description: 'An elegant and timeless look perfect for your wedding day.', imageId: 'look_bridal' },
  { id: 'look4', name: 'Full Glam', description: 'A bold, sophisticated look with contouring, highlighting, and dramatic eyes.', imageId: 'look_glam' },
];

export const testimonials: Testimonial[] = [
  { id: 'test1', name: 'Jessica M.', quote: 'The virtual try-on tool is a game-changer! I found my perfect lipstick shade without leaving my home.', rating: 5, imageId: 'testimonial1' },
  { id: 'test2', name: 'Samantha P.', quote: 'I booked a makeup lesson and it was fantastic. The artist was so patient and taught me so much. Highly recommend!', rating: 5, imageId: 'testimonial2' },
  { id: 'test3', name: 'Emily R.', quote: 'Gauree Cosmetics has the best quality products. My skin has never looked better!', rating: 5, imageId: 'testimonial3' },
];
