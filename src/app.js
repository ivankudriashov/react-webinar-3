import React, {useCallback} from 'react';
import List from "./components/list";
import Item from "./components/item";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cartList = store.getState().cart.items;
  const itemsPrice = store.getState().cart.total;
  const itemsInCartCount = store.getState().cart.items.length;
  const isCartOpen = store.getState().cart.isOpen;

  const callbacks = {
    onOpenCart: useCallback(() => {
      store.openCart();
    }, [store]),

    onCloseCart: useCallback(() => {
      store.closeCart();
    }, [store]),

    onAddItemToCart: useCallback((code) => {
        store.addItemToCart(code);
      }, [store]),

    onDeleteItemFromCart: useCallback((code) => {
      store.deleteItemFromCart(code);
    }, []),

    itemsListRender: useCallback((item) => {
      return <Item item={item} actionFunction={callbacks.onAddItemToCart} button={'Добавить'}/>
    }, []),
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls count={itemsInCartCount} price={itemsPrice} openCart={callbacks.onOpenCart}/>
      <List list={list} itemRender={callbacks.itemsListRender} />
      {isCartOpen &&
        <Cart
          actionFunction={callbacks.onDeleteItemFromCart}
          total={itemsPrice} list={cartList}
          onClose={callbacks.onCloseCart} />
      }
    </PageLayout>
  );
}

export default App;
