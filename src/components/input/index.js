import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), props.delay),
    [props.onChange, props.name, props.delay]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <div>
      {props.label && 
        <div className={cn('label')}>{props.t(props.label)}</div>
      }
      <input
        className={cn({theme: props.theme})}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </div>
  )
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  delay: PropTypes.number,
  t: PropTypes.func
}

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  theme: '',
  delay: 0
}

export default memo(Input);
