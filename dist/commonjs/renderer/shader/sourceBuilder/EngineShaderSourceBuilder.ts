import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { ShaderSourceBuilder, SourceDefine } from "./ShaderSourceBuilder";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { requireCheck, assert } from "../../../definition/typescript/decorator/contract";
import { EngineShaderLib } from "../lib/EngineShaderLib";
import { Log } from "../../../utils/Log";
import { main_begin, main_end } from "../snippet/ShaderSnippet";
import { GPUDetector, EGPUPrecision } from "../../../device/GPUDetector";
import { lowp_fragment, mediump_fragment, highp_fragment } from "../chunk/ShaderChunk";
import { ShaderData } from "../shader/Shader";
import { VariableTypeTable } from "../variable/VariableTypeTable";
import { EVariableType } from "../variable/EVariableType";

//todo add custom define
@registerClass("EngineShaderSourceBuilder")
export class EngineShaderSourceBuilder extends ShaderSourceBuilder {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vsSourceTop: string = "";
    public vsSourceDefine: string = "";
    public vsSourceVarDeclare: string = "";
    public vsSourceFuncDeclare: string = "";
    public vsSourceFuncDefine: string = "";
    public vsSourceBody: string = "";

    public fsSourceTop: string = "";
    public fsSourceDefine: string = "";
    public fsSourceVarDeclare: string = "";
    public fsSourceFuncDeclare: string = "";
    public fsSourceFuncDefine: string = "";
    public fsSourceBody: string = "";

    public vsSourceDefineList: Collection<SourceDefine> = Collection.create<SourceDefine>();
    public fsSourceDefineList: Collection<SourceDefine> = Collection.create<SourceDefine>();

    public vsSourceExtensionList: Collection<string> = Collection.create<string>();
    public fsSourceExtensionList: Collection<string> = Collection.create<string>();

    @requireCheck(function(libs: Collection<EngineShaderLib>) {
        assert(this.vsSource === null, Log.info.FUNC_SHOULD("vsSource", "be null"));
        assert(this.fsSource === null, Log.info.FUNC_SHOULD("fsSource", "be null"));
    })
    public build(libs: Collection<EngineShaderLib>) {
        this._readLibSource(libs);

        if (this.vsSource === null) {
            this._buildVsSource();
        }
        if (this.fsSource === null) {
            this._buildFsSource();
        }

        this.convertAttributesData();
    }

    public clearShaderDefinition() {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();

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

    private _readLibSource(libs: Collection<EngineShaderLib>) {
        var setSourceLibs = libs.filter((lib: EngineShaderLib) => {
            return lib.vsSource !== null || lib.fsSource !== null;
        });

        this._judgeAndSetVsSource(setSourceLibs);
        this._judgeAndSetFsSource(setSourceLibs);

        this._judgeAndSetPartSource(libs);
    }

    private _judgeAndSetVsSource(setSourceLibs: Collection<EngineShaderLib>) {
        var setVsSourceLib = setSourceLibs.findOne((lib: EngineShaderLib) => {
            return lib.vsSource !== null;
        });

        if (setVsSourceLib) {
            this.vsSource = setVsSourceLib.vsSource;
        }
    }

    private _judgeAndSetFsSource(setSourceLibs: Collection<EngineShaderLib>) {
        var setFsSourceLib = setSourceLibs.findOne((lib: EngineShaderLib) => {
            return lib.fsSource !== null;
        });

        if (setFsSourceLib) {
            this.fsSource = setFsSourceLib.fsSource;
        }
    }

    private _judgeAndSetPartSource(libs: Collection<EngineShaderLib>) {
        var vsSource = this.vsSource,
            fsSource = this.fsSource,
            attributes = this.attributes,
            uniforms = this.uniforms,
            vsSourceDefineList = this.vsSourceDefineList,
            fsSourceDefineList = this.fsSourceDefineList,
            vsSourceExtensionList = this.vsSourceExtensionList,
            fsSourceExtensionList = this.fsSourceExtensionList,
            vsSourceTop = "",
            vsSourceDefine = "",
            vsSourceVarDeclare = "",
            vsSourceFuncDeclare = "",
            vsSourceFuncDefine = "",
            vsSourceBody = "",
            fsSourceTop = "",
            fsSourceDefine = "",
            fsSourceVarDeclare = "",
            fsSourceFuncDeclare = "",
            fsSourceFuncDefine = "",
            fsSourceBody = "";

        libs.forEach((lib: EngineShaderLib) => {
            attributes.addChildren(lib.attributes);
            uniforms.addChildren(lib.uniforms);

            if (vsSource === null) {
                vsSourceTop += lib.vsSourceTop;
                vsSourceDefine += lib.vsSourceDefine;
                vsSourceVarDeclare += lib.vsSourceVarDeclare;
                vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                vsSourceFuncDefine += lib.vsSourceFuncDefine;
                vsSourceBody += lib.vsSourceBody;

                vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                vsSourceExtensionList.addChildren(lib.vsSourceExtensionList);
            }

            if (fsSource === null) {
                fsSourceTop += lib.fsSourceTop;
                fsSourceDefine += lib.fsSourceDefine;
                fsSourceVarDeclare += lib.fsSourceVarDeclare;
                fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                fsSourceFuncDefine += lib.fsSourceFuncDefine;
                fsSourceBody += lib.fsSourceBody;

                fsSourceDefineList.addChildren(lib.fsSourceDefineList);
                fsSourceExtensionList.addChildren(lib.fsSourceExtensionList);
            }
        });

        if (vsSource === null) {
            this.vsSourceTop = vsSourceTop;
            this.vsSourceDefine = vsSourceDefine;
            this.vsSourceVarDeclare = vsSourceVarDeclare;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare;
            this.vsSourceFuncDefine = vsSourceFuncDefine;
            this.vsSourceBody = vsSourceBody;
        }

        if (fsSource === null) {
            this.fsSourceTop = fsSourceTop;
            this.fsSourceDefine = fsSourceDefine;
            this.fsSourceVarDeclare = fsSourceVarDeclare;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare;
            this.fsSourceFuncDefine = fsSourceFuncDefine;
            this.fsSourceBody = fsSourceBody;
        }
    }

    private _buildVsSource() {
        this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceVarDeclare() + this._buildVsSourceFuncDeclare() + this._buildVsSourceFuncDefine() + this._buildVsSourceBody();
    }

    private _buildFsSource() {
        this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceVarDeclare() + this._buildFsSourceFuncDeclare() + this._buildFsSourceFuncDefine() + this._buildFsSourceBody();
    }

    private _buildVsSourceTop() {
        return this._buildVsSourceExtension() + this._getPrecisionSource() + this.vsSourceTop;
    }

    private _buildVsSourceDefine() {
        return this._buildSourceDefine(this.vsSourceDefineList) + this.vsSourceDefine;
    }

    private _buildVsSourceExtension() {
        return this._buildSourceExtension(this.vsSourceExtensionList);
    }

    private _buildVsSourceVarDeclare() {
        return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceVarDeclare, this.vsSourceFuncDefine, this.vsSourceBody) + this.vsSourceVarDeclare;
    }

