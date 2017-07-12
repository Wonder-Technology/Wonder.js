import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
import { Component } from "../Component";

export class MeshRendererData {
    public static renderGameObjectArray: Array<IUIDEntity> = null;
    public static gameObjectMap: Array<IUIDEntity> = null;
    public static meshRendererMap: Array<Component> = null;

    public static index: number = null;
    public static count: number = null;
}

