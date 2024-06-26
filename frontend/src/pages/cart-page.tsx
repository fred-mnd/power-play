import { useEffect, useState } from "react";
import { ICart, IProductCart } from "../interfaces/product-interface";
import axios from "axios";
import { CountOrder } from "../components/counter";
import { useUser } from "../contexts/user-context";
import { useNavigate } from "react-router-dom";

interface CartItemProps {
  product: IProductCart;
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, onUpdate }) => {
  const { user } = useUser();
  const [quantity, setQuantity] = useState(product.Quantity);

  const updateQuantity = async (newQuantity: number) => {
    try {
      setQuantity(newQuantity);
      await axios.put(`http://localhost:8000/carts/update/${user.ID}/${product.ID}`, { Quantity: newQuantity });
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async () => {
    try {
      await axios.delete(`http://localhost:8000/carts/delete/${user.ID}/${product.ID}`);
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center p-4 border-2 rounded-xl border-sky-800 bg-sky-50 shadow-md transform transition-transform hover:scale-105">
      <img src={product.ImgUrl} alt={product.Name} className="w-20 h-20 object-contain mr-4 rounded-lg" />
      <div className="flex-1">
        <h4 className="font-bold font-round text-sky-900">{product.Name}</h4>
        <p className="font-semibold font-round text-sm">${product.Price}</p>
      </div>
      <div className="flex items-center">
        <button className="text-red-500 mr-4" onClick={deleteItem}>🗑️</button>
        <CountOrder order={quantity} setOrder={updateQuantity} />
      </div>
    </div>
  );
};

export const CartPage: React.FC = () => {

  const [cart, setCart] = useState<ICart | null>(null);
  const { user } = useUser();

  const navigate = useNavigate()

  async function fetchCart() {
    try {
      const response = await axios.get(`http://localhost:8000/carts/get-cart/${user?.ID}`);
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = () => {
    fetchCart();
  };

  const payHandle = async () => {
    try {
      await axios.get(`http://localhost:8000/orders/add-order/${user.ID}`);
      alert("Payment successful!")
      navigate("/catalog");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-[10%] w-dvw py-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 mt-5 font-round text-sky-900">My Cart</h1>
      <div className="w-full flex gap-10">
        <div className="w-3/5 flex flex-col gap-5">
          {cart?.Products != null ? (
            cart?.Products.map(item => (
              <CartItem key={item.ID} product={item} onUpdate={handleUpdate} />
            ))
          ) : (
            <p className="text-sky-900 font-bold text-xl">Your cart is empty</p>
          )}
        </div>
        {cart?.Products != null ? (
          <div className="w-2/5 border-2 border-sky-800 rounded-xl flex flex-col p-6 bg-white shadow-lg">
          <h2 className="font-bold text-xl mb-2">Order Summary</h2>
            {cart?.Products?.map(product => (
              <div className="flex w-full justify-between mb-2" key={product.ID}>
                <p className="flex w-full">{product.Name}</p>
                <div className="flex w-full justify-between">
                  <p className="pl-20">x{product.Quantity}</p>
                  <p>${product.TotalPrice}</p>
                </div>
                
              </div>
            ))}
            <hr className="my-2" />
            {user.Address && (
              <div className="mt-1">
                <h3 className="font-semibold text-lg">Shipping to:</h3>
                <p>{user.Address}</p>
              </div>
            )}
            <div className="flex justify-between mt-6 mb-2">
              <p>Shipping Fee</p>
              <p>${cart?.ShippingFee}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${cart?.FinalPrice}</p>
            </div>
            <button className="w-32 h-10 mt-6 rounded-lg bg-sky-900 text-sm font-round text-white hover:bg-sky-950 transition-colors self-center mt-auto"
            onClick={() => {
              payHandle()
            }}>
              PAY
            </button>
          </div>
        ): null}
        
      </div>
    </div>
  );
};
