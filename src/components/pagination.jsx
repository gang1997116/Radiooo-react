import React from "react";
//import _ from "lodash";
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';


const GPagination = (props) => {
  const { itemsCount, pageSize ,currentPage,onPageChange} = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if(pagesCount===1){return null;}
  
  const handleChange = (event, value) => {
    onPageChange(value);
  };
  return (
    <Pagination
              page={currentPage}
              count={pagesCount}
              onChange={handleChange}
              size="large"
            />
  );
};

GPagination.propTypes = {
  itemsCount:PropTypes.number.isRequired,
   pageSize:PropTypes.number.isRequired,
   currentPage:PropTypes.number.isRequired,
   onPageChange:PropTypes.func.isRequired,
}; //检查类型

export default GPagination;
