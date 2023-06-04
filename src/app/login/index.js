import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';

function Login() {

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.login.error,
  }));

  const callbacks = {
    onLogin: useCallback((data) => {
      store.actions.login.login(data);
     }, []),
  }

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm t={t} error={select.error} title={t('title.login')} onAction={callbacks.onLogin}/>
    </PageLayout>
  );
}

export default memo(Login);
