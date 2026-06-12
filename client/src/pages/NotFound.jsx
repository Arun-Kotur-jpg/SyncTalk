import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-dark-950 text-center px-4">
      <h1 className="text-9xl font-bold text-dark-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-dark-200 mb-2">Page not found</h2>
      <p className="text-dark-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
