import { WebGLState } from "../state/WebGLState";
import { BasicState } from "../state/BasicState";
import { EDrawMode } from "../EDrawMode";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { ElementBuffer } from "../buffer/ElementBuffer";
import { DeviceManager } from "../../device/DeviceManager";
import { BufferTable } from "../../core/entityObject/scene/cache/BufferTable";
import { GlUtils } from "../GlUtils";
import { ArrayBuffer } from "../buffer/ArrayBuffer";

export abstract class RenderCommand {
    private _webglState: WebGLState = null;
    get webglState() {
        return this._webglState ? this._webglState : BasicState.create();
    }
    set webglState(webglState: WebGLState) {
        this._webglState = webglState;
    }

    public drawMode: EDrawMode = EDrawMode.TRIANGLES;
    // public blend:boolean = false;
    // public vaoManager:VAOManager = null;

    public abstract execute(): void;

    @virtual
    public init() {
    }

    @virtual
    public dispose() {
    }

    protected drawElements(indexBuffer: ElementBuffer) {
        var startOffset: number = 0,
            gl = DeviceManager.getInstance().gl;

        BufferTable.bindIndexBuffer(indexBuffer);

        GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
    }

    protected drawArray(vertexBuffer: ArrayBuffer) {
        var startOffset: number = 0,
            gl = DeviceManager.getInstance().gl;

        GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
    }
}