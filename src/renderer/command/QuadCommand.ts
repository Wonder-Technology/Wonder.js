import { RenderCommand } from "./RenderCommand";
import { requireGetter, assert } from "../../definition/typescript/decorator/contract";
import { Log } from "../../utils/Log";
import { Matrix4 } from "../../math/Matrix4";
import { BufferContainer } from "../../component/geometry/data/BufferContainer";
import { Material } from "../../material/Material";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Program } from "../program/Program";

export abstract class QuadCommand extends RenderCommand {
    get program() {
        return this.material.program;
    }

    @requireGetter(function() {
        assert(!!this.mMatrix && !!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("mMatrix or vMatrix or pMatrix"));
    })
    get mvpMatrix() {
        return this.mMatrix.applyMatrix(this.vMatrix, true).applyMatrix(this.pMatrix, false);
    }

    @requireGetter(function() {
        assert(!!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("vMatrix or pMatrix"));
    })
    get vpMatrix() {
        return this.vMatrix.applyMatrix(this.pMatrix, true);
    }

    public mMatrix: Matrix4 = null;
    public vMatrix: Matrix4 = null;
    public pMatrix: Matrix4 = null;
    public buffers: BufferContainer = null;
    public material: Material = null;
    public target: GameObject = null;

    public sortId: number = null;

    public execute() {
        var material = this.material;

        material.updateShader(this);

        this.draw(material);
    }

    protected abstract draw(material: Material): void;
}