import React, { useEffect, useState } from "react";
import { IProducts } from "../interfaces/product-interface";
import axios from "axios";
import { IFilterDetails, IFilterResponse } from "../interfaces/filter-interface";
import { Link } from "react-router-dom";

interface FilterCategoryProps {
  filter: IFilterResponse;
  handleFilterChange: (filterName: number, filterValue: string) => void;
}

interface FilterNameProps {
  name: IFilterDetails;
  handleFilterChange: (filterName: number, filterValue: string) => void;
}

interface ProductCardProps {
  product: IProducts;
}

const FilterDetails: React.FC<FilterNameProps> = ({ name, handleFilterChange }) => {
  return (
    <div>
      {name.FilterType === "boolean" ? (
        <div className="flex flex-row w-full gap-3">
          <input
            type="checkbox"
            onChange={(e) => handleFilterChange(name.ID, e.target.checked ? "true" : "false")}
          />
          <p className="font-round">{name.Name}</p>
        </div>
      ) : name.FilterType === "options" && name.Options ? (
        <div className="flex justify-between items-center gap-5">
          <p className="font-round w-1/4">{name.Name}</p>
          <select
            className="border-sky-900 border rounded-md"
            onChange={(e) => handleFilterChange(name.ID, e.target.value)}
          >
            {name.Options.map((option) => (
              <option key={option.ID} value={option.OptionValue}>
                {option.OptionValue}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
};

const FilterCategory: React.FC<FilterCategoryProps> = ({ filter, handleFilterChange }) => {
  return (
    <div className="bg-white rounded-lg p-3 flex flex-col gap-2 shadow-md">
      <p className="font-round text-sky-900 text-xl">{filter.Category}</p>
      <hr className="border-gray-300 border-1" />
      {filter.Filters.map((name) => (
        <FilterDetails key={name.Name} name={name} handleFilterChange={handleFilterChange} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-sky-50 rounded-3xl overflow-hidden shadow-lg p-4">
      <div className="flex h-1/2 items-center">
        <img src={product.ImgUrl} alt={product.Name} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.Name}</div>
        <p className="text-gray-900 text-lg font-semibold">${product.Price}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/details/${product.ID}`}>
          <button className="bg-sky-800 hover:bg-sky-900 text-white font-bold py-2 px-8 rounded">
            VIEW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function Catalog() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filters, setFilters] = useState<IFilterResponse[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterName: number, filterValue: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  async function fetchProducts() {
    try {
      const queryParams = new URLSearchParams(selectedFilters).toString();
      const response = await axios.get(`http://localhost:8000/products/get-all?${queryParams}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchFilters() {
    try {
      const response = await axios.get("http://localhost:8000/filters/get-all");
      setFilters(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  return (
    <div className="px-[10%] w-dvw mt-7 flex flex-row justify-between gap-14">
      <div className="bg-sky-200 w-1/4 h-full px-5 py-3 rounded-lg flex flex-col gap-5 shadow-lg">
        {filters.map((filter) => (
          <FilterCategory key={filter.Category} filter={filter} handleFilterChange={handleFilterChange} />
        ))}
        <div className="pt-4 pb-2 flex gap-5">
          <button
            className="bg-white hover:bg-sky-50 text-sky-900 font-bold py-2 px-5 rounded"
            onClick={fetchProducts}
          >
            APPLY
          </button>
          <button
            className="bg-white hover:bg-sky-50 text-sky-900 font-bold py-2 px-5 rounded"
            onClick={() => {
              setSelectedFilters({})
              fetchProducts()
            }}
          >
            CLEAR
          </button>
        </div>
      </div>
      <div className="w-full grid gap-4 md:gap-6 lg:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
    </div>
  );
}
