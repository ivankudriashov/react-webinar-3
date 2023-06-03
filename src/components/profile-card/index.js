import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ProfileCard({profileTitle, profileName, profilePhone, profileEmail, name, phone, email}) {
  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <div className={cn('prop', {size: 'big'})}>
        <div className={cn('label')}>{profileTitle}</div>
      </div>
       <div className={cn('prop')}>
        <div className={cn('label')}>{profileName}:</div>
        <div className={cn('value')}>{name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{profilePhone}:</div>
        <div className={cn('value')}>{phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{profileEmail}:</div>
        <div className={cn('value')}>{email}</div>
      </div>

    </div>
  )
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  profileTitle: PropTypes.string,
  profileName: PropTypes.string,
  profilePhone: PropTypes.string,
  profileEmail: PropTypes.string
}

export default memo(ProfileCard);
