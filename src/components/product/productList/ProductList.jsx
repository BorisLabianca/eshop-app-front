import { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
} from "../../../redux/features/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((store) => store.filter);
  const [grid, setGrid] = useState(true);
  const [searchResult, setSearchResult] = useState("");
  const [sorts, setSorts] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, searchResult }));
  }, [searchResult, products, dispatch]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sorts }));
  }, [sorts, products, dispatch]);

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Product
            {filteredProducts.length !== 1 && "s"} found.
          </p>
        </div>
        <div>
          <Search
            value={searchResult}
            onChange={(event) => setSearchResult(event.target.value)}
          />
        </div>
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select
            value={sorts}
            onChange={(event) => setSorts(event.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
