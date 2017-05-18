import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../Component";

@registerClass("BoxGeometry")
export class BoxGeometry extends Component{
    public index:number = null;

    // public verticesIndex:number = null;
    // public indicesIndex:number = null;

    //todo add this?
    // public vertexBufferIndex:number = null;
    // public indexBufferIndex:number = null;
}