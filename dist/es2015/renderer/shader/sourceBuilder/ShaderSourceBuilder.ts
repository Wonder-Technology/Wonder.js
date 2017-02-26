import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ShaderData } from "../shader/Shader";
import { requireCheck, assert } from "../../../definition/typescript/decorator/contract";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { Log } from "../../../utils/Log";
import { EVariableCategory } from "../variable/EVariableCategory";
import { BufferUtils } from "../../../utils/BufferUtils";

export abstract class ShaderSourceBuilder {
    public attributes: Hash<ShaderData> = Hash.create<ShaderData>();
    public uniforms: Hash<ShaderData> = Hash.create<ShaderData>();
    public vsSource: string = null;
    public fsSource: string = null;

    public abstract build(...args): void;

    public abstract clearShaderDefinition(): void;

    public dispose() {
        this.clearShaderDefinition();
    }

    @requireCheck(function() {
        this.attributes.forEach((data: ShaderData) => {
            assert(!JudgeUtils.isFloatArray(data.value), Log.info.FUNC_SHOULD_NOT("attribute->value", "be Float array"));
        });
    })
    protected convertAttributesData() {
        this.attributes
            .filter((data: ShaderData) => {
                return data.value !== EVariableCategory.ENGINE && JudgeUtils.isArrayExactly(data.value);
            })
            .forEach((data: ShaderData, key: string) => {
                data.value = BufferUtils.convertArrayToArrayBuffer(data.type, data.value);
            });
    }
}

export type SourceDefine = {
    name: string;
    value: any;
}