import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  };

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    // Поиск элемента в списке list по коду.
    const item = this.state.list.find(i => i.code === code);
    // Фильтр повторяющихся в корзине элементов
    const includedItem = this.state.cart.items.filter(i => i.code === code);

    let filteredItems;
    
    if(includedItem.length === 0) {
      filteredItems = [...this.state.cart.items, {...item, count: 1}]
    } else {
      filteredItems = this.state.cart.items.map(i => {
        if (i.code === code) {
          return {...i, count: i.count + 1};
        }

        return i;
      })
    }

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        total: this.state.cart.total + item.price,
        items: filteredItems
      }
    })
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
    deleteItemFromCart(code) {
      // Поиск элемента в списке cards.item по коду.
      const item = this.state.cart.items.find(i => i.code === code);

      this.setState({
        ...this.state,
        cart: {
          ...this.state.cart,
          total: this.state.cart.total - item.price * item.count,
          // Новый список, в котором не будет удаляемой записи
          items: this.state.cart.items.filter(item => item.code !== code)
        }
      })
    }

  /**
   * Открытие корзины
   */
  openCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpen: true
      }
    })
  }

  /**
   * Закрытие корзины
   */
  closeCart() {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        isOpen: false
      }
    })
  }
}

export default Store;
