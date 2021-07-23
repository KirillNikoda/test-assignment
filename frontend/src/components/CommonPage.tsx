import { Box, makeStyles, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { CustomCard } from '../components/Card';
import { IProduct, IUpdateProduct } from '../models/IProduct';
import { URL } from '../utils/constants';
import { AdminCard } from './AdminCard';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '30px',
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '30px',
    marginTop: '50px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    width: '300px',
    transition: '0.1s ease-in-out',
    cursor: 'pointer',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

interface Props {
  isAdmin: boolean;
}

export const CommonPage = ({ isAdmin }: Props) => {
  const styles = useStyles();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [productName, setProductName] = useState<string>('');

  const deleteProduct = async (id: string) => {
    const url = `${URL}/products/${id}`;
    const options = {
      method: 'DELETE',
    };
    await fetch(url, options);
    const newProducts = products.filter((product) => product._id !== id);
    setProducts(newProducts);
    setFilteredProducts(newProducts);
  };

  const updateProduct = async (id: string, product: Partial<IProduct>) => {
    console.log(id, product);

    const url = `${URL}/products/${id}`;
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(product),
    };
    await fetch(url, options);
  };

  useEffect(() => {
    fetch(`${URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
        setFilteredProducts(res);
        console.log(res);
      });
  }, []);

  function filterProducts(e: any) {
    setProductName(e.currentTarget.value);

    if (e.currentTarget.value.length === 0) {
      setFilteredProducts(products);
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(e.currentTarget.value.toLowerCase() || product.name.toLowerCase().includes('')),
    );

    setFilteredProducts(filteredProducts);
  }

  return (
    <Box className={styles.container}>
      <TextField
        value={productName}
        onChange={filterProducts}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />

      {!isAdmin && (
        <Box className={styles.root}>
          {filteredProducts.map((product: IProduct, index: any) => (
            <CustomCard key={index} {...product} />
          ))}
        </Box>
      )}

      {isAdmin && (
        <Box className={styles.root}>
          {filteredProducts.map((product: IProduct, index: any) => (
            <AdminCard
              key={index}
              {...product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
