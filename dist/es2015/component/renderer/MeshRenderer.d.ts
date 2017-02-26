import { RendererComponent } from "./RendererComponent";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Renderer } from "../../renderer/renderer/Renderer";
import { Geometry } from "../geometry/Geometry";
import { QuadCommand } from "../../renderer/command/QuadCommand";
export declare class MeshRenderer extends RendererComponent {
    static create(): MeshRenderer;
    entityObject: GameObject;
    render(renderer: Renderer, target: GameObject, camera: GameObject): void;
    protected createDrawCommand(target: GameObject, geometry: Geometry, camera: GameObject): QuadCommand;
    private _createCommand(target, material);
}
