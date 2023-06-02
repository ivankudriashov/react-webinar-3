import StoreModule from "../module";
import {redirect} from 'react-router-dom';
/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class LoginState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {
        name: '',
        phone: '',
        email: ''
      },
      error: null,
      isLogged: false,
    }
  }

  /**
   * Отправка логина и пароля для идентификации
   * @param data {Object} Логин и пароль
   * @returns {Promise<void>}
   */
  async login(data) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      if (response.ok) {
        // Запись токена в LocalStorage
        localStorage.setItem('token', json.result.token)
        // Добавление данных о пользователе в store
        this.setState({
          user: {
            name: json.result.user.profile.name,
            phone: json.result.user.profile.phone,
            email: json.result.user.email
          },
          error: null,
          isLogged: true,
        }, 'Пользователь авторизовался');

        // redirect("/");

      } else {
        // Ошибка авторизации
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
        }, 'Произошла ошибка');
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Отправка выход из профиля
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      if (response.ok) {
        // Удаление токена из LocalStorage
        localStorage.removeItem('token')
        // Удаление данных о пользователе из store
        this.setState({
          user: {
            name: '',
            phone: '',
            email: ''
          },
          error: null,
          isLogged: false,
        }, 'Пользователь успешно вышел из профиля');
      } else {
        // Ошибка выхода из профиля
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
        }, 'Ошибка выхода из профиля');
      }
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Получение данных пользователя
   * @param token {String} Логин и пароль
   * @returns {Promise<void>}
   */
  async getUserInfo(token) {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      // console.log(json)
      if (response.ok) {
        // Добавление данных о пользователе в store
        this.setState({
          user: {
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
          },
          error: null,
          isLogged: true
        }, 'Пользователь авторизовался');

      } else {
        // Ошибка авторизации
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message
        }, 'Произошла ошибка авторизации');
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default LoginState;
