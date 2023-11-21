import React, { createContext, useEffect, useState } from 'react';
import { db } from '../Config/Config';
import { collection, onSnapshot } from 'firebase/firestore';

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsRef = collection(db, 'Products');
        const unsubscribe = onSnapshot(productsRef, (snapshot) => {
            const updatedProducts = snapshot.docs.map((doc) => ({
                ProductID: doc.id,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImg: doc.data().ProductImg,
            }));
            setProducts(updatedProducts);
        });

        // Cleanup
        return () => unsubscribe();
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {props.children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
