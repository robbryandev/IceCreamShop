import { FormEvent, useState, useEffect, ChangeEvent } from "react"
import {v4} from "uuid"
import styles from "@/styles/ItemForm.module.css"
import { ItemType } from "./Item"
import { editProps } from "@/pages";

type ItemInputProps = {
  placeholder: string,
  inputType: string,
  numStep?: string,
  onChange: any,
  value: string
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
  addItem: Function,
  globalEdit: editProps,
  setGlobal: any
}

export function ItemFormInput({...props}: ItemInputProps) {
  if (props.numStep != null) {
    return (
      <>
        <label htmlFor={props.placeholder}>{props.placeholder}</label>
        <input 
          className={`p-2 border-gray-400 border-2 rounded-md text-center my-2 w-10/12 ${styles.input}`} 
          type={props.inputType} name={props.placeholder} id={`form-${props.placeholder}`}
          min="0" 
          step={props.numStep} 
          placeholder={props.placeholder} 
          onChange={props.onChange} 
          value={props.value}
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
      value={props.value}
      required 
    />
  }
}

export default function ItemForm({...props}: ItemFormProps) {
  const [formData, setFormData] = useState(props.initial)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
     setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  function handleAdd(event: FormEvent) {
    event.preventDefault()
    let newItem: ItemType
    if (props.globalEdit.edit) {      
      newItem = {
        id: props.globalEdit.item!.id,
        name: formData.name,
        flavor: formData.flavor,
        price: parseFloat(formData.price != null ? formData.price : props.globalEdit.item!.price.toString()),
        pints: parseInt(formData.pints != null ? formData.pints : props.globalEdit.item!.pints.toString())
      }
      const itemIndex = props.items.findIndex(it => it.id === props.globalEdit.item!.id)
      console.log(itemIndex)
      let newItems = structuredClone(props.items)
      newItems[itemIndex] = newItem
      console.log(JSON.stringify(newItems))
      props.addItem(newItems)
      props.setGlobal({edit: false, item: null})
      return
    }
    newItem = {
      id: v4(),
      name: formData.name,
      flavor: formData.flavor,
      price: parseFloat(formData.price != null ? formData.price : props.initial.price),
      pints: parseInt(formData.pints != null ? formData.pints : props.initial.pints)
    }
    props.addItem([...props.items, newItem])
  }

  useEffect(() => {
    if (props.globalEdit.edit) {
      const newFormData = {
        name: props.globalEdit.item!.name,
        flavor: props.globalEdit.item!.flavor,
        price: props.globalEdit.item!.price.toString(),
        pints: props.globalEdit.item!.pints.toString(),
      }
      
      setFormData(newFormData)
    }
  }, [props.globalEdit])

  return(
    <form onSubmit={handleAdd} className={`w-56 h-full p-4 mt-2 ml-12 mr-20 ${props.globalEdit.edit ? "bg-teal-300 text-black" :"bg-gray-100 text-slate-400"} rounded-md shadow-md`}>
      <center>
        <p className=" font-bold text-2xl py-2">{props.globalEdit.edit ? "Edit" : "New"} Ice Cream Flavor</p>
        <ItemFormInput inputType="text" placeholder="name" onChange={handleChange} value={formData.name}/>
        <ItemFormInput inputType="text" placeholder="flavor" onChange={handleChange} value={formData.flavor}/>
        <ItemFormInput inputType="number" placeholder="price" numStep="0.01" onChange={handleChange} value={formData.price}/>
        <ItemFormInput inputType="number" placeholder="pints" numStep="1" onChange={handleChange} value={formData.pints}/>
        <button type="submit" className="p-1.5 mt-3 bg-stone-200 hover:bg-stone-400 bg-opacity-80 border-2 border-gray-400 text-black rounded-lg">{props.globalEdit.edit ? "Edit" : "Add"} Flavor</button>
      </center>
    </form>
  )
}