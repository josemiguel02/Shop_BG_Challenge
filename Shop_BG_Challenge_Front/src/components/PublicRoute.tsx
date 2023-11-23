import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PublicRouteProps {
  redirectTo: string;
}

export const PublicRoute: FC<PublicRouteProps> = ({ redirectTo }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
