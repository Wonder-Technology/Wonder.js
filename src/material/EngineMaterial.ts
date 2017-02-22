import { Material } from "./Material";
import { virtual } from "../definition/typescript/decorator/virtual";
import { Shader } from "../renderer/shader/shader/Shader";
import { CommonShader } from "../renderer/shader/shader/CommonShader";
import { CommonShaderLib } from "../renderer/shader/lib/common/CommonShaderLib";
import { ShaderLibUtils } from "../utils/ShaderLibUtils";
import { ShaderLib } from "../renderer/shader/lib/ShaderLib";
import { EndShaderLib } from "../renderer/shader/lib/common/EndShaderLib";

export abstract class EngineMaterial extends Material {
    // @cloneAttributeAsBasicType()
    // public refractionRatio:number = 0;
    // @cloneAttributeAsBasicType()
    // public reflectivity:number = null;
    // @cloneAttributeAsBasicType()
    // public mapCombineMode:ETextureCombineMode = ETextureCombineMode.MIX;
    // @cloneAttributeAsBasicType()
    // public mapMixRatio:number = 0.5;

    public init() {
        this._addTopShaderLib();
        this.addShaderLib();
        this._addEndShaderLib();

        super.init();
    }

    @virtual
    protected addShaderLib() {
    }

    // protected addNormalShaderLib(){
    //     // var NormalMorphShaderLib = ClassUtils.getClass("NormalMorphShaderLib");
    //     //
    //     // if(GlobalGeometryUtils.hasMorphData(this.geometry)
    //     //     && !this.shader.hasLib(NormalMorphShaderLib)){
    //     //     this._addShaderLibToTop(NormalMorphShaderLib.create());
    //     // }
    //     // else if(!this.shader.hasLib(NormalCommonShaderLib)){
    //     //     this._addShaderLibToTop(NormalCommonShaderLib.create());
    //     // }
    // }

    protected createShader(): Shader {
        return CommonShader.create();
    }

    private _addTopShaderLib() {
        this.shader.addLib(CommonShaderLib.create());

        // InstanceUtils.addModelMatrixShaderLib(this.shader, this.geometry.entityObject);

        ShaderLibUtils.addVerticeShaderLib(this.geometry, this.shader);
    }

    private _addShaderLibToTop(lib: ShaderLib) {
        this.shader.addShaderLibToTop(lib);
    }

    private _addEndShaderLib() {
        this.shader.addLib(EndShaderLib.create());
    }
}