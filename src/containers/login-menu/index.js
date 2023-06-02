import {memo, useCallback} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import LoginTool from "../../components/login-tool";

function LoginMenu() {
  const store = useStore();

  const select = useSelector(state => ({
    userName: state.login.user.name,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.login.logout();
     }, []),
  }

  return (
    <LoginTool onExit={callbacks.onLogout} userName={select.userName}/>
  );
}

export default memo(LoginMenu);
