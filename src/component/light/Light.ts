import { Component } from "../Component";
import { registerClass } from "../../definition/typescript/decorator/registerClass";

@registerClass("Light")
export abstract class Light extends Component{
}
