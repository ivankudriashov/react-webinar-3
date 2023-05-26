import {memo, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { productListPagination } from "../../utils";

function Paginations({total, targetPage, onPageChange, numberOfItems}) {

  const cn = bem('Paginations');

  const numberOfPages = Math.ceil(total / numberOfItems);

  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
		setPagesArray(productListPagination(numberOfPages, targetPage));
  }, [numberOfPages, targetPage])

  return (
    <div className={cn()}>
        {pagesArray.map((pageNumber) => 
				typeof pageNumber === 'string' ?
				 <div className={cn('ellipsis')} key={Math.random()}>...</div> 
				 :
					<button className={pageNumber === targetPage - 1 ? cn('button', {active: 'true'}) : cn('button')} key={pageNumber} onClick={() => {
							onPageChange(pageNumber);
					}}>
							{pageNumber + 1}
					</button>
        )}
    </div>
  );
}

Paginations.propTypes = {
	onPageChange: PropTypes.func,
	total: PropTypes.number.isRequired,
	targetPage: PropTypes.number.isRequired,
	numberOfItems: PropTypes.number.isRequired,
}

Paginations.defaultProps = {
  onPageChange: () => {},
}

export default memo(Paginations);