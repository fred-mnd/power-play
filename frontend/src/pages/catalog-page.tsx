import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProducts } from "../interfaces/product-interface";
import { IFilterDetails, IFilterResponse } from "../interfaces/filter-interface";
import { Link } from "react-router-dom";

interface FilterNameProps {
  name: IFilterDetails;
  handleFilterChange: (filterName: number, filterValue: string) => void;
}

interface FilterCategoryProps {
  filter: IFilterResponse;
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
            className="accent-[#0D4274]"
            onChange={(e) => handleFilterChange(name.ID, e.target.checked ? "true" : "false")}
          />
          <p className="font-round">{name.Name}</p>
        </div>
      ) : name.FilterType === "options" && name.Options ? (
        <div className="flex flex-col justify-between items-start lg:flex-row">
          <p className="font-round w-fit">{name.Name}</p>
          <select
            className="border-[#0D4274] border rounded-md"
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
    <div className="bg-white rounded-lg p-4 flex flex-col gap-2 shadow-md">
      <p className="font-round text-[#0D4274] text-xl">{filter.Category}</p>
      <hr className="border-gray-300 border-1 flex gap-3" />
      {filter.Filters.map((name) => (
        <FilterDetails key={name.Name} name={name} handleFilterChange={handleFilterChange} />
      ))}
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-sky-50 rounded-3xl overflow-hidden shadow-lg p-3 mb-2 transition-transform transform hover:scale-105 relative w-full h-[25rem] flex flex-col justify-between">
      <div className="flex items-center justify-center h-48">
        <img src={product.ImgUrl} alt={product.Name} className="object-cover w-[90%] mt-4"/>
      </div>
      <div className="px-6 py-3 flex-grow">
        <div className="font-bold text-xl mt-5 mb-2">{product.Name}</div>
        <p className="text-gray-900 text-lg font-semibold">${product.Price}</p>
      </div>
      <div className="flex justify-center mb-7">
        <Link to={`/details/${product.ID}`} className="flex justify-center items-center">
          <button className="bg-[#0D4274] hover:bg-[#0a345a] text-white font-bold py-2 px-8 rounded-full">
            VIEW
          </button>
        </Link>
      </div>
    </div>
  );
};

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [filters, setFilters] = useState<IFilterResponse[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, []);

  const handleFilterChange = (filterName: number, filterValue: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams(selectedFilters).toString();
      const response = await axios.get(`http://localhost:8000/products/get-all?${queryParams}`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await axios.get("http://localhost:8000/filters/get-all");
      setFilters(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
    fetchProducts();
  };

  return (
    <div className="px-[10%] w-dvw mt-28 flex flex-col md:flex-row justify-between gap-14">
      {/* Filters Section */}
      <div className="bg-sky-200 w-full md:w-1/4 h-full px-5 py-3 rounded-lg flex flex-col gap-5 shadow-lg mb-6 md:mb-0">
        {filters.map((filter) => (
          <FilterCategory key={filter.Category} filter={filter} handleFilterChange={handleFilterChange} />
        ))}
        <div className="pt-4 pb-2 flex gap-5 justify-center">
          <button
            className="bg-white hover:bg-sky-50 text-[#0D4274] font-bold py-2 px-5 rounded"
            onClick={fetchProducts}
          >
            APPLY
          </button>
          <button
            className="bg-white hover:bg-sky-50 text-[#0D4274] font-bold py-2 px-5 rounded"
            onClick={clearFilters}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="w-full grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
