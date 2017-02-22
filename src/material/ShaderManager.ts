import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Material } from "./Material";
import { ensureGetter, assert } from "../definition/typescript/decorator/contract";
import { Shader } from "../renderer/shader/shader/Shader";
import { Log } from "../utils/Log";
import { SceneDispatcher } from "../core/entityObject/scene/SceneDispatcher";
import { Director } from "../core/Director";
import { QuadCommand } from "../renderer/command/QuadCommand";

@registerClass("ShaderManager")
export class ShaderManager {
    public static create(material: Material) {
        var obj = new this(material);

        return obj;
    }

    constructor(material: Material) {
        this._material = material;
    }

    //private _shader:Shader = null;
    @ensureGetter(function(shader: Shader) {
        assert(!!shader, Log.info.FUNC_NOT_EXIST("shader"));
    })
    get shader() {
        var scene: SceneDispatcher = Director.getInstance().scene;

        // return scene.isUseShader ? this._otherShaderMap.getChild(<any>scene.currentShaderType) : this._mainShader;
        return this._mainShader;
    }

    // get mapManager(){
    //     return this.shader.mapManager;
    // }

    private _material: Material = null;
    //private _sceneShader:Shader = null;
    //private _unUseSceneShaderSubscription:wdFrp.IDisposable = null;
    // private _otherShaderMap:wdCb.Hash<Shader> = wdCb.Hash.create<Shader>();
    private _mainShader: Shader = null;

    public setShader(shader: Shader) {
        this._mainShader = shader;

        // this._mainShader.mapManager.material = this._material;
    }

    public init() {
        var material = this._material;

        // this._otherShaderMap.forEach((shader:Shader) => {
        //     shader.init(material);
        // });

        this._mainShader.init(material);
    }

    public dispose() {
        // this._otherShaderMap.forEach((shader:Shader) => {
        //     shader.dispose();
        // });

        this._mainShader.dispose();
    }

    public update(quadCmd: QuadCommand) {
        this.shader.update(quadCmd, this._material);
    }

    // public addShader(shaderKey:EShaderTypeOfScene, shader:Shader){
    //     this._otherShaderMap.addChild(<any>shaderKey, shader);
    // }

    // public hasShader(shaderKey:EShaderTypeOfScene){
    //     return this._otherShaderMap.hasChild(<any>shaderKey);
    // }

    // public getShader(shaderKey:EShaderTypeOfScene){
    //     return this._otherShaderMap.getChild(<any>shaderKey);
    // }
}