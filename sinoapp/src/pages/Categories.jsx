import React from 'react';
import Pagination from '../components/paginaton';
import Category from '../components/categoryLists';
import HomeLinks from '../components/homeLinks';
import { useParams } from 'react-router-dom';


const Categories = () => {
  const { type } = useParams()

  return (
    <div>
      <Category type={type}/>
    </div>
  );
};

export default Categories;