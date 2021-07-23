import { Box, makeStyles } from '@material-ui/core';

import { Header } from './components/Header';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';

const useStyles = makeStyles({
  root: {
    padding: '30px',
  },
});

function App() {
  const styles = useStyles();

  return (
    <Box>
      <Router>
        <Header />
        <Box className={styles.root}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
          </Switch>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
