import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { IMaterial } from "./IMaterial";
import { Material } from "./Material";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material{
}
