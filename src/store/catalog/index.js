import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
    this._baseLimit = 10;
  }

  initState() {
    return {
      list: [],
      item: {},
      total: 0,
      skip: 0,
      targetPage: 1,
      numberOfItems: 10,
    }
  }

  async load(skip = 0) {
    const response = await fetch(`/api/v1/articles?limit=${this._baseLimit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       list: json.result.items,
       total: json.result.count,
    }, 'Загружены товары из АПИ');
  }

  async loadProduct(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
       ...this.getState(),
       item: json.result
    }, 'Загружен товар по id из АПИ');
  }

  skipChange(skip) {
    this.setState({
      ...this.getState(),
      skip: skip * 10,
      targetPage: skip + 1
   })
  }
}

export default Catalog;
