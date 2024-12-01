import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppError, AuthenticationError, handleError } from '../utils/error';
import { useAuth } from '../contexts/AuthContext';

export const useErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleError = useCallback(
    (error: unknown) => {
      const appError = handleError(error);

      if (appError instanceof AuthenticationError) {
        logout();
        navigate('/login');
        return;
      }

      // Handle other types of errors
      switch (appError.statusCode) {
        case 404:
          navigate('/404');
          break;
        case 403:
          navigate('/403');
          break;
        case 500:
          navigate('/500');
          break;
        default:
          // Handle other error cases
          console.error('Unhandled error:', appError);
      }

      return appError;
    },
    [navigate, logout]
  );

  return { handleError };
};
