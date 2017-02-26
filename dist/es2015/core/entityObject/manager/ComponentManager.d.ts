/// <reference types="wonder-commonlib" />
import { EntityObject } from "../EntityObject";
import { Transform } from "../../../component/transform/Transform";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { RendererComponent } from "../../../component/renderer/RendererComponent";
import { Geometry } from "../../../component/geometry/Geometry";
import { Component } from "../../Component";
export declare class ComponentManager {
    static create(entityObject: EntityObject): ComponentManager;
    constructor(entityObject: EntityObject);
    transform: Transform;
    private _entityObject;
    private _components;
    private _rendererComponent;
    private _geometry;
    init(): void;
    dispose(): void;
    removeAllComponent(): Collection<Component>;
    getComponent<T>(_class: any): T;
    getComponents(): Collection<any>;
    findComponentByUid(uid: number): any;
    forEachComponent(func: (component: Component) => void): this;
    hasComponent(component: Component): boolean;
    hasComponent(_class: Function): boolean;
    addComponent(component: Component, isShareComponent?: boolean): this;
    removeComponent(component: Component): any;
    removeComponent(_class: Function): any;
    getComponentCount(_class: Function): number;
    getGeometry(): Geometry;
    getRendererComponent(): RendererComponent;
    private _removeComponentHandler(component);
}
