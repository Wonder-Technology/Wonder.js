import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { Material } from "./Material";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material{
}
