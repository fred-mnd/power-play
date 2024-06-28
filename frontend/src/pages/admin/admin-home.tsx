import { useEffect, useState } from "react";
import { IFinalTran } from "../../interfaces/order-interface";
import axios from "axios";

export const AdminPage = () => {

    const [ordersData, setOrdersData] = useState<IFinalTran[]>([])

    const fetchOrders = async() => {
        try {
            const response = await axios.get('http://localhost:8000/admin/get-orders');
            setOrdersData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateStatus = async(id: number) => {
        try {
            const response = await axios.get(`http://localhost:8000/admin/update/${id}`);
            setOrdersData(response.data);
            fetchOrders()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
    <div className="px-[10%] w-dvw py-20 bg-white min-h-screen">
      <div className="w-3/5">
        <h1 className="text-3xl font-bold mb-6 mt-5 font-round text-sky-900">Orders</h1>
        {ordersData ? 
        ordersData.map((transaction, index) => (
                <div key={index} className="mb-6 p-4 border-2 border-sky-900 rounded-lg shadow-md">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl text-sky-900 font-round font-semibold">{transaction.User}</h2>
                            <p>{new Date(transaction.TransactionDate).toLocaleString()}</p>
                            <p>Status: {transaction.Status}</p>
                        </div>
                        {transaction.Status === "Processed" ? (
                        <button className="bg-sky-900 text-white px-4 py-2 rounded-lg hover:bg-sky-950"
                        onClick={() => updateStatus(transaction.ID)}>
                            Change Status
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
  );
}