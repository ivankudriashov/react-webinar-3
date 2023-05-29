import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Paginations from '../../components/paginations';
import HeaddingMenu from '../../components/headding-menu';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    skip: state.catalog.skip,
    pagesNumber: state.catalog.total,
    numberOfItems: state.catalog.numberOfItems,
    targetPage: state.catalog.targetPage,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load(select.skip);
  }, [select.skip]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменения страницы каталога
    chahgeProductPage: useCallback(skip => store.actions.catalog.skipChange(skip), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item to={`/products/${item._id}`} item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <HeaddingMenu onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Paginations numberOfItems={select.numberOfItems} targetPage={select.targetPage} total={select.pagesNumber} onPageChange={callbacks.chahgeProductPage}/>
    </PageLayout>
  );
}

export default memo(Main);
