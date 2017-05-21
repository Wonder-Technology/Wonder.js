import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { RenderComponent } from "../RenderComponent";
import { initData } from "./MeshRendererSystem";
import { MeshRendererData } from "./MeshRendererData";

@registerClass("MeshRenderer")
export class MeshRenderer extends RenderComponent{
    public index:number = null;
}

initData(MeshRendererData);
