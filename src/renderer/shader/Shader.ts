import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { initData } from "./ShaderSystem";
import { ShaderData } from "./ShaderData";

registerClass("Shader")
export class Shader{
    public index:number = null;
}

initData(ShaderData);