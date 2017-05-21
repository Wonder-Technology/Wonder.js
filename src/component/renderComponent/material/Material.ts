import { RenderComponent } from "../RenderComponent";
import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { IMaterial } from "./IMaterial";
import { initData } from "./MaterialSystem";
import { MaterialData } from "./MaterialData";

@registerClass("Material")
export class Material extends RenderComponent{
    public index:number = null;
}

initData(MaterialData);
