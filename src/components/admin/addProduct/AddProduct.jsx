import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];
const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  description: "",
};
const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);
  const detectForm = (id, func1, func2) => {
    if (id === "add") {
      return func1;
    }
    return func2;
  };
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const productEdit = products.find((prod) => prod.id === id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

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
    // console.log(product);
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product added successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (productEdit.imageURL !== product.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        description: product.description,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product edited successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
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
                name="image"
                onChange={(event) => handleImageChange(event)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
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
            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
