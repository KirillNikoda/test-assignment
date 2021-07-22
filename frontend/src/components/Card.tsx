import {
  CardContent,
  Box,
  Typography,
  CardActions,
  Card,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  name: string;
  remainingCount: number;
  price: number;
  _id: string;
  isExactCard?: boolean;
}

export const CustomCard = (props: Props) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardContent>
        <Box className={styles.description}>
          <Typography>Title:</Typography>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
        </Box>
        <Box className={styles.description}>
          <Typography>Price:</Typography>
          <Typography color="textSecondary">{props.price}</Typography>
        </Box>
        <Box className={styles.description}>
          <Typography>Count in stock:</Typography>
          <Typography variant="body2" component="p">
            {props.remainingCount}
          </Typography>
        </Box>
      </CardContent>
      {!props.isExactCard && (
        <CardActions>
          <Link to={`product/${props._id}`} style={{ color: 'white', textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Details
            </Button>
          </Link>
        </CardActions>
      )}
    </Card>
  );
};
