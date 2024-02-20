import { Router } from '@solidjs/router';
import App from './App';

const Server = ({ url }) => {
  return (
    <Router url={url}>
      <App />
    </Router>
  );
};

export default Server;
