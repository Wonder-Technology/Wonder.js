import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";

@registerClass("MeshRenderer")
export class MeshRenderer extends RenderComponent{
    public index:number = null;
}
