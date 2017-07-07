import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Light } from "./Light";

@registerClass("AmbientLight")
export class AmbientLight extends Light{
}
