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
 * Формирование массива номеров страниц для пагинации
 * @param numberOfItems {Number}
 * @param targetPage {Object}
 * @returns {Array}
 */
export function productListPagination (numberOfItems, targetPage){
  let arr = [];

  if(numberOfItems < 5) {
    for(let i = 0; i < numberOfItems; i++){
      arr.push(i);
    }
    return arr;
  } 
  else {
    if(targetPage < 3) {
      for(let i = 0; i < 5; i++){
        if(i === 3){
          arr.push('...');
          continue;
        }
        
        if(i === 4){
          arr.push(numberOfItems - 1);
          continue;
        }

        arr.push(i);
      }
      return arr;
    } else if (targetPage === numberOfItems || targetPage === numberOfItems - 1) {
      arr.push(0);

      for(let i = numberOfItems - 4; i < numberOfItems; i++){
        if(i === numberOfItems - 4){
          arr.push('...');
          continue;
        }

        arr.push(i);
      }
      return arr;
    } else if (targetPage === 3) {
      for(let i = 0; i < 6; i++) {
        if(i === 4) {
          arr.push('...');
          continue;
        }

        if(i === 5) {
          arr.push(numberOfItems - 1);
          break;
        }
        arr.push(i);
      }

      return arr;
    } else if (targetPage === numberOfItems - 2) {
      arr.push(0);
      arr.push('...');

      for(let i = targetPage - 2; i <= numberOfItems - 1; i++){
        arr.push(i);
      }

      return arr;
    } else {
      arr.push(0);
      arr.push('...');

      for(let i = targetPage - 2; i < targetPage + 1; i++){
        arr.push(i);
      }

      arr.push('...');
      arr.push(numberOfItems - 1);

      return arr;
    }
  }
}
