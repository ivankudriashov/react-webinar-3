import StoreModule from "../module";
/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class ProfileState extends StoreModule {

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
      loading: true
    }
  }

  /**
   * Получение данных пользователя
   * @param token {String} Логин и пароль
   * @returns {Promise<void>}
   */
  async getUserInfo() {
    const token = localStorage.getItem('token');

    if(!token) {
      this.setState({
        ...this.getState(),
        loading: false
      })

      return
    }

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (response.ok) {
        // Добавление данных о пользователе в store
        this.setState({
          user: {
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email
          },
          error: null,
          loading: false
        }, 'Данные пользователя загружены');
      } 
      else {
        // Ошибка авторизации
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
          loading: false
        }, 'Произошла ошибка загрузки данных');
      }
    } catch (e) {
      console.log(e);
    }

  }
}

export default ProfileState;
