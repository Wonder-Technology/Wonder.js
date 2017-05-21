import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";

@registerClass("Material")
export class Material extends RenderComponent{
    public index:number = null;
}
