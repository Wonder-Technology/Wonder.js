import { ShaderLib } from "./ShaderLib";
import { EngineShader } from "../shader/EngineShader";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ShaderVariable, VariableLib } from "../variable/VariableLib";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { virtual } from "../../../definition/typescript/decorator/virtual";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";
import { Program } from "../../program/Program";
import { EVariableType } from "../variable/EVariableType";
import { requireCheck, assert, it } from "../../../definition/typescript/decorator/contract";
import { Log } from "../../../utils/Log";
import { GLSLChunk, empty } from "../chunk/ShaderChunk";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import expect from "wonder-expect.js";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
// import { SourceDefine } from "../sourceBuilder/ShaderSourceBuilder";

export abstract class EngineShaderLib extends ShaderLib {
    public shader: EngineShader;

    public abstract vsChunk: GLSLChunk;
    public abstract fsChunk: GLSLChunk;

    public attributes: Hash<ShaderVariable> = Hash.create<ShaderVariable>();
    public uniforms: Hash<ShaderVariable> = Hash.create<ShaderVariable>();
    public vsSourceTop: string = "";
    public vsSourceDefine: string = "";
    public vsSourceVarDeclare: string = "";
    public vsSourceFuncDeclare: string = "";
    public vsSourceFuncDefine: string = "";
    public vsSourceBody: string = "";
    public vsSource: string = null;

    public fsSourceTop: string = "";
    public fsSourceDefine: string = "";
    public fsSourceVarDeclare: string = "";
    public fsSourceFuncDeclare: string = "";
    public fsSourceFuncDefine: string = "";
    public fsSourceBody: string = "";
    public fsSource: string = null;
    public vsSourceDefineList: Collection<any> = Collection.create<any>();
    public fsSourceDefineList: Collection<any> = Collection.create<any>();
    public vsSourceExtensionList: Collection<string> = Collection.create<string>();
    public fsSourceExtensionList: Collection<string> = Collection.create<string>();

    @virtual
    public setShaderDefinition(cmd: RenderCommand, material: Material) {
        var vs = null,
            fs = null;

        this._clearShaderDefinition();

        vs = this.getVsChunk();
        fs = this.getFsChunk();

        vs && this.setVsSource(vs);
        fs && this.setFsSource(fs);
    }

    protected sendAttributeBuffer(program: Program, name: string, data: any) {
        program.sendAttributeBuffer(name, EVariableType.BUFFER, data);
    }

    @requireCheck(function(program: Program, name: string, data: any) {
        assert(!!VariableLib[name], `${name} should exist in VariableLib`);
    })
    protected sendUniformData(program: Program, name: string, data: any) {
        program.sendUniformData(name, VariableLib[name].type, data);
    }

    protected getVsChunk();
    protected getVsChunk(chunk: GLSLChunk);

    protected getVsChunk(...args) {
        var chunk = args.length === 0 ? this.vsChunk : args[0];

        return this._getChunk(chunk, EShaderLibType.vs);
    }

    protected getFsChunk();
    protected getFsChunk(chunk: GLSLChunk);

    protected getFsChunk(...args) {
        var chunk = args.length === 0 ? this.fsChunk : args[0];

        return this._getChunk(chunk, EShaderLibType.fs);
    }

    @requireCheck(function() {
        assert(this.vsSource === null, Log.info.FUNC_SHOULD("vsSource", "be null"));
    })
    protected setVsSource(vs: GLSLChunk | string, operator: string = "=") {
        if (JudgeUtils.isString(vs)) {
            this.vsSource = <string>vs;
        }
        else {
            this._setSource(vs, EShaderLibType.vs, operator);
        }
    }

    @requireCheck(function() {
        assert(this.fsSource === null, Log.info.FUNC_SHOULD("fsSource", "be null"));
    })
    protected setFsSource(fs: GLSLChunk | string, operator: string = "=") {
        if (JudgeUtils.isString(fs)) {
            this.fsSource = <string>fs;
        }
        else {
            this._setSource(fs, EShaderLibType.fs, operator);
        }
    }

    protected addAttributeVariable(variableArr: Array<string>) {
        this._addVariable(this.attributes, variableArr);
    }

    protected addUniformVariable(variableArr: Array<string>) {
        this._addVariable(this.uniforms, variableArr);
    }

    @requireCheck(function(target: Hash<ShaderVariable>, variableArr: Array<string>) {
        variableArr.forEach((variable: string) => {
            it("should exist in VariableLib", function() {
                expect(VariableLib[variable]).exist;
            });
        });
    })
    private _addVariable(target: Hash<ShaderVariable>, variableArr: Array<string>) {
        variableArr.forEach((variable: string) => {
            assert(VariableLib[variable], Log.info.FUNC_SHOULD(variable, "exist in VariableLib"));

            target.addChild(variable, VariableLib[variable]);
        });
    }

    private _clearShaderDefinition() {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();
        this.vsSourceExtensionList.removeAllChildren();
        this.fsSourceExtensionList.removeAllChildren();

        this.vsSourceTop = "";
        this.vsSourceDefine = "";
        this.vsSourceVarDeclare = "";
        this.vsSourceFuncDeclare = "";
        this.vsSourceFuncDefine = "";
        this.vsSourceBody = "";
        this.vsSource = null;

        this.fsSourceTop = "";
        this.fsSourceDefine = "";
        this.fsSourceVarDeclare = "";
        this.fsSourceFuncDeclare = "";
        this.fsSourceFuncDefine = "";
        this.fsSourceBody = "";
        this.fsSource = null;
    }

    private _getChunk(chunk: GLSLChunk | null, sourceType: EShaderLibType) {
        var key = null;

        if (chunk === null) {
            return empty;
        }

        return chunk;
    }

    private _setSource(chunk: GLSLChunk, sourceType: EShaderLibType, operator: string) {
        if (!chunk) {
            return;
        }

        switch (operator) {
            case "+":
                this[`${sourceType}SourceTop`] += chunk.top;
                this[`${sourceType}SourceDefine`] += chunk.define;
                this[`${sourceType}SourceVarDeclare`] += chunk.varDeclare;
                this[`${sourceType}SourceFuncDeclare`] += chunk.funcDeclare;
                this[`${sourceType}SourceFuncDefine`] += chunk.funcDefine;
                this[`${sourceType}SourceBody`] += chunk.body;
                break;
            case "=":
                this[`${sourceType}SourceTop`] = chunk.top;
                this[`${sourceType}SourceDefine`] = chunk.define;
                this[`${sourceType}SourceVarDeclare`] = chunk.varDeclare;
                this[`${sourceType}SourceFuncDeclare`] = chunk.funcDeclare;
                this[`${sourceType}SourceFuncDefine`] = chunk.funcDefine;
                this[`${sourceType}SourceBody`] = chunk.body;
                break;
            default:
                Log.error(true, Log.info.FUNC_INVALID("opertor:", operator));
                break;
        }
    }
}

enum EShaderLibType {
    vs = <any>"vs",
    fs = <any>"fs"
}