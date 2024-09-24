import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/user-context";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [validations, setValidations] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false
  });
  const [errorMessages, setErrorMessages] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');
  const navigate = useNavigate();
  const topUpModalRef = useRef<HTMLDivElement>(null);
  const editProfileModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.Name,
        email: user.Email,
        phoneNumber: user.PhoneNumber,
        address: user.Address,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

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

      const fetchRecentOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/orders/get-order/${user.ID}`);
          if (response.status === 200) {
            setRecentOrders(response.data);
          } else {
            console.error('Failed to fetch recent orders');
          }
        } catch (error) {
          console.error('Failed to fetch recent orders', error);
        }
      };

      fetchUserDetails();
      fetchRecentOrders();
    }
  }, []);

  const handleTopUp = async () => {
    const amount = Number(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/users/topup/${user.ID}`, {
        Amount: amount,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        updateUser(response.data.user);
        setShowTopUpModal(false);
        setTopUpAmount('');
      } else {
        console.error('Failed to top up');
      }
    } catch (error) {
      console.error('Failed to top up', error);
    }
  };

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

  const handlePasswordChange = (value: string) => {
    setGeneralErrorMessage('');
    setFormData((prevFormData) => ({
        ...prevFormData,
        newPassword: value,
    }));

    setValidations({
        minLength: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        digit: /\d/.test(value),
        specialChar: /[~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(value),
    });
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
    }));
    setErrorMessages((prev) => ({ ...prev, [id]: '' })); 
    setGeneralErrorMessage('');
};

