import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { ensureGetter, it, ensure } from "../../../definition/typescript/decorator/contract";
import { Program } from "../../program/Program";
import {expect} from "wonder-expect.js";
import { cacheGetter } from "../../../definition/typescript/decorator/cache";
import { ProgramTable } from "../../../core/entityObject/scene/cache/ProgramTable";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { ShaderLib } from "../lib/ShaderLib";
import { ShaderSourceBuilder } from "../sourceBuilder/ShaderSourceBuilder";
import { RenderCommand } from "../../command/RenderCommand";
import { Material } from "../../../material/Material";
import { DeviceManager } from "../../../device/DeviceManager";
import { execOnlyOnce } from "../../../definition/typescript/decorator/control";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { Log } from "../../../utils/Log";
import { $BREAK } from "wonder-commonlib/dist/es2015/global/Const";
import { EVariableType } from "../variable/EVariableType";

export abstract class Shader {
    private _attributes: Hash<ShaderData> = Hash.create<ShaderData>();
    get attributes() {
        return this._attributes;
    }
    set attributes(attributes: Hash<ShaderData>) {
        if (this._isNotEqual(attributes, this._attributes)) {
            this.definitionDataDirty = true;
        }
        this._attributes = attributes;
    }

    private _uniforms: Hash<ShaderData> = Hash.create<ShaderData>();
    get uniforms() {
        return this._uniforms;
    }
    set uniforms(uniforms: Hash<ShaderData>) {
        if (this._isNotEqual(uniforms, this._uniforms)) {
            this.definitionDataDirty = true;
        }
        this._uniforms = uniforms;
    }

    private _vsSource: string = "";
    get vsSource() {
        return this._vsSource;
    }
    set vsSource(vsSource: string) {
        if (vsSource !== this._vsSource) {
            this.definitionDataDirty = true;
        }
        this._vsSource = vsSource;
    }

    private _fsSource: string = "";
    get fsSource() {
        return this._fsSource;
    }
    set fsSource(fsSource: string) {
        if (fsSource !== this._fsSource) {
            this.definitionDataDirty = true;
        }
        this._fsSource = fsSource;
    }

    get dirty() {
        return this.libDirty || this.definitionDataDirty;
    }

    @ensureGetter(function(program: Program) {
        it(`program should exist(its table key is ${this._getProgramTableKey()}`, () => {
            expect(program).exist;
        }, this);
    })
    @cacheGetter(function() {
        return this._programCache !== null;
    }, function() {
        return this._programCache;
    }, function(program: Program) {
        this._programCache = program;
    })
    get program() {
        return ProgramTable.getProgram(this._getProgramTableKey());
    }

    public libDirty: boolean = false;
    public definitionDataDirty: boolean = false;
    // public mapManager:MapManager = MapManager.create();

    protected libs: Collection<ShaderLib> = Collection.create<ShaderLib>();
    protected sourceBuilder: ShaderSourceBuilder = this.createShaderSourceBuilder();

    private _programCache: Program = null;
    // private _instanceStateCache:InstanceState = null;

    public abstract update(cmd: RenderCommand, material: Material);

    public createVsShader() {
        var gl = DeviceManager.getInstance().gl;

        return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
    }

    public createFsShader() {
        var gl = DeviceManager.getInstance().gl;

        return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
    }

    @execOnlyOnce("_isInit")
    public init(material: Material) {
        this.libs.forEach((lib: ShaderLib) => {
            lib.init();
        });

        this.judgeRefreshShader(null, material);

        // this.mapManager.init();
    }

    public dispose() {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();

        this.libs.forEach((lib: ShaderLib) => {
            lib.dispose();
        });

        // this.mapManager.dispose();

        this._clearAllCache();
    }

    public hasLib(lib: ShaderLib);
    public hasLib(_class: Function);

