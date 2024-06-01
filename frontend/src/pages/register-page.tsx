import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  type: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col font-round mt-8 max-md:mt-10 max-md:max-w-full">
      <label className="text-xl leading-5" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={onChange}
        className="shrink-0 mt-3 bg-white rounded-xl w-4/5 border-sky-900 border-solid border-[2px] h-[40px] px-4 max-md:max-w-full focus:border-[3px]"
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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add login logic here
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm:", confirm);
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex self-end flex-col justify-center w-3/5 bg-white">
        <img
          loading="lazy"
          srcSet="src/assets/logo.png"
          className="aspect-auto w-1/3 mb-10 ml-10 max-md:mt-10 max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col justify-center w-2/5 h-screen min-w-96 px-14 bg-sky-200 overflow-y-auto">
        <div className="text-4xl leading-10 my-5 font-bold font-round tracking-wider">
          Register
        </div>
        <form onSubmit={handleLogin} className="flex flex-col justify-center max-md:mt-10 max-md:max-w-full">
          <InputField label="Full Name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <InputField label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          <InputField label="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <button
            type="submit"
            className="justify-center items-center mt-8 max-w-full text-xl font-bold tracking-wide leading-6 text-center text-white uppercase whitespace-nowrap rounded-2xl w-44 h-11 max-md:px-5 max-md:mt-10 bg-sky-900 hover:bg-sky-700 transition-colors"
          >
            Register
          </button>
          <div className="mt-3 text-xl tracking-wide leading-7 text-black max-md:max-w-full font-round mb-10">
            Already have an account? <a href="/login" className="text-sky-900">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
