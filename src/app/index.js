import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import useStore from '../hooks/use-store';
import Profile from './profile';
import useInit from '../hooks/use-init';
import ProtectedRoute from '../containers/protected-route';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    loading: state.login.loading,
    isAuth: state.login.isAuth,
  }));

  useInit(() => {
      store.actions.login.getUser();
    }, [], true
  );
  
  return (
    select.loading ? null
      :
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'} 
          element={
            <ProtectedRoute isAuth={select.isAuth} url={'/'}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route path={'/profile'}
          element={
            <ProtectedRoute isAuth={!select.isAuth} url={'/login'}>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
