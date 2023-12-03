import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    ìmageURL: "",
    price: null,
    category: "",
    brand: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (event) => {};

  const addProduct = (event) => {
    event.preventDefault();
    console.log(product);
  };

  return (
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            required
            value={product.name}
            name="name"
            onChange={(event) => handleInputChange(event)}
          />
          <label>Product Image:</label>
          <Card cardClass={styles.group}>
            <div className={styles.progress}>
              <div className={styles["progress-bar"]} style={{ width: "50%" }}>
                Uploading 50%
              </div>
            </div>
            <input
              type="file"
              placeholder="Product image"
              accept="image/*"
              value={product.imageURL}
              name="image"
              onChange={(event) => handleImageChange(event)}
            />
            <input type="text" required name="imageURL" disabled />
          </Card>
          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Product price"
            required
            value={product.price}
            name="price"
            onChange={(event) => handleInputChange(event)}
          />
          <label>Product Category:</label>
          <select
            name="category"
            required
            value={product.category}
            onChange={(event) => handleInputChange(event)}
          >
            <option value="" disabled>
              -- Choose product category --
            </option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
          <label>Product Brand:</label>
          <input
            type="text"
            placeholder="Product brand"
            required
            value={product.brand}
            name="brand"
            onChange={(event) => handleInputChange(event)}
          />
          <label>Product Description:</label>
          <textarea
            placeholder="Product description here"
            required
            cols="30"
            rows="10"
            value={product.description}
            name="description"
            onChange={(event) => handleInputChange(event)}
          />
          <button className="--btn --btn-primary">Save Product</button>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
