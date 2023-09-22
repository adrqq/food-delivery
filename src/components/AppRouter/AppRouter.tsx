/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { Layout } from '../Layout';
import { Sidebar } from '../Sidebar';
import { ActivationPage } from '../../pages/ActivationPage';
import { AuthPage } from '../../pages/AuthPage';
import { Login } from '../../pages/AuthPage/components/Login';
import { Registration } from '../../pages/AuthPage/components/Registration';
import { DashboardPage } from '../../pages/DashboardPage';
import { MenuPage } from '../../pages/MenuPage';
import { OrderMobile } from '../../pages/MenuPage/components/OrderMobile';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { NotificationPage } from '../../pages/NotificationPage';
import { PaymentMobile } from '../../pages/PaymentMobile';
import { ProductPage } from '../../pages/ProductPage';
import { SearchPage } from '../../pages/SearchPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { CreateProduct } from '../../pages/SettingsPage/components/EditingBlock/components/CreateProduct';
import { EditProduct } from '../../pages/SettingsPage/components/EditingBlock/components/EditProduct';
import { ProductManagement } from '../../pages/SettingsPage/components/EditingBlock/components/ProductManagement';
import { Security } from '../../pages/SettingsPage/components/EditingBlock/components/Security';
import { PagePath } from '../../types/PagePath';
import { BurgerMenu } from '../BurgerMenu';
import { Header } from '../Header';

import s from '../../App.module.scss';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PagePath.MENU} replace />} />
      <Route path={PagePath.AUTH} element={<Navigate to={PagePath.LOGIN} />} />

      {/* Nested Layout Route */}
      <Route path="/" element={<Layout />}>
        <Route path={PagePath.MENU} element={<MenuPage />} />
        <Route path={PagePath.DASHBOARD} element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};
