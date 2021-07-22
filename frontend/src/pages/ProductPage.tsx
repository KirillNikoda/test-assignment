import { useEffect } from 'react';
import { useState } from 'react';
import { IProduct } from '../models/IProduct';
import { useParams } from 'react-router-dom';
import { CustomCard } from '../components/Card';
import { URL } from '../utils/constants';
import { Box } from '@material-ui/core';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams() as any;

  useEffect(() => {
    fetch(`${URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, [id]);

  if (product) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
        <CustomCard {...product} isExactCard />
      </Box>
    );
  }
  return null;
};
