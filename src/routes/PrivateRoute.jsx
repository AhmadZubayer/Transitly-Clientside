import React, { use, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    if (!loading) {
      setHasCheckedAuth(true);
    }
  }, [loading]);

  if (loading || !hasCheckedAuth) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/signin" state={{from: location.pathname}}></Navigate>;
};

export default PrivateRoute;