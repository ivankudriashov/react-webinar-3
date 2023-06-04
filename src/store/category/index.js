import { arrayFromTree, makeTree } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    }
  }

    /**
   * Загрузка списка категорий
   * @returns {Promise<void>}
   */
    async getCategories() {

      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();

      const tree = makeTree(json.result.items);

      this.setState({
        ...this.getState(),
        categories: [{value: '', title: 'Все'}, ...arrayFromTree(tree)]
      }, 'Загружен список категорий из АПИ');
    }

}

export default CategoryState;
