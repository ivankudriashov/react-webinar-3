import {useCallback, useState, useMemo, useLayoutEffect} from "react";
import useServices from "./use-services";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  // const store = useStore();
  const services = useServices()

  // Текущая локаль
  // const lang = useSelector(state => state.locale.lang);
  const [lang, setLanguage] = useState(services.i18n.lang);

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return services.i18n.subscribe((lang) => {
      setLanguage(lang);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  // Функция для смены локали
  const setLang = useCallback(lang => services.i18n.setLang(lang), []);
  // Функция для локализации текстов
  const t = useCallback((text, number) => services.i18n.translate(lang, text, number), [services.i18n.lang]);
  
  return {lang, setLang, t};
}
