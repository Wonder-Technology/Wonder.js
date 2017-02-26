import { Renderer } from "./Renderer";
import { RenderCommand } from "../command/RenderCommand";
import { Color } from "../../structure/Color";
export declare class WebGLRenderer extends Renderer {
    static create(): WebGLRenderer;
    private _commandQueue;
    private _clearOptions;
    addCommand(command: RenderCommand): void;
    hasCommand(): boolean;
    clear(): void;
    render(): void;
    init(): void;
    setClearColor(color: Color): void;
    private _clearCommand();
    private _setClearOptions(clearOptions);
}
