import { FormEvent, useState } from "react"
import * as React from 'react'
import {v4} from "uuid"
import styles from "@/styles/ItemForm.module.css"
import { ItemType } from "./Item"

type ItemInputProps = {
  placeholder: string,
  inputType: string,
  numStep?: string,
  onChange: any
}

type InitialForm = {
  name: string,
  flavor: string,
  price: string,
  pints: string
}

type ItemFormProps = {
  items: ItemType[],
  initial: InitialForm
  addItem: Function
}

export function ItemFormInput({...props}: ItemInputProps) {
  if (props.numStep != null) {
    return (
      <>
        <label className=" text-slate-400" htmlFor={props.placeholder}>{props.placeholder}</label>
        <input 
          className={`p-2 border-gray-400 border-2 rounded-md text-center my-2 w-10/12 ${styles.input}`} 
          type={props.inputType} name={props.placeholder} id={`form-${props.placeholder}`}
          min="0" 
          step={props.numStep} 
          defaultValue={props.numStep} 
          placeholder={props.placeholder} 
          onChange={props.onChange} 
          required 
        />
      </>
    )
  } else {
    return <input 
      className={`p-2 border-gray-400 border-2 rounded-md text-center my-2 w-10/12 ${styles.input}`} 
      type={props.inputType} name={props.placeholder} id={`form-${props.placeholder}`} 
      placeholder={props.placeholder} 
      onChange={props.onChange} 
      required 
    />
  }
}

export default function ItemForm({...props}: ItemFormProps) {
  const [formData, setFormData] = useState(props.initial!)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
     setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  function handleAdd(event: FormEvent) {
    event.preventDefault()
    const newItem: ItemType = {
      id: v4(),
      name: formData.name,
      flavor: formData.flavor,
      price: parseFloat(formData.price != null ? formData.price : props.initial.price),
      pints: parseInt(formData.pints != null ? formData.pints : props.initial.pints)
    }
    props.addItem([...props.items, newItem])
  }

  return(
    <form onSubmit={handleAdd} className="w-56 h-full p-4 mt-2 ml-12 mr-20 bg-gray-100 rounded-md shadow-md">
      <center>
        <p className=" font-bold text-2xl py-2">New Ice Cream Flavor</p>
        <ItemFormInput inputType="text" placeholder="name" onChange={handleChange}/>
        <ItemFormInput inputType="text" placeholder="flavor" onChange={handleChange}/>
        <ItemFormInput inputType="number" placeholder="price" numStep="0.01" onChange={handleChange}/>
        <ItemFormInput inputType="number" placeholder="pints" numStep="1" onChange={handleChange}/>
        <button type="submit" className="p-1.5 mt-3 bg-stone-200 hover:bg-stone-400 bg-opacity-80 border-2 border-gray-400 text-black rounded-lg">Add Flavor</button>
      </center>
    </form>
  )
}