import { editProps } from "@/pages";
import { Component } from "react";
import { FlavorType } from "./Flavor";

export default class FlavorDetails extends Component<{flavor: FlavorType, globalEdit: editProps, setGlobal: any, setDetails: any}> {
  render() {
    return (
      <div className="text-center mt-6">
        <p className="text-4xl font-bold">
          <button onClick={(e) => this.props.setDetails(false)} className="py-2 px-4 mr-10 bg-red-400 rounded-md text-white text-2xl font-normal">Back</button>
          {this.props.flavor.name}
        </p>
        <br />
        <p className="text-lg font-semibold">Flavor: {this.props.flavor.flavor}</p>
        <p>Price: ${this.props.flavor.price}</p>
        <p>Pints: {this.props.flavor.pints}</p>
      </div>
    )
  }
}