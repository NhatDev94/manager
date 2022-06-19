import moment from "moment";
import React, { useState } from "react";
import { ISpending } from "../../../interfaces";
import SpendingService from "../../../services";

interface Props {
  data: any,
  rerender: any
}

const AddSpending = ({ data, rerender }: Props) => {
  const now = new Date()
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState(moment(now).format('YYYY/MM/DD'));

  const handleChange = (e: any) => {
    const target: any = e.target;
    if (target.name === "name") setName(target.value);
    if (target.name === "status") setStatus(target.value);
    if (target.name === "price") setPrice(target.value);
    if (target.name === "time") setTime(target.value);
  };

  const clear = () => {
    setName('');
    setStatus('');
    setPrice('');
    setTime(moment(now).format('YYYY/MM/DD'));
  };

  const addSpending = async () => {
    if (name === '' || status === '' || price === '') return
    const spending: ISpending = {
        id: Math.random(),
        name,
        status,
        price: Number(price),
        time
    }
    clear()
    const res = await SpendingService.addSpending(spending, data)
    res.status === 200 && rerender()
  }

  return (
    <div className="">
      <input 
        className="mb-2 mr-5 outline-none border border-black/20 h-8" 
        name="time" 
        type="date" 
        value={time}
        onChange={handleChange}
      />

      <select
        className="mb-2 mr-5 border-black/20 border outline-none h-8"
        value={name}
        name="name"
        onChange={handleChange}
      >
        <option value="">Name</option>
        <option value="food">Food</option>
        <option value="coffee">Coffe</option>
        <option value="hangOut">Hang Out</option>
        <option value="oil">Oil</option>
        <option value="waste">Waste</option>
      </select>

      <select
        className="mb-2 mr-5 border border-black/20 outline-none h-8"
        value={status}
        name="status"
        onChange={handleChange}
      >
        <option value="">Status</option>
        <option value="good">Good</option>
        <option value="bad">Bad</option>
      </select>

      <input
        className="mb-2 w-[150px] mr-5 p-2 text-sm border border-black/20 outline-none h-8"
        name="price"
        value={price}
        onChange={handleChange}
        placeholder="Enter Price..."
        type='number'
      />
      <button 
        className="border h-8 text-sm font-semibold border-black/20 px-4 rounded mr-5"
        onClick={addSpending}
      >ADD</button>
      <button 
        className="border h-8 text-sm font-semibold border-black/20 px-4 rounded"
        onClick={clear}
      >CLEAR</button>
    </div>
  );
};

export default AddSpending;
