import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProfileCard({name, phone, email}) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('prop', {size: 'big'})}>
        <div className={cn('label')}>Профиль</div>
      </div>
       <div className={cn('prop')}>
        <div className={cn('label')}>Имя: </div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>Телефон:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{email}</div>
      </div>

    </div>
  )
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
}

export default memo(ProfileCard);
