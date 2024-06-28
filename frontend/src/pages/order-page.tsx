import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/user-context";
import { IFinalTran } from "../interfaces/order-interface";

const OrderPage: React.FC = () => {
  const { user } = useUser();
  const [ordersData, setOrdersData] = useState<IFinalTran[]>([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/orders/get-complete-order/${user.ID}`);
      if (response.status === 200) {
        setOrdersData(response.data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const updateStatus = async(id: number) => {
    try {
        const response = await axios.get(`http://localhost:8000/orders/complete/${id}`);
        setOrdersData(response.data);
        fetchOrders()
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
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
          {ordersData ? 
        ordersData.map((transaction, index) => (
                <div key={index} className="mb-6 p-4 border-2 border-sky-900 rounded-lg shadow-md">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl text-sky-900 font-round font-semibold">{transaction.User}</h2>
                            <p>{new Date(transaction.TransactionDate).toLocaleString()}</p>
                            <p>Status: {transaction.Status}</p>
                        </div>
                        {transaction.Status === "Delivered" ? (
                        <button className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-950"
                        onClick={() => updateStatus(transaction.ID)}>
                            Received
                        </button>
                        ) : null}
                    </div>
                    {transaction.Orders.map(order => (
                        <div key={order.ID} className="flex mb-4 p-4 border rounded-lg shadow-sm">
                            <img src={order.ImgUrl} alt={order.Name} className="w-24 h-24 mr-4 object-contain" />
                            <div>
                                <h3 className="text-lg font-semibold">{order.Name}</h3>
                                <p>Quantity: {order.Quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )) : (
                <p>No active order.</p>
            )
            }
        </div>
      </div>
    </div>
  );
}  

export default OrderPage;
