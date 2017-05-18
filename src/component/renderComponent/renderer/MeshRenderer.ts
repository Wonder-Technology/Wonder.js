import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { RenderComponent } from "../RenderComponent";

@registerClass("MeshRenderer")
export class MeshRenderer extends RenderComponent{
    public index:number = null;
}
