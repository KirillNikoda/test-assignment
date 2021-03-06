import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to={'/'} style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
          <Typography variant="h6">Products</Typography>
        </Link>
        <Link to={'/admin'} style={{ color: 'white', textDecoration: 'none' }}>
          <Typography variant="h6">Admin</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
