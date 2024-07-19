// pages/index.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ImageUpload from '../components/ImageUpload';

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase.storage.from('Images').list('');
    if (error) {
      console.error(error);
    } else {
      setImages(data);
    }
  };

  const getPublicUrl = (path) => {
    return supabase.storage.from('Images').getPublicUrl(path).data.publicUrl;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>Image Upload</h1>
      <ImageUpload onUpload={fetchImages} />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: "50px", justifyContent: 'center' }}>
        {images.map((image) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.name}
            src={getPublicUrl(image.name) || ''}
            alt={image.name}
            style={{ width: 300, height: 300, objectFit: 'cover', margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
