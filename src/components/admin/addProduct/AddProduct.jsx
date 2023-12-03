import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { toast } from "react-toastify";

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
    price: 0,
    category: "",
    brand: "",
    description: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `eShopBLab/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

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
            {uploadProgress === 0 ? null : (
              <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}%`
                    : "Upload complete."}
                </div>
              </div>
            )}
            <input
              type="file"
              placeholder="Product image"
              accept="image/*"
              value={product.imageURL}
              name="image"
              onChange={(event) => handleImageChange(event)}
            />
            {product.ìmageURL === "" ? null : (
              <input type="text" required name="imageURL" disabled />
            )}
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
