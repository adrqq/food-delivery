/* eslint-disable no-console */
/* eslint-disable max-len */
import { Route, Routes } from 'react-router-dom';
import s from './EditingBlock.module.scss';

// import { ProductManagement } from './components/ProductManagement';
import { Security } from './components/Security';
import { ProductManagement } from './components/ProductManagement';
import { CreateProduct } from './components/CreateProduct';
import { EditProduct } from './components/EditProduct';

export const EditingBlock = () => {
  return (
    <div className={s.editing__block}>
      <Routes>
        <Route path="products-management" element={<ProductManagement />} />
        <Route path="security" element={<Security />} />
        <Route path="products-management/create-product" element={<CreateProduct />} />
        <Route path="products-management/edit-product" element={<EditProduct />} />
      </Routes>
    </div>
  );
};
