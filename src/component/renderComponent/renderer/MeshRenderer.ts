import { RenderComponent } from "../RenderComponent";
import { initData } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";

@registerClass("MeshRenderer")
export class MeshRenderer extends RenderComponent{
    public index:number = null;
}

initData(MeshRendererData);
