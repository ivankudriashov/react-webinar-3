/**
 * Изменение формата даты
 * @param data
 * @returns {string}
 */

export default function dataChange(data) {
    const newDate = new Date(Date.parse(data));
    const  options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return newDate.toLocaleDateString('ru-RU', options)
}