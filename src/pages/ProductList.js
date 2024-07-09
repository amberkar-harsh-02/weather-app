import { useState, useEffect } from "react";
import { AddProductForm } from "./AddForm";

let initialProducts = [
  { id: 1, name: "iphone 15 pro max", brand: "Apple", category: "phone", price: 1879, quantity: 2 },
  { id: 2, name: "iphone 15 pro", brand: "Apple", category: "phone", price: 1469, quantity: 2 },
  { id: 3, name: "iphone 15 plus", brand: "Apple", category: "phone", price: 829, quantity: 2 }
];

export default function ProductList() {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem('products')) || initialProducts
  );

  function deleteProduct(index) {
    const newProducts = products.filter((product, i) => i !== index);
  
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  function addProduct(newProduct) {
    const newId = Math.max(...products.map((product) => product.id)) + 1;
    const newProductWithId = {...newProduct, id: newId };
    setProducts([...products, newProductWithId]);
    localStorage.setItem('products', JSON.stringify([...products, newProductWithId]));
  }

  const ProductItem = ({ index, product }) => {
    function increment() {
      const newProducts = [...products];
      newProducts[index].quantity++;
      setProducts(newProducts);
      localStorage.setItem('products', JSON.stringify(newProducts));
    }
  
    function decrement() {
      const newProducts = [...products];
      if (newProducts[index].quantity >= 1) {
        newProducts[index].quantity--;
      }
      setProducts(newProducts);
      localStorage.setItem('products', JSON.stringify(newProducts));
    }
  
    return (
      <div className="row border-bottom align-items-center" >
        <div className="col-4">
          <h4>{product.name}</h4>
          <p>
            Brand: {product.brand}<br />
            Category: {product.category}<br />
            Unit Price: ${product.price}
          </p>
        </div>
        <div className="col-2">
          <ControlledCounter decrement={decrement} increment={increment}>
            {product.quantity}
          </ControlledCounter>
        </div>
        <div className="col-2">
          <span className="rounded border m-1 p-1">
            $ {product.quantity * product.price}
          </span>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => deleteProduct(index)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  const productElements = products.map((product, index) => (
    <ProductItem
      key={product.id}
      index={index}
      product={product}
    />
  ));

  return (
    <div className="container">
      <AddProductForm addProduct={addProduct} />
      {productElements}
    </div>
  );
}

function ControlledCounter(props) {
  return (
    <div >
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={props.increment}
      >
        +
      </button>
      <span className="rounded border m-2 p-2">{props.children}</span>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={props.decrement}
      >
        -
      </button>
    </div>
  );
}