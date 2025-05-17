import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

interface ProductImageGalleryProps {
  /** Array of image URLs */
  images: Array<string>;
}

interface ImageItem {
  id: number;
  url: string;
  alt: string;
}



const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images }) => {
  const formatted: Array<ImageItem> = images.map((url, idx) => ({
    id: idx,
    url,
    alt: `Product image ${idx + 1}`,
  }));

  const [selected, setSelected] = useState<ImageItem | null>(formatted[0] ?? null);

  useEffect(() => {
    setSelected(formatted[0] ?? null);
  }, [images]);

  if (!selected) return null;

  return (
    <Box sx={{ width: { xs: '100%', sm: 500 }, mx: 'auto', p: 2 }}>
      <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box
          component="img"
          src={selected.url}
          alt={selected.alt}
          sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
        />
      </Card>

      {/* Thumbnails */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        {formatted.map((img) => (
          <Box 
            key={img.id} 
            sx={{ 
              width: { xs: 'calc(25% - 6px)', sm: 'calc(16.666% - 7px)' }
            }}
          >
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: img.id === selected.id ? 4 : 1,
                border: img.id === selected.id ? '2px solid #1976d2' : 'none',
              }}
            >
              <CardActionArea onClick={() => setSelected(img)}>
                <Box
                  component="img"
                  src={img.url}
                  alt={img.alt}
                  sx={{ width: '100%', height: 60, objectFit: 'contain' }}
                />
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductImageGallery;