import { Component } from "../../core/Component";
import { Renderer } from "../../renderer/renderer/Renderer";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
export declare abstract class RendererComponent extends Component {
    abstract render(renderer: Renderer, target: EntityObject, camera: GameObject): any;
}
