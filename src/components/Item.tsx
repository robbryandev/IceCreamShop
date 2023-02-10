export type ItemType = {
  id: string,
  name: string,
  price: number,
  flavor: string,
  pints: number
}

export default function Item({...props}: ItemType) {
  return (
    <div className="w-56 h-40 bg-gray-200 rounded-md p-4 shadow-md text-center m-2" id={props.id} key={props.id}>
      <p>Name: {props.name}</p>
      <p>Flavor: {props.flavor}</p>
      <p>Price: ${props.price}</p>
      <br />
      <p>{props.pints} Left</p>
    </div>
  )
}