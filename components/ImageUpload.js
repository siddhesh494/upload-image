// components/ImageUpload.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const ImageUpload = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event) => {
    try {
      setUploading(true);

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('Images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{margin: "10px 0px"}}>
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
      />
    </div>
  );
};

export default ImageUpload;
