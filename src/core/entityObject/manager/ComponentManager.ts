import { registerClass } from "../../../definition/typescript/decorator/registerClass";
import { EntityObject } from "../EntityObject";
import { Transform } from "../../../component/transform/Transform";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { RendererComponent } from "../../../component/renderer/RendererComponent";
import { Geometry } from "../../../component/geometry/Geometry";
import { SortUtils } from "../../../utils/SortUtils";
import { Component } from "../../Component";
import { ComponentInitOrderTable } from "../../../component/data/ComponentInitOrderTable";
import { JudgeUtils } from "../../../utils/JudgeUtils";
import { require, it } from "../../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";

@registerClass("ComponentManager")
export class ComponentManager {
    public static create(entityObject: EntityObject) {
        var obj = new this(entityObject);

        return obj;
    }

    constructor(entityObject: EntityObject) {
        this._entityObject = entityObject;
    }

    public transform: Transform = null;

    private _entityObject: EntityObject = null;
    private _components: Collection<any> = Collection.create<any>();
    private _rendererComponent: RendererComponent = null;
    private _geometry: Geometry = null;

    public init() {
        for (let component of SortUtils.insertSort(this._components.getChildren(), (a: Component, b: Component) => {
            return ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable.getOrder(b);
        })) {
            component.init();
        }
    }

    public dispose() {
        var components = this.removeAllComponent();

        components.forEach((component: Component) => {
            component.dispose();
        });

        this._components.removeAllChildren();
    }

    public removeAllComponent() {
        var result = Collection.create<Component>();

        this._components.forEach((component: Component) => {
            this._removeComponentHandler(component);

            result.addChild(component)
        }, this);

        //this._componentDirty = true;

        return result;
    }

    public getComponent<T>(_class: any): T {
        return this._components.findOne((component: Component) => {
            return component instanceof _class;
        });
    }

    public getComponents() {
        return this._components;
    }

    public findComponentByUid(uid: number) {
        return this._components.findOne((component: Component) => {
            return component.uid === uid;
        });
    }

    public forEachComponent(func: (component: Component) => void) {
        this._components.forEach(func);

        return this;
    }

    public hasComponent(component: Component): boolean;
    public hasComponent(_class: Function): boolean;

    public hasComponent(...args) {
        var result: boolean = null;

        if (JudgeUtils.isComponenet(args[0])) {
            let component = args[0];

            result = this._components.hasChild(component);
        }
        else {
            let _class = args[0];

            result = this._components.hasChildWithFunc((component) => {
                return component instanceof _class;
            });
        }

        return result;
    }

    @require(function(component: Component, isShareComponent: boolean = false) {
        if (!component) {
            return;
        }

        it("should not add the component which is already added", () => {
            expect(this.hasComponent(component)).false;
        });
    })
    public addComponent(component: Component, isShareComponent: boolean = false) {
        if (!component) {
            return;
        }

        if (component instanceof RendererComponent) {
            this._rendererComponent = component;
        }
        else if (component instanceof Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform) {
            if (this.transform) {
                this.removeComponent(this.transform);
            }

            this.transform = component;
        }

        component.addToObject(this._entityObject, isShareComponent);

        this._components.addChild(component);

        return this;
    }

    public removeComponent(component: Component);
    public removeComponent(_class: Function);

    public removeComponent(...args) {
        var component: Component = null;

        if (args[0] instanceof Component) {
            component = <Component>args[0];
        }
        else {
            component = this.getComponent<any>(<Function>args[0]);
        }

        if (component) {
            this._components.removeChild(component);

            this._removeComponentHandler(component);
        }

        //this._componentDirty = true;

        return this;
    }

    // public addAllComponentToComponentContainer(){
    //     this._components.forEach((component:Component) => component.addToComponentContainer());
    // }
    //
    // public removeAllComponentFromComponentContainer(){
    //     this._components.forEach((component:Component) => component.removeFromComponentContainer());
    // }

    public getComponentCount(_class: Function) {
        return this._components.filter((component: Component) => {
            return component instanceof _class;
        }).getCount();
    }

    @require(function() {
        it("entityObject shouldn't contain more than 1 geometry component", () => {
            expect(this.getComponentCount(Geometry)).lessThan(2);
        });
    })
    public getGeometry(): Geometry {
        return this._geometry;
    }

    @require(function() {
        it("entityObject shouldn't contain more than 1 rendererComponent", () => {
            expect(this.getComponentCount(RendererComponent)).lessThan(2);
        });
    })
    public getRendererComponent(): RendererComponent {
        return this._rendererComponent;
    }

    private _removeComponentHandler(component: Component) {
        component.removeFromObject(this._entityObject);
    }
}