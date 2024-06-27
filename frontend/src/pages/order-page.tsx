import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/user-context";

const OrderPage: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/orders/get-order/${user.ID}`);
          if (response.status === 200) {
            setOrders(response.data);
          } else {
            console.error('Failed to fetch orders');
          }
        } catch (error) {
          console.error('Failed to fetch orders', error);
        }
      };
      fetchOrders();
    }
  }, []);

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); 
  };

  if (!user) {
    return <div className="text-center text-red-500">No user data available.</div>;
  }

  return (
    <div className="w-dvw mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#0D4274] my-8">Your Orders</h1>
        <div className="flex flex-col gap-4">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className="order-item border-2 rounded-xl border-sky-800 bg-sky-50 flex w-full justify-between mb-2 p-4 rounded-xl shadow-md h-32">
                <div className="flex flex-1 items-center">
                  <img src={order.ImgUrl} alt={order.Name} className="w-20 h-20 object-contain mr-4 rounded-lg" />
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="font-bold font-round text-[#0D4274]">{order.Name}</p>
                    <p className="font-semibold font-round text-sm">Quantity: {order.Quantity}</p>
                    <p className="font-semibold font-round text-sm">Price: ${order.Price}</p>
                    <div className="flex items-center gap-1 font-semibold font-round text-sm">
                      <p>Status:</p>
                      <p className="text-[#0D4274]">{order.Status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-center">
                  <p className="font-semibold font-round text-[#0D4274]">{formatDate(order.TransactionDate)}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
}  

export default OrderPage;
