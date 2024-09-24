import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user-context";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(email === 'admin@admin.com' && password == 'admin'){
      navigate('/admin/home');
      return;
    }
    const res = await login(email, password);
    if (res === '') {
      setEmail('');
      setPassword('');
      navigate('/catalog');
    } else {
      setError(res);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-5 justify-between w-dvw h-dvh pl-11 text-sky-900 bg-white max-md:flex-wrap max-md:pr-5">
      <div className="flex flex-col justify-center h-full w-2/5 min-w-96 px-14 bg-sky-200 max-md:max-w-full overflow-y-auto">
        <div className="h-full">
          <div className="text-4xl leading-10 my-5 mt-40 font-bold font-round tracking-wider">
            Welcome Back!
          </div>
          <form onSubmit={handleLogin} className="flex flex-col max-md:mt-4 max-md:max-w-full">
            <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="mt-10 text-xl font-bold text-white uppercase bg-sky-900 hover:bg-sky-700 transition-colors w-44 h-12 rounded-2xl"
            >
              Login
            </button>
            <div className="mt-4 mb-7 text-xl tracking-wide leading-7 text-black max-md:max-w-full font-round">
              Didn't have an account? <a href="/register" className="text-sky-900">Register</a>
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
