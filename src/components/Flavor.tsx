import { useEffect, useState } from "react"
import { editProps } from "@/pages";

export type FlavorProps = {
  flavor: FlavorType,
  globalEdit: editProps,
  setGlobal: Function,
  disableEdit: boolean,
  setDetails?: Function,
  decrement: any,
  delete: any
}

export type FlavorType = {
  id: string,
  name: string,
  price: number,
  flavor: string,
  pints: number
}

export default function Flavor({...props}: FlavorProps) {
  const [editing, setEditing] = useState(false)
  function handleEdit(event: any) {
    if (!props.globalEdit.edit && !props.disableEdit) {
      props.setGlobal({
        edit: true, 
        flavor: {
          id: props.flavor.id,
          name: props.flavor.name,
          flavor: props.flavor.flavor,
          price: props.flavor.price,
          pints: props.flavor.pints
        }
      })
      setEditing(true)
    }
  }

  function handleDetails(event: any) {
    props.setGlobal({
      edit: false,
      flavor: {
        id: props.flavor.id,
        name: props.flavor.name,
        flavor: props.flavor.flavor,
        price: props.flavor.price,
        pints: props.flavor.pints
      }
    })
    if (props.setDetails) {
      props.setDetails(true)
    }
  }

  function handleDecrement() {
    props.decrement(
      {
        id: props.flavor.id,
        name: props.flavor.name,
        flavor: props.flavor.flavor,
        price: props.flavor.price,
        pints: props.flavor.pints
      }
    )
  }

  function handleDelete() {
    props.delete(
      {
        id: props.flavor.id,
        name: props.flavor.name,
        flavor: props.flavor.flavor,
        price: props.flavor.price,
        pints: props.flavor.pints
      }
    )
  }

  useEffect(() => {
    if (!props.globalEdit.edit) {
      setEditing(false)
    }
  }, [props.globalEdit])
  
  return (
    <div className={`w-56 h-48 ${editing ? " bg-green-300" :"bg-orange-200"} rounded-md p-4 shadow-md shadow-teal-200 text-center m-2`} id={props.flavor.id} key={props.flavor.id}>
      <p className="text-3xl pb-4">{props.flavor.name} ({props.flavor.pints})
        {!props.globalEdit.edit && props.flavor.pints > 0 ? (
        <span className="ml-6 bg-red-500 py-2 px-4 rounded-full text-xl text-white">
          <button onClick={handleDecrement}>-1</button>
        </span>
        ) : null}
      </p>
      {
        !props.disableEdit && !props.globalEdit.edit ? (
        <button onClick={handleEdit}>Edit</button>
        ) : (
          null
        )
      }
      <br/>
      {
        !props.globalEdit.edit ? (
          <>
            <button onClick={handleDetails}>Details</button>
            <br />
            <button onClick={handleDelete}>Delete</button>
          </>
        ) : (
          null
        )
      }
    </div>
  )
}