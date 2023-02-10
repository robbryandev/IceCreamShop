import { useEffect, useState } from "react"
import { editProps } from "@/pages";

export type ItemProps = {
  item: ItemType,
  globalEdit: editProps,
  setGlobal: Function
}

export type ItemType = {
  id: string,
  name: string,
  price: number,
  flavor: string,
  pints: number
}

export default function Item({...props}: ItemProps) {
  const [editing, setEditing] = useState(false)
  function handleEdit(event: any) {
    if (!props.globalEdit.edit) {
      console.log(props.item.id)
      props.setGlobal({
        edit: true, 
        item: {
          id: props.item.id,
          name: props.item.name,
          flavor: props.item.flavor,
          price: props.item.price,
          pints: props.item.pints
        }
      })
      setEditing(true)
    }
  }

  useEffect(() => {
    if (!props.globalEdit.edit) {
      setEditing(false)
    }
  }, [props.globalEdit])
  
  return (
    <div className={`w-56 h-40 ${editing ? " bg-teal-300" :"bg-gray-200"} rounded-md p-4 shadow-md text-center m-2`} id={props.item.id} key={props.item.id}>
      <p>Name: {props.item.name}</p>
      <p>Flavor: {props.item.flavor}</p>
      <p>Price: ${props.item.price}</p>
      <br />
      <p>{props.item.pints} Left</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  )
}