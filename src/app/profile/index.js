import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../components/profile-card';

function Profile() {
  const token = localStorage.getItem('token');

  const select = useSelector(state => ({
    userName: state.login.user.name,
    userPhone: state.login.user.phone,
    userEmail: state.login.user.email,
  }));

  const {t} = useTranslate();

  if(!token) {
    return <Navigate to='/login' />;
  }

  return (
      <PageLayout>
        <LoginMenu />
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation />
        <ProfileCard profileTitle={t('profile.title')} profileName={t('profile.name')} profilePhone={t('profile.phone')} profileEmail={t('profile.email')} name={select.userName} phone={select.userPhone} email={select.userEmail} />
      </PageLayout>
  );
}

export default memo(Profile);
