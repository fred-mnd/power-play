import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/user-context";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${user.ID}`);
        if (response.status === 200) {
          updateUser(response.data.user);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    const fetchActiveOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/active/${user.ID}`);
        if (response.status === 200) {
          setActiveOrders(response.data.orders);
        } else {
          console.error('Failed to fetch active orders');
        }
      } catch (error) {
        console.error('Failed to fetch active orders', error);
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wishlist/${user.ID}`);
        if (response.status === 200) {
          setWishlist(response.data.wishlist);
        } else {
          console.error('Failed to fetch wishlist');
        }
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };
  }, []);

  if (!user) {
    return <div className="text-center text-red-500">No user data available.</div>;
  }

  const handleLogout = async () => {
    if (!user) {
      console.error('Logout error: User is not logged in');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/logout', {
        withCredentials: true,
      });
      if (response.status === 200) {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        alert('You have been logged out!');
        updateUser(null); 
        navigate("/");
      } 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome, {user.Name}</h1>
      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-content">
            <ProfileItem label="Name" value={user.Name} />
            <ProfileItem label="Email" value={user.Email} />
            <ProfileItem label="Phone Number" value={user.PhoneNumber} />
            <ProfileItem label="Address" value={user.Address} />
          </div>
          <button className="edit-button">Edit Profile</button>
        </div>
        <div className="profile-side">
          <div className="active-orders">
            <div className="orders-header">
              <h2 className="section-title">Active Orders</h2>
              <button className="see-all-button" onClick={() => navigate('/orders')}>See All</button>
            </div>
            {activeOrders.length > 0 ? (
              activeOrders.map((order, index) => (
                <div key={index} className="order-item">
                  <p>{order.itemName}</p>
                  <p>{order.date}</p>
                  <p>{order.status}</p>
                </div>
              ))
            ) : (
              <p>No active orders found</p>
            )}
          </div>
          <div className="wishlist">
            <h2 className="section-title">Wishlist</h2>
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <div key={index} className="wishlist-item">
                  <p>{item.itemName}</p>
                  <p>{item.price}</p>
                </div>
              ))
            ) : (
              <p>No items in wishlist</p>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

interface ProfileItemProps {
  label: string;
  value: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => {
  return (
    <div className="profile-item">
      <h2 className="profile-item-label">{label}</h2>
      <p className="profile-item-value">{value}</p>
    </div>
  );
};

export default ProfilePage;

const styles = `
  .profile-container {
    background-color: #f9fafb;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 30px;
    max-width: 1200px;
    margin: 50px auto;
    font-family: 'Poppins', sans-serif;
    animation: fadeIn 1s ease-in-out;
  }

  .profile-title {
    color: #075985;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    display: inline-block;
    text-align: center;
    width: 100%;
  }

  .profile-title::after {
    content: '';
    width: 50px;
    height: 5px;
    background-color: #ff7f50;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }

  .profile-main {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
  }

  .profile-info, .profile-side {
    flex: 1 1 300px; /* Make each section take at least 300px and grow as needed */
    padding: 20px;
  }

  .profile-content {
    text-align: left;
    margin-top: 20px;
  }

  .profile-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .profile-item:hover {
    transform: translateY(-5px);
  }

  .profile-item-label {
    color: #054569;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .profile-item-value {
    color: #333;
    font-size: 18px;
  }

  .edit-button, .logout-button {
    background-color: #ff7f50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    display: inline-block;
  }

  .edit-button:hover, .logout-button:hover {
    background-color: #e56e3c;
  }

  .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .see-all-button {
    background-color: #075985;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }

  .see-all-button:hover {
    background-color: #054569;
  }

  .order-history, .wishlist {
    margin-top: 30px;
    text-align: left;
  }

  .section-title {
    color: #075985;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .order-item, .wishlist-item {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .profile-main {
      flex-direction: column;
      align-items: center;
    }

    .profile-title {
      font-size: 28px;
    }

    .profile-item-label {
      font-size: 18px;
    }

    .profile-item-value {
      font-size: 16px;
    }

    .edit-button, .logout-button {
      font-size: 14px;
    }

    .section-title {
      font-size: 20px;
    }

    .see-all-button {
      font-size: 12px;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
