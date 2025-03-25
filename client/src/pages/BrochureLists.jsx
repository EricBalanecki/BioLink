import React from 'react'
import { useParams } from 'react-router-dom';
import Category from '../components/category';

const BrochureLists = () => {
  const { category } = useParams()

  if (!category) {
    return <h1>Error: Category not found</h1>;
  }
  
  return (
    <Category category={category} />
  )
}

export default BrochureLists