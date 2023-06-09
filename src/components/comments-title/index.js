import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentTitle({text}){

  return (
    <div className="Comment-title">
        {text}
    </div>
  )
}

CommentTitle.propTypes = {
  text: PropTypes.string,
};

export default memo(CommentTitle);
