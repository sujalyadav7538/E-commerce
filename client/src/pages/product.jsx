/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {useParams} from 'react-router-dom';
import { ShopContext } from '../context/shopcontext';
import Breadcrums from '../components/braedcrums';
import { ProductDisplay } from '../components/productDisplay';
import { Descriptionbox } from '../components/descriptionbox';
import { RelatedProducts } from '../components/relatedProducts';

export default function Product () {
    const params=useParams();
    const {all_product}=useContext(ShopContext);
    const product=all_product.find((e)=> e.id===Number(params.id));
    // console.log(product,all_product,params.id)

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <Descriptionbox/>
      <RelatedProducts/>
      </div>
  )
}
