import { Component } from "react";
import Item, { ItemType } from "./Item";

type ListProps = {
  items: ItemType[]
}

export default class ItemList extends Component<{items: ItemType[]}> {
  render() {
    return (
      <div className="flex flex-wrap m-0 p-0 w-10/12">
        {
          this.props.items.map((it) => {
            return <Item key={it.id} id={`item-${it.id}`} name={it.name} flavor={it.flavor} price={it.price} pints={it.pints}/>
          })
        }
      </div>
    )
  }
}