import { FormEvent, useState, useEffect, ChangeEvent } from "react"
import {v4} from "uuid"
import styles from "@/styles/FlavorForm.module.css"
import { FlavorType } from "./Flavor"
import { editProps } from "@/pages";

type FlavorInputProps = {
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

type FlavorFormProps = {
  flavors: FlavorType[],
  initial: InitialForm
  addFlavor: Function,
  globalEdit: editProps,
  setGlobal: any
}

export function FlavorFormInput({...props}: FlavorInputProps) {
  if (props.numStep != null) {
    return (
      <>
        <label htmlFor={props.placeholder}>{props.placeholder}</label>
        <input 
          className={`p-2 border-black bg-pink-300 border-2 rounded-md text-center my-2 w-10/12 ${styles.input}`} 
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
      className={`p-2 border-black bg-pink-300 border-2 rounded-md text-center my-2 w-10/12 ${styles.input}`} 
      type={props.inputType} name={props.placeholder} id={`form-${props.placeholder}`} 
      placeholder={props.placeholder} 
      onChange={props.onChange} 
      value={props.value}
      required 
    />
  }
}

export default function FlavorForm({...props}: FlavorFormProps) {
  const [formData, setFormData] = useState(props.initial)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
     setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  function handleAdd(event: FormEvent) {
    event.preventDefault()
    let newFlavor: FlavorType
    if (props.globalEdit.edit) {      
      newFlavor = {
        id: props.globalEdit.flavor!.id,
        name: formData.name,
        flavor: formData.flavor,
        price: parseFloat(formData.price != null ? formData.price : props.globalEdit.flavor!.price.toString()),
        pints: parseInt(formData.pints != null ? formData.pints : props.globalEdit.flavor!.pints.toString())
      }
      const flavorIndex = props.flavors.findIndex(it => it.id === props.globalEdit.flavor!.id)
      let newFlavors = structuredClone(props.flavors)
      newFlavors[flavorIndex] = newFlavor
      props.addFlavor(newFlavors)
      props.setGlobal({edit: false, flavor: null})
      return
    }
    newFlavor = {
      id: v4(),
      name: formData.name,
      flavor: formData.flavor,
      price: parseFloat(formData.price != null ? formData.price : props.initial.price),
      pints: parseInt(formData.pints != null ? formData.pints : props.initial.pints)
    }
    props.addFlavor([...props.flavors, newFlavor])
  }

  useEffect(() => {
    if (props.globalEdit.edit) {
      const newFormData = {
        name: props.globalEdit.flavor!.name,
        flavor: props.globalEdit.flavor!.flavor,
        price: props.globalEdit.flavor!.price.toString(),
        pints: props.globalEdit.flavor!.pints.toString(),
      }
      
      setFormData(newFormData)
    }
  }, [props.globalEdit])

  return(
    <form onSubmit={handleAdd} className={`w-56 h-full p-4 mt-2 ml-12 mr-20 ${props.globalEdit.edit ? "bg-green-300" :"bg-orange-200"} text-black rounded-md shadow-md border-black shadow-teal-200`}>
      <center>
        <p className=" font-bold text-2xl py-2">{props.globalEdit.edit ? "Edit" : "New"} Ice Cream Flavor</p>
        <FlavorFormInput inputType="text" placeholder="name" onChange={handleChange} value={formData.name}/>
        <FlavorFormInput inputType="text" placeholder="flavor" onChange={handleChange} value={formData.flavor}/>
        <FlavorFormInput inputType="number" placeholder="price" numStep="0.01" onChange={handleChange} value={formData.price}/>
        <FlavorFormInput inputType="number" placeholder="pints" numStep="1" onChange={handleChange} value={formData.pints}/>
        <button type="submit" className="p-1.5 mt-3 border-black bg-pink-200 hover:bg-pink-400 bg-opacity-80 border-2 text-black rounded-lg">{props.globalEdit.edit ? "Edit" : "Add"} Flavor</button>
      </center>
    </form>
  )
}