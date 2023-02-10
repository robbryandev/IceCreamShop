import { Component } from "react";
import Item, { ItemType } from "./Item";
import { editProps } from "@/pages";

export default class ItemList extends Component<{items: ItemType[], globalEdit: editProps, setGlobal: any}> {
  render() {
    return (
      <div className="flex flex-wrap m-0 p-0 w-10/12">
        {
          this.props.items.map((it) => {
            const item = {
              id: it.id,
              name: it.name,
              flavor: it.flavor,
              price: it.price,
              pints: it.pints
            }
            return <Item key={it.id} globalEdit={this.props.globalEdit} setGlobal={this.props.setGlobal} item={item}/>
          })
        }
      </div>
    )
  }
}