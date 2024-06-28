import { useEffect, useState } from "react";
import { IProducts } from "../interfaces/product-interface";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FilterOption, IFilterDetails, ISpecs } from "../interfaces/filter-interface";
import { CountOrder } from "../components/counter";
import { useUser } from "../contexts/user-context";
import Modal from "../components/modal";

export default function DetailsPage(){
  const [product, setProduct] = useState<IProducts>()
  const [order, setOrder] = useState(1);
  const [specs, setSpecs] = useState<ISpecs[]>([])
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      setModalMessage("Please log in to access your cart.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const {id} = useParams()

  const navigate = useNavigate()

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products/get-product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }    
  }

  const fetchSpec = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products/get-specs/${id}`);
      setSpecs(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }    
  }

  const AddCartHandle = async () => {
    try {
      await axios.post('http://localhost:8000/carts/add-to-cart', {
        UserID: user?.ID,
        ProductID: product?.ID,
        Quantity: order
      })
      alert("Item succesfully added to cart")
      navigate("/catalog")

    } catch (error) {
      
    }
  }

  const Specs = () => {
    return (
      <div>
        <p className="text-xl mb-3 font-round font-semibold text-[#0D4274]">Specifications:</p>
        {specs.map((spec, idx) => (
          <div className="flex flex-row items-center mb-2 font-round gap-0.5">
            <p key={idx} className="font-semibold">{spec.FilterName}</p>
            <p>:</p>
            <p>{spec.FilterType === 'boolean' ? (spec.FilterValue === 'true' ? 'Yes' : 'No') : spec.FilterValue}</p>
          </div>
        ))}
      </div>
    )
  }

  useEffect(() => {
    fetchProduct()
    fetchSpec()
  }, [])

  return (
    <div className="px-[10%] w-dvw h-full mt-32 flex flex-row justify-between gap-14">
      <div className="w-1/2 flex justify-end">
        <div className="w-2/3 h-fit border-2 rounded-xl border-[#0D4274] shadow-lg flex items-center justify-center overflow-hidden aspect-square">
          <img className="object-contain w-full h-full" src={product?.ImgUrl} alt={product?.Name} />
        </div>
      </div>
      <div className="w-1/2 mt-10 flex flex-col gap-6">
        <p className="text-3xl font-round text-[#0D4274] font-semibold">{product?.Name}</p>
        <p className="text-xl font-round font-semibold">${product?.Price}</p>
        <div className="flex gap-7 items-center">
          <CountOrder order={order} setOrder={setOrder} />
          <button className="w-32 h-10 rounded-lg bg-[#0D4274] text-sm font-round text-white hover:bg-sky-950" onClick={() => {
            user ? 
            AddCartHandle()
            : handleCartClick()
          }}>ADD TO CART</button>
        </div>
        <p className="w-3/4">{product?.Desc}</p>
        <Specs />
      </div>
      <Modal show={showModal} message={modalMessage} onClose={closeModal} />
    </div>
  )
}
