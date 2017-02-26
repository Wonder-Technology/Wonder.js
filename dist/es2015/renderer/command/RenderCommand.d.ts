import { WebGLState } from "../state/WebGLState";
import { EDrawMode } from "../EDrawMode";
import { ElementBuffer } from "../buffer/ElementBuffer";
import { ArrayBuffer } from "../buffer/ArrayBuffer";
export declare abstract class RenderCommand {
    private _webglState;
    webglState: WebGLState;
    drawMode: EDrawMode;
    abstract execute(): void;
    init(): void;
    dispose(): void;
    protected drawElements(indexBuffer: ElementBuffer): void;
    protected drawArray(vertexBuffer: ArrayBuffer): void;
}
