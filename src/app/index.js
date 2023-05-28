import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ProductsDetails from './products-details';

function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Main />}
          // loader={rootLoader}
          // action={rootAction}
          // errorElement={<ErrorPage />}
        />
        <Route
          path="/products/:id"
          element={<ProductsDetails />}
          // loader={rootLoader}
          // action={rootAction}
          // errorElement={<ErrorPage />}
        />
      
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>

  );
}

export default App;
