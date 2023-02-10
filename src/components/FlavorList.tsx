import { Component } from "react";
import Flavor, { FlavorType } from "./Flavor";
import { editProps } from "@/pages";

export default class FlavorList extends Component<{flavors: FlavorType[], globalEdit: editProps, setGlobal: any, setDetails: any}> {
  render() {
    return (
      <div className="flex flex-wrap m-0 p-0 w-10/12">
        {
          this.props.flavors.map((it) => {
            const flavor = {
              id: it.id,
              name: it.name,
              flavor: it.flavor,
              price: it.price,
              pints: it.pints
            }
            return <Flavor key={it.id} globalEdit={this.props.globalEdit} setGlobal={this.props.setGlobal} flavor={flavor} disableEdit={false} setDetails={this.props.setDetails}/>
          })
        }
      </div>
    )
  }
}