    private _buildVsSourceFuncDeclare() {
        return this.vsSourceFuncDeclare;
    }

    private _buildVsSourceFuncDefine() {
        return this.vsSourceFuncDefine;
    }

    private _buildVsSourceBody() {
        return main_begin + this.vsSourceBody + main_end;
    }

    private _buildFsSourceTop() {
        return this._buildFsSourceExtension() + this._getPrecisionSource() + this.fsSourceTop;
    }

    private _buildFsSourceDefine() {
        return this._buildSourceDefine(this.fsSourceDefineList) + this.fsSourceDefine;
    }

    private _buildFsSourceExtension() {
        return this._buildSourceExtension(this.fsSourceExtensionList);
    }

    private _buildFsSourceVarDeclare() {
        return this._generateUniformSource(this.fsSourceVarDeclare, this.fsSourceFuncDefine, this.fsSourceBody) + this.fsSourceVarDeclare;
    }

    private _buildFsSourceFuncDeclare() {
        return this.fsSourceFuncDeclare;
    }

    private _buildFsSourceFuncDefine() {
        return this.fsSourceFuncDefine;
    }

    private _buildFsSourceBody() {
        return main_begin + this.fsSourceBody + main_end;
    }

    private _buildSourceDefine(defineList: Collection<SourceDefine>) {
        var result = "";

        defineList.forEach((sourceDefine: SourceDefine) => {
            if (sourceDefine.value === void 0) {
                result += `#define ${sourceDefine.name}\n`;
            }
            else {
                result += `#define ${sourceDefine.name} ${sourceDefine.value}\n`;
            }
        });

        return result;
    }

    private _buildSourceExtension(extensionList: Collection<string>) {
        var result = "";

        extensionList.forEach((name: string) => {
            result += `#extension ${name} : enable\n`;
        });

        return result;
    }

    private _getPrecisionSource() {
        var precision = GPUDetector.getInstance().precision,
            result = null;

        switch (precision) {
            case EGPUPrecision.HIGHP:
                result = highp_fragment.top;
                break;
            case EGPUPrecision.MEDIUMP:
                result = mediump_fragment.top;
                break;
            case EGPUPrecision.LOWP:
                result = lowp_fragment.top;
                break;
            default:
                result = "";
                break;
        }

        return result;
    }

    private _generateAttributeSource() {
        var result = "";

        this.attributes.filter((data: ShaderData, key: string) => {
            return !!data;
        }).forEach((data: ShaderData, key: string) => {
            result += `attribute ${VariableTypeTable.getVariableType(data.type)} ${key};\n`;
        });

        return result;
    }

    private _generateUniformSource(sourceVarDeclare: string, sourceFuncDefine: string, sourceBody: string) {
        var result = "",
            self = this;

        this.uniforms.filter((data: ShaderData, key: string) => {
            return !!data && data.type !== EVariableType.STRUCTURE && data.type !== EVariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
        }).forEach((data: ShaderData, key: string) => {
            result += `uniform ${VariableTypeTable.getVariableType(data.type)} ${key};\n`;
        });

        return result;
    }

    private _isExistInSource(key: string, source: string) {
        return source.indexOf(key) !== -1;
    }
}

