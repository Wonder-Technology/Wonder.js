/// <reference types="wonder-commonlib" />
import { Shader } from "./Shader";
import { EngineShaderSourceBuilder } from "../sourceBuilder/EngineShaderSourceBuilder";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EngineShaderLib } from "../lib/EngineShaderLib";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";
import { ShaderSourceBuilder } from "../sourceBuilder/ShaderSourceBuilder";
export declare abstract class EngineShader extends Shader {
    protected sourceBuilder: EngineShaderSourceBuilder;
    protected libs: Collection<EngineShaderLib>;
    protected buildDefinitionData(cmd: RenderCommand, material: Material): void;
    protected createShaderSourceBuilder(): ShaderSourceBuilder;
}
