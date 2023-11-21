import React, { useContext } from 'react';
import { ProductsContext } from '../Global/ProductsContext';
import { CartContext } from '../Global/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Products.css'; // Import your CSS file for styling

export const Products = () => {
    const { products } = useContext(ProductsContext);
    const { dispatch } = useContext(CartContext);

    const addToCart = (product) => {
        // Dispatch the action to add the product to the cart
        dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });

        // Display a toast notification
        toast.success(`${product.ProductName} added to cart!`);
    };

    return (
        <div className='products-container'>
            {products.length !== 0 && <h1 className='title-products'>Products</h1>}
            {products.length === 0 && <div className='no-products-msg'>No products to display</div>}
            {products.map(product => (
                <div className='product-card' key={product.ProductID}>
                    <div className='product-img'>
                        <img src={product.ProductImg} alt="Product" />
                    </div>
                    <div className='product-details'>
                        <div className='product-name'>{product.ProductName}</div>
                        <div className='product-price'>Rs {product.ProductPrice}.00</div>
                    </div>
                    <button className='addcart-btn' onClick={() => addToCart(product)}>ADD TO CART</button>
                </div>
            ))}
        </div>
    );
};
