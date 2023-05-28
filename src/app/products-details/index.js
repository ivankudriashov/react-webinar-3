import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card';

function ProductsDetails() {

  // const store = useStore();

  // useEffect(() => {
  //   store.actions.catalog.load();
  // }, []);

  // const select = useSelector(state => ({
  //   list: state.catalog.list,
  //   amount: state.basket.amount,
  //   sum: state.basket.sum
  // }));

  // const callbacks = {
  //   // Добавление в корзину
  //   addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  //   // Открытие модалки корзины
  //   openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  // }

  // const renders = {
  //   item: useCallback((item) => {
  //     return <Item item={item} onAdd={callbacks.addToBasket}/>
  //   }, [callbacks.addToBasket]),
  // };
  const params = useParams();

  const store = useStore();

  const [loading, setLoadind] = useState(false);

  useEffect(() => {
    const request =  async () => {
      await store.actions.catalog.loadProduct(params.id);
      setLoadind(true);
    }
    request();
  }, [params.id]);

  const select = useSelector(state => ({
    item: state.catalog.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const title = select.item.title ? select.item.title : '';

  return (
    <PageLayout>
      <Head title={`${title}`} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      {loading && <ProductCard item={select.item} onAdd={callbacks.addToBasket} />}
    </PageLayout>
  );
}

export default memo(ProductsDetails);
