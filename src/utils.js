/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Формирование дерева из массива
 * @param array {Array}
 * @returns {Object}
 */
export function makeTree(array){
  return array.filter(item => {
    item.children = array.filter(i => {
      if(i.parent){
        return i.parent._id === item._id
      }
    });
    return item.parent == null;
  });
}

/**
 * Формирование дерева из массива
 * @param tree {Object}
 * @returns {Array}
 */
export function arrayFromTree(tree){
  let arr = [];

  const rec = (node, prefix) => {
    node.forEach(e => {
      arr.push({value: e._id, title: prefix + e.title})
      const nexPrefix = prefix + '- '
      rec(e.children, nexPrefix);
      if(e.children.length === 0) return;
    })
  }

  rec(tree, '');

  return arr;
}