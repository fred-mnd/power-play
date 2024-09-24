import React from 'react';

interface CountOrderProps {
  order: number;
  setOrder: (newQuantity: number) => void;
}

export const CountOrder: React.FC<CountOrderProps> = ({ order, setOrder }) => {
  return (
    <div className="flex w-32 h-10 justify-between border-2 rounded-lg border-sky-900 overflow-hidden font-round">
      <button
        className="aspect-square h-full bg-sky-200 hover:bg-sky-300 flex justify-center items-center"
        onClick={() => {
          if (order > 1) setOrder(order - 1);
        }}
      >
        <p className="text-sky-900 font-bold">-</p>
      </button>
      <p className="flex items-center text-sky-900 font-semibold text-l">{order}</p>
      <button
        className="aspect-square h-full bg-sky-200 hover:bg-sky-300 flex justify-center items-center"
        onClick={() => {
          setOrder(order + 1);
        }}
      >
        <p className="text-sky-900 font-bold">+</p>
      </button>
    </div>
  );
};
