import { useEffect, useState } from "react";
import { ICart, IProductCart } from "../interfaces/product-interface";
import axios from "axios";
import { CountOrder } from "../components/counter";
import { useUser } from "../contexts/user-context";

interface CartItemProps {
  product: IProductCart;
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(product.Quantity)
  return (
    <div className="flex items-center p-4 border-2 rounded-xl border-sky-800">
      <img src={product.ImgUrl} alt={product.Name} className="w-20 h-20 object-contain mr-4" />
      <div className="flex-1">
        <h4 className="font-bold font-round text-sky-900">{product.Name}</h4>
        <p className="font-semibold font-round text-sm">${product.Price}</p>
      </div>
      <div className="flex items-center">
        <button className="text-red-500 mr-4">🗑️</button>
        <CountOrder order={quantity} setOrder={setQuantity}/>
      </div>
    </div>
  );
};

export const CartPage: React.FC = () => {
  const [cart, setCart] = useState<ICart>();

  const { user } = useUser();

  async function fetchCart() {
    try {
      const response = await axios.get(`http://localhost:8000/carts/get-cart/${user?.ID}`);
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="px-[10%]">
      <h1 className="text-2xl font-bold mb-4 mt-5 font-round text-sky-900">My Cart</h1>
      <div className="w-full flex gap-10">
        <div className="w-3/5 flex flex-col gap-5">
          {cart?.Products ? (
            cart?.Products.map(item => (
              <CartItem
                key={item.ID}
                product={item}
              />
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="w-2/5 border-4 border-sky-900 rounded-xl flex flex-col p-3">
          <div className="flex w-full h-fit justify-between px-3 items-center">
            <p className="font-round">Base Price</p>
            <p className="font-round">${cart?.TotalPrice}</p>
          </div>
          <button className="w-32 h-10 rounded-lg bg-sky-900 text-sm font-round text-white hover:bg-sky-950" onClick={() => {
          }}>PAY</button>
        </div>
      </div>
    </div>
  );
};
