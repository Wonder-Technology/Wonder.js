import { Component } from "../../core/Component";
import { Renderer } from "../../renderer/renderer/Renderer";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export abstract class RendererComponent extends Component {
    public abstract render(renderer: Renderer, target: EntityObject, camera: GameObject);
}