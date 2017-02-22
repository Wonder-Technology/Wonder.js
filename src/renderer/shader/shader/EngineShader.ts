import { Shader } from "./Shader";
import { EngineShaderSourceBuilder } from "../sourceBuilder/EngineShaderSourceBuilder";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { EngineShaderLib } from "../lib/EngineShaderLib";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";
import { ShaderSourceBuilder } from "../sourceBuilder/ShaderSourceBuilder";

export abstract class EngineShader extends Shader {
    protected sourceBuilder: EngineShaderSourceBuilder;
    protected libs: Collection<EngineShaderLib>;

    protected buildDefinitionData(cmd: RenderCommand, material: Material) {
        this.libs.forEach((lib: EngineShaderLib) => {
            lib.setShaderDefinition(cmd, material);
        });

        this.sourceBuilder.clearShaderDefinition();

        this.sourceBuilder.build(this.libs);

        this.attributes = this.sourceBuilder.attributes;
        this.uniforms = this.sourceBuilder.uniforms;
        this.vsSource = this.sourceBuilder.vsSource;
        this.fsSource = this.sourceBuilder.fsSource;
    }

    protected createShaderSourceBuilder(): ShaderSourceBuilder {
        return EngineShaderSourceBuilder.create();
    }
}