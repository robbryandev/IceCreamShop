import { editProps } from "@/pages";
import { Component } from "react";
import Flavor, { FlavorType } from "./Flavor";

export default class FlavorDetails extends Component<{flavor: FlavorType, globalEdit: editProps, setGlobal: any, setDetails: any}> {
  render() {
    return (
      <div className="text-center">
        <button onClick={(e) => this.props.setDetails(false)}>Back</button>
        <p>{this.props.flavor.name}</p>
        <br />
        <p>{this.props.flavor.flavor}</p>
        <p>{this.props.flavor.price}</p>
        <p>{this.props.flavor.pints}</p>
      </div>
    )
  }
}