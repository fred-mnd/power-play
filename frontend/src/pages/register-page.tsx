import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col mt-8 max-md:mt-10 max-md:max-w-full">
      <label className="text-xl font-bold mb-2" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 bg-white rounded-xl border-2 border-sky-900 h-10 px-4 focus:outline-none focus:border-4"
        required
      />
    </div>
  );
};

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        name: fullName,
        email: email,
        password: password,
        confirm: confirm,
        address: address,
        phoneNumber: phoneNumber
      });
      setError('');
      if(response.status === 200){
        navigate('/login');
      }
    } catch (error: any) {
      console.log('An error occurred:', error.response?.data.error || 'Unknown error');
      setError(error.response?.data.error || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-row-reverse gap-5 justify-between w-dvw h-dvh pl-11 text-sky-900 bg-white max-md:flex-wrap max-md:pr-5">
      <div className="flex flex-col justify-center h-full w-2/5 min-w-96 px-14 bg-sky-200 max-md:max-w-full overflow-y-auto">
        <div className="h-full">
          <div className="text-4xl font-bold mt-10 mb-2 font-round">
            Register
          </div>
          <form onSubmit={handleRegister} className="flex flex-col max-md:mt-10 max-md:max-w-full">
            <InputField label="Full Name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputField label="Confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            <InputField label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <InputField label="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <button
              type="submit"
              className="mt-10 text-xl font-bold text-white uppercase bg-sky-900 hover:bg-sky-700 transition-colors w-44 h-12 rounded-2xl"
            >
              Register
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 mb-7 text-xl tracking-wide leading-7 text-black max-md:max-w-full font-round">
              Already have an account? <a href="/login" className="text-sky-900">Login</a>
            </div>
          </form>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="src/assets/logo.png"
        className="self-end w-1/4 mb-10 max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
}
