import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex gap-5 justify-between w-dvw h-dvh pr-11 text-sky-900 bg-sky-200 max-md:flex-wrap max-md:pr-5">
      <div className="flex flex-col justify-center w-2/d min-w-96 px-14 bg-white max-md:max-w-full">
        <div className="text-4xl leading-10 my-5 font-bold font-round tracking-wider">
          Welcome Back!
        </div>
        <form onSubmit={handleLogin} className="flex flex-col justify-center max-md:mt-10 max-md:max-w-full">
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button
            type="submit"
            className="justify-center items-center mt-12 max-w-full text-xl font-bold tracking-wide leading-6 text-center text-white uppercase whitespace-nowrap rounded-2xl w-24 h-11 max-md:px-5 max-md:mt-10 bg-sky-900 hover:bg-sky-700 transition-colors"
          >
            Login
          </button>
          <div className="mt-10 text-xl tracking-wide leading-7 text-black max-md:max-w-full font-round">
            Don’t have an account? <a href="/register" className="text-sky-900">Register</a>
          </div>
        </form>
      </div>
      <img
        loading="lazy"
        srcSet="src/assets/logo.png"
        className="self-end aspect-auto w-1/4 mb-10 max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
}



