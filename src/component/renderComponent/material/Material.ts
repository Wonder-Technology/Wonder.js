import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { IMaterial } from "./IMaterial";

@registerClass("Material")
export class Material extends RenderComponent implements IMaterial{
    public index:number = null;
}

