import moment from "moment";
import React, { useEffect, useState } from "react";
import { ISpending } from "../../../interfaces";
import SpendingService from "../../../services";

interface Props {
  data: any,
  rerender: any,
  setIsLoading: any, 
  spending: ISpending
}

const AddSpending = ({spending, data, rerender, setIsLoading }: Props) => {
  const now = new Date()
  const format = new Intl.NumberFormat('en-US')
  
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState(moment(now).format('YYYY/MM/DD'));
  const [price, setPrice] = useState("");

  useEffect(() => {
    setName(spending?.name)
    setStatus(spending?.status)
    setPrice(spending?.price === 0 ? '' : format.format(spending?.price).replaceAll(',', '.'))
    setTime(spending?.time)
  }, [spending])

  const handleChange = (e: any) => {
    const target: any = e.target;
    if (target.name === "name") setName(target.value);
    if (target.name === "status") setStatus(target.value);
    if (target.name === "price") {
      if (target.value === '') {
        setPrice('')
        return
      }
      let money = target.value.replaceAll('.', '')
      if (!Number(money)) return
      money = Number(money)
      let string = format.format(money)
      string = string.replaceAll(',', '.')
      setPrice(string)
    }
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
    let money = Number(price.replaceAll('.', ''))
    const value: ISpending = {
        id: spending?.id,
        name,
        status,
        price: money,
        time
    }
    clear()
    setIsLoading(true)
    
    if (spending?.id !== 0) {
      const res = await SpendingService.editSpending(spending?.id, value, data)
      res.status === 200 && rerender()
      return
    }

    value.id = Math.random()
    const res = await SpendingService.addSpending(value, data)
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
        <option value="house">House</option>
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
        className="mb-2 w-[150px] mr-5 p-2 text-sm font-medium border border-black/20 outline-none h-8"
        name="price"
        value={price}
        onChange={handleChange}
        placeholder="Enter Price..."
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
