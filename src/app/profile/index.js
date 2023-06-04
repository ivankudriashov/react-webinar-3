import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from '../../containers/login-menu';
import useSelector from '../../hooks/use-selector';
import ProfileCard from '../../components/profile-card';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';

function Profile() {
  const store = useStore();

  useInit(() => {
      store.actions.profile.getUserInfo();
    }, [], true
  );

  const select = useSelector(state => ({
    userName: state.profile.user.name,
    userPhone: state.profile.user.phone,
    userEmail: state.profile.user.email,
    loading: state.profile.loading
  }));

  const {t} = useTranslate();

  return (
    select.loading ? 
    <PageLayout>
      <Head title={t('loading')}></Head>
    </PageLayout>
    :
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
