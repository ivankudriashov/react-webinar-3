import {memo, useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from 'react-router-dom';
import ProductCard from '../../components/product-card';
import HeaddingMenu from '../../components/headding-menu';

function ProductsDetails() {
  const params = useParams();

  const store = useStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const request =  async () => {
      await store.actions.product.loadProduct(params.id);
      setLoaded(true);
    }
    request();
  }, [params.id]);

  const select = useSelector(state => ({
    item: state.product.item,
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
    loaded ?
    <PageLayout>
      <Head title={`${title}`} />
      <HeaddingMenu onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      <ProductCard item={select.item} onAdd={callbacks.addToBasket} />
    </PageLayout>
    :
    <PageLayout>
      <Head title={`Загрузка...`} />
    </PageLayout>
  );
}

export default memo(ProductsDetails);
