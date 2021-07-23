import {
  CardContent,
  Box,
  Typography,
  CardActions,
  Card,
  Button,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { IProduct, IUpdateProduct } from '../models/IProduct';

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
  name: string;
  remainingCount: number;
  price: number;
  _id: string;
  isExactCard?: boolean;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (id: string, product: Partial<IProduct>) => Promise<void>;
}

export const AdminCard = (props: Props) => {
  const styles = useStyles();

  const [editable, setEditable] = useState<boolean>(false);

  const [productName, setProductName] = useState<string>(props.name);
  const [productPrice, setProductPrice] = useState<number>(props.price);
  const [productRemainingCount, setProductRemainingCount] = useState<number>(props.remainingCount);

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.description}>
          {!editable && <Typography>Title:</Typography>}
          {editable ? (
            <TextField
              id="standard-basic"
              label="Title"
              value={productName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductName(e.currentTarget.value)
              }
            />
          ) : (
            <Typography variant="h5" component="h2">
              {productName}
            </Typography>
          )}
        </Box>
        <Box className={styles.description}>
          {!editable && <Typography>Price:</Typography>}
          {editable ? (
            <TextField
              id="standard-basic"
              label="Price"
              value={productPrice}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductPrice(+e.currentTarget.value)
              }
            />
          ) : (
            <Typography color="textSecondary">{productPrice}</Typography>
          )}
        </Box>
        <Box className={styles.description}>
          {!editable && <Typography>Count in stock:</Typography>}
          {editable ? (
            <TextField
              id="standard-basic"
              label="Price"
              value={productRemainingCount}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductRemainingCount(+e.currentTarget.value)
              }
            />
          ) : (
            <Typography color="textSecondary">{productRemainingCount}</Typography>
          )}
        </Box>
      </CardContent>
      {!props.isExactCard && (
        <CardActions>
          <Button
            variant="contained"
            color={editable ? 'secondary' : 'primary'}
            onClick={async () => {
              if (editable) {
                await props.updateProduct(props._id, {
                  price: productPrice,
                  name: productName,
                  remainingCount: productRemainingCount,
                });
                setEditable(!editable);

                return;
              }
              setEditable(!editable);
            }}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.deleteProduct(props._id)}>
            Delete
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
