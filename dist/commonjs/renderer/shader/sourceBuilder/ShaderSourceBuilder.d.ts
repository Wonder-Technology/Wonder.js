/// <reference types="wonder-commonlib" />
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { ShaderData } from "../shader/Shader";
export declare abstract class ShaderSourceBuilder {
    attributes: Hash<ShaderData>;
    uniforms: Hash<ShaderData>;
    vsSource: string;
    fsSource: string;
    abstract build(...args: any[]): void;
    abstract clearShaderDefinition(): void;
    dispose(): void;
    protected convertAttributesData(): void;
}
export declare type SourceDefine = {
    name: string;
    value: any;
};