    public hasLib(...args) {
        if (args[0] instanceof ShaderLib) {
            let lib: ShaderLib = args[0];

            return this.libs.hasChild(lib);
        }
        else {
            let _class = args[0];

            return this.libs.hasChildWithFunc((lib: ShaderLib) => {
                return lib instanceof _class;
            })
        }
    }

    @ensure(function() {
        it("should set ShaderLib.shader to be this", () => {
            this.libs.forEach((lib: ShaderLib) => {
                expect(lib.shader === this).true;
            });
        }, this);
        it("libDirty should be true", () => {
            expect(this.libDirty).true;
        }, this);
    })
    public addLib(lib: ShaderLib) {
        this.libs.addChild(lib);

        lib.shader = this;

        this.libDirty = true;
    }

    @ensure(function(val, lib: ShaderLib) {
        it("should add shader lib to the top", () => {
            expect(JudgeUtils.isEqual(lib, this.libs.getChild(0))).true;
        }, this);
        it("should set ShaderLib.shader to be this", () => {
            this.libs.forEach((lib: ShaderLib) => {
                expect(lib.shader === this).true;
            });
        }, this);
        it("libDirty should be true", () => {
            expect(this.libDirty).true;
        }, this);
    })
    public addShaderLibToTop(lib: ShaderLib) {
        this.libs.unShiftChild(lib);

        lib.shader = this;

        this.libDirty = true;
    }

    public getLib(libClass: Function) {
        return this.libs.findOne((lib: ShaderLib) => {
            return lib instanceof libClass;
        });
    }

    public getLibs() {
        return this.libs;
    }

    public removeLib(lib: ShaderLib);
    public removeLib(func: Function);

    public removeLib(...args) {
        this.libDirty = true;

        return this.libs.removeChild(args[0]);
    }

    public removeAllLibs() {
        this.libDirty = true;

        this.libs.removeAllChildren();
    }

    public sortLib(func: (a: ShaderLib, b: ShaderLib) => any) {
        this.libDirty = true;

        this.libs.sort(func, true);
    }

    protected abstract createShaderSourceBuilder(): ShaderSourceBuilder;
    protected abstract buildDefinitionData(cmd: RenderCommand, material: Material): void;


    protected judgeRefreshShader(cmd: RenderCommand, material: Material) {
        if (this.libDirty) {
            // this._instanceStateCache = null;
            this.buildDefinitionData(cmd, material);
        }

        if (this.definitionDataDirty) {
            this._programCache = null;
            this._registerAndUpdateProgram();
            this._programCache = null;
        }


        this.libDirty = false;
        this.definitionDataDirty = false;
    }

    private _registerAndUpdateProgram() {
        var key = this._getProgramTableKey();

        if (ProgramTable.hasProgram(key)) {
            return;
        }

        ProgramTable.addProgram(key, Program.create());
        this._updateProgram();
    }

    private _updateProgram() {
        this.program.initWithShader(this);
    }

    private _getProgramTableKey() {
        return `${this.vsSource}\n${this.fsSource}`;
    }

    private _initShader(shader, source) {
        var gl = DeviceManager.getInstance().gl;

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Log.log(gl.getShaderInfoLog(shader));
            Log.log("attributes:\n", this.attributes);
            Log.log("uniforms:\n", this.uniforms);
            Log.log("source:\n", source);
        }
    }

    private _isNotEqual(list1: Hash<ShaderData>, list2: Hash<ShaderData>) {
        var result = false;

        list1.forEach((data: ShaderData, key: string) => {
            var list2Data = list2.getChild(key);

            if (!list2Data || data.type !== list2Data.type || data.value !== list2Data.value) {
                result = true;
                return $BREAK;
            }
        });

        return result;
    }

    private _clearAllCache() {
        this._programCache = null;
        // this._instanceStateCache = null;
    }
}

export type ShaderData = {
    type: EVariableType;
    value?: any;
    textureId?: string;
}

    // type InstanceState = {
    //     isModelMatrixInstance:boolean;
    //     isNormalMatrixInstance:boolean;
    //     isHardwareInstance:boolean;
    //     isBatchInstance:boolean
    // }