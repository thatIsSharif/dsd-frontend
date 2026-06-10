import {useNavigate} from 'react-router';
import {useEffect} from 'react';
import {ProtectedRouteProps} from './propTypes/types.ts';

function ProtectedRoute({children}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const auth = localStorage.getItem('auth');

  useEffect(() => {
    if (auth !== 'true') {
      navigate('/login');
    }
  });

  if (auth === 'true') {
    return <>{children}</>;
  }
  return null;
}

export default ProtectedRoute;
