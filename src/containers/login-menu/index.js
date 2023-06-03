import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginTool from "../../components/login-tool";
import useTranslate from "../../hooks/use-translate";

function LoginMenu() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userName: state.login.user.name,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logout();
     }, []),
  }

  return (
    <LoginTool exit={t('exit')} enter={t('enter')} onExit={callbacks.onLogout} userName={select.userName}/>
  );
}

export default memo(LoginMenu);
