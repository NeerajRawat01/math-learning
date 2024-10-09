import React, { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { localStorageService } from '../../services/LocalStorageService';
import { authLogoutAction } from '../../store/actions/auth.action';
import {
  isAuthLoadingSelector,
  loggedInUserSelector,
} from '../../store/selectors/auth.selector';
import { webRoutes } from '../../utils/constants/webRoutes.constants';
import Header from './Header';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isUserLoading = useSelector(isAuthLoadingSelector);
  const loggedInUser = useSelector(loggedInUserSelector);

  useEffect(() => {
    if (location.pathname === '/' && !isUserLoading && !loggedInUser) {
      navigate(webRoutes.auth.login());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, loggedInUser, isUserLoading]);

  const onLogout = () => {
    localStorageService.removeAuthToken();
    dispatch(authLogoutAction());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authContextValue = useMemo(() => ({ onLogout }), []);

  return isUserLoading ? null : (
    <AuthContext.Provider value={authContextValue}>
      <div className='flex flex-col h-full'>
        <Header user={loggedInUser} />
        <div className='flex-1 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
