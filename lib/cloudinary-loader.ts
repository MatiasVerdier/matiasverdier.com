export default function cloudinaryLoader({ src, width, quality }) {
  const parsedSource = src.replace(
    'https://res.cloudinary.com/matiasvj/image/upload/',
    ''
  );

  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  return `https://res.cloudinary.com/matiasvj/image/upload/${params.join(
    ','
  )}/${parsedSource}`;
}