const handleSave = async () => {
    setErrorMessages({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    if (formData.oldPassword) {
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setErrorMessages((prev) => ({ ...prev, confirmPassword: 'New passwords do not match' }));
            return;
        }

        if (formData.newPassword) {
            const updatedUser: any = {
                userId: user.ID,
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            };

            try {
                const response = await axios.put(`http://localhost:8000/users/update/${user.ID}`, updatedUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = response.data;

                if (response.status === 200) {
                    alert("Password Updated!");
                    updateUser(result.user);
                    setShowEditProfileModal(false);
                    setGeneralErrorMessage('');
                } else {
                    setErrorMessages((prev) => ({ ...prev, oldPassword: result.error }));
                    setGeneralErrorMessage(result.error);
                }
            } catch (error: any) {
                const errorMsg = error.response?.data?.error;
                setGeneralErrorMessage(errorMsg);
            }
        } else {
            setGeneralErrorMessage('Please enter a new password.');
        }
    } else {
        const updatedUser: any = {
            userId: user.ID,
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
        };

        try {
            const response = await axios.put(`http://localhost:8000/users/update/${user.ID}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = response.data;

            if (response.status === 200) {
                alert("Profile Updated!");
                updateUser(result.user);
                setShowEditProfileModal(false);
                setGeneralErrorMessage('');
            } else {
                setErrorMessages((prev) => ({ ...prev, oldPassword: result.error }));
                setGeneralErrorMessage(result.error);
            }
        } catch (error: any) {
            const errorMsg = error.response?.data?.error;
            setErrorMessages((prev) => ({ ...prev, oldPassword: errorMsg }));
            setGeneralErrorMessage(errorMsg);
        }
    }
};

  const handleOutsideClick = (e: MouseEvent) => {
    if (showTopUpModal && topUpModalRef.current && !topUpModalRef.current.contains(e.target as Node)) {
      setShowTopUpModal(false);
    }
    if (showEditProfileModal && editProfileModalRef.current && !editProfileModalRef.current.contains(e.target as Node)) {
      setGeneralErrorMessage('');
      setShowEditProfileModal(false);
      setGeneralErrorMessage('');
    }
  };

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); 
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showTopUpModal, showEditProfileModal]);

  if (!user) {
    return <div className="text-center text-red-500">No user data available.</div>;
  }

  return (
    <div className="w-dvw">
      <div className="profile-container">
        <h1 className="profile-title">Welcome, {user.Name}</h1>
        <div className="profile-main">
          <div className="profile-info">
          <div className="profile-header">
                <h2 className="section-title">Profile</h2>
                <button className="edit-button" onClick={() => setShowEditProfileModal(true)}>Edit Profile</button>
              </div>
            <div className="profile-content">
              <ProfileItem label="Name" value={user.Name} />
              <ProfileItem label="Email" value={user.Email} />
              <ProfileItem label="Phone Number" value={user.PhoneNumber} />
              <ProfileItem label="Address" value={user.Address} />
              <div className="profile-item">
                <h2 className="profile-item-label">Money</h2>
                <p className="profile-item-value">
                  ${user.Money} <AccountBalanceWalletIcon onClick={() => setShowTopUpModal(true)} className="top-up-icon" />
                </p>
              </div>
            </div>
            
          </div>
          <div className="profile-side">
            <div className="recent-orders">
              <div className="orders-header">
                <h2 className="section-title">Recent Orders</h2>
                <button className="see-all-button" onClick={() => navigate('/orders')}>See All</button>
              </div>
              <div className="flex flex-col">
                {recentOrders ? (
                  recentOrders.slice(0, 5).map((order, index) => (
                    <div key={index} className="order-item flex w-full justify-between p-4 rounded-xl shadow-md">
                      <div className="flex flex-1 items-center">
                        <img src={order.ImgUrl} alt={order.Name} className="w-20 h-20 object-contain mr-4 rounded-lg" />
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="font-bold font-round text-[#0D4274]">{order.Name}</p>
                          <p className="font-semibold font-round text-sm">Quantity: {order.Quantity}</p>
                          <div className="flex items-center gap-1 font-semibold font-round text-sm">
                            <p>Status:</p>
                            <p className="text-[#0D4274]">{order.Status}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-center mt-1 mr-1">
                        <p className="font-semibold font-round text-sm">{formatDate(order.TransactionDate)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found</p>
                )}
              </div> 
            </div>
          </div>
        </div>

        {showTopUpModal && (
          <div className="modal-overlay">
            <div className="modal" ref={topUpModalRef}>
              <div className="modal-content">
                <h2 className="modal-title">Top Up</h2>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="top-up-input"
                  placeholder="Enter amount"
                />
                <button className="modal-button" onClick={handleTopUp}>Top Up</button>
              </div>
            </div>
          </div>
        )}

        {showEditProfileModal && (
          <div className="modal-overlay">
            <div className="modal" ref={editProfileModalRef}>
              <div className="modal-content">
                <h2 className="modal-title">Edit Profile</h2>
                <div className="form-container">
                  <div className="form-left">
                    <div className="form-group">
                      <label htmlFor="name" className="input-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="top-up-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="input-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="top-up-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="input-label">Phone Number</label>
                      <input
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="top-up-input"
                      />
                    </div>
                  </div>
                  <div className="form-right">
                    <div className="form-group">
                      <label htmlFor="address" className="input-label">Address</label>
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="top-up-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="oldPassword" className="input-label">Old Password</label>
                      <input
                        type="password"
                        id="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        placeholder="Old Password"
                        className="top-up-input"
                      />
                    </div>
                    {formData.oldPassword && (
                      <>
                        <div className="form-group">
                          <label htmlFor="newPassword" className="input-label">New Password</label>
                          <input
                            type="password"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            placeholder="New Password"
                            className="top-up-input"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className="top-up-input"
                          />
                        </div>
                        <div className="form-group">
                          <p>Password Requirements:</p>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={validations.minLength}
                                  disabled
                                  sx={{
                                    color: validations.minLength ? '#054569' : '',
                                    '&.Mui-checked': {
                                      color: '#054569',
                                    },
                                  }}
                                />
                              }
                              label="Minimum 8 characters"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={validations.uppercase && validations.lowercase}
                                  disabled
                                  sx={{
                                    color: validations.uppercase && validations.lowercase ? '#054569' : '',
                                    '&.Mui-checked': {
                                      color: '#054569',
                                    },
                                  }}
                                />
                              }
                              label="At least one uppercase and lowercase letter"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={validations.digit && validations.specialChar}
                                  disabled
                                  sx={{
                                    color: validations.digit && validations.specialChar ? '#054569' : '',
                                    '&.Mui-checked': {
                                      color: '#054569',
                                    },
                                  }}
                                />
                              }
                              label="At least one number and special character"
                            />
                          </FormGroup>

                        </div>
                      </>
                    )}
                  </div>
                </div>
                {generalErrorMessage && <p className="general-error-text">{generalErrorMessage}</p>}
                <button className="modal-button" onClick={handleSave}>Update Profile</button>
              </div>
            </div>
          </div>
        )}
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
    width: 100vw;
    margin: 50px auto;
    margin-top: 100px;
    font-family: 'Poppins', sans-serif;
    animation: fadeIn 1s ease-in-out;
  }

  .profile-title {
    color: #0D4274;
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
    background-color: #86B9E8;
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

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile-info, .profile-side {
    flex: 1 1 300px; 
    padding: 20px;
  }

  .profile-content {
    text-align: left;
  }

  .profile-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 112px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-item:hover {
    transform: translateY(-5px);
  }

  .profile-item-label {
    color: #054569;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
    margin-left: 5px;
  }

  .profile-item-value {
    color: #333;
    font-size: 18px;
    margin-left: 5px;
  }

  .top-up-icon {
    cursor: pointer;
    margin-left: 10px;
    color: #054569;
    font-size: 24px;
  }

  .edit-button {
    background-color: #0D4274;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    margin-bottom: 15px;
  }

  .edit-button:hover{
    background-color: #0a345a;
  }

  .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .see-all-button {
    background-color: #0D4274;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    margin-bottom: 15px;
  }

  .see-all-button:hover {
    background-color: #0a345a;
  }

  .order-history {
    margin-top: 30px;
    text-align: left;
  }

  .section-title {
    color: #0D4274;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .order-item {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 112px;
    margin-bottom: 20px;
  }
  
  .order-item:hover {
    transform: translateY(-5px);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 18px;
    text-align: center;
    width: 70%;
    max-width: 600px;
    font-family: 'Arial', sans-serif;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    font-size: 18px;
  }

  .form-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .form-left, .form-right {
    width: 48%;
  }

  .modal-title {
    font-size: 24px;
    font-weight: bold;
    color: #0D4274;
    margin-bottom: 20px;
  }

  .modal-button {
    background-color: #0D4274;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 11px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 15px;
  }

  .modal-button:hover {
    background-color: #053f61;
  }

  .top-up-input {
    margin-bottom: 15px;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #f0f4f8;
  }

  .input-label {
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .form-group {
    text-align: left;
  }

  .error-text {
    color: red;
    font-size: 14px;
    text-align: left;
    width: 100%;
    margin-top: -10px;
  }

  .general-error-text {
    color: red;
    font-size: 14px;
    text-align: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
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

