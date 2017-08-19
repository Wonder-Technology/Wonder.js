import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
import { Component } from "../Component";

export class MeshRendererData {
    public static renderGameObjectArray: Array<IUIdEntity> = null;
    public static gameObjectMap: Array<IUIdEntity> = null;
    public static meshRendererMap: Array<Component> = null;

    public static index: number = null;
    public static count: number = null;
}

