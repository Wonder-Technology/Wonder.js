import { WebGLState } from "../state/WebGLState";
import { RenderCommand } from "../command/RenderCommand";
export declare abstract class Renderer {
    private _webglState;
    webglState: WebGLState;
    abstract addCommand(command: RenderCommand): void;
    abstract hasCommand(): boolean;
    abstract render(): void;
    abstract clear(): void;
    init(): void;
}
