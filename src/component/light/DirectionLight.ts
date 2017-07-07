import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Light } from "./Light";

@registerClass("DirectionLight")
export class DirectionLight extends Light{
}

