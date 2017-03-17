import { Entity } from "../Entity";
import { cloneAttributeAsBasicType, CloneUtils } from "../../definition/typescript/decorator/clone";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
import { CustomEventRegisterData } from "../../event/binder/CustomEventRegister";
import { ComponentManager } from "./manager/ComponentManager";
import { IDisposable } from "wonder-frp/dist/es2015/Disposable/IDisposable";
import { EntityObjectManager } from "./manager/EntityObjectManager";
import { virtual } from "../../definition/typescript/decorator/virtual";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { Component } from "../Component";
import { Geometry } from "../../component/geometry/Geometry";
import { EventManager } from "../../event/EventManager";
import { cache } from "../../definition/typescript/decorator/cache";
import { Renderer } from "../../renderer/renderer/Renderer";
import { GameObject } from "./gameObject/GameObject";
import { Transform } from "../../component/transform/Transform";
import { ensure, it } from "../../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
import { JudgeUtils } from "../../utils/JudgeUtils";
import {DataOrientedComponent} from "../../component/DataOrientedComponent";
import {DataOrientedComponentTypeIdManager} from "../../component/DataOrientedComponentTypeIdManager";
import {SortUtils} from "../../utils/SortUtils";
import {ComponentInitOrderTable} from "../../component/data/ComponentInitOrderTable";

export abstract class EntityObject extends Entity {
    private _bubbleParent: EntityObject = null;
    @cloneAttributeAsBasicType()
    get bubbleParent() {
        return this._bubbleParent ? this._bubbleParent : this.parent;
    }
    set bubbleParent(bubbleParent: EntityObject) {
        this._bubbleParent = bubbleParent;
    }

    set componentDirty(componentDirty: boolean) {
        if (componentDirty === true) {
            this.clearCache();
        }
    }

    get transform() {
        return this.componentManager.transform;
    }

    @cloneAttributeAsBasicType()
    public name: string = null;
    @cloneAttributeAsBasicType()
    public parent: EntityObject = null;

    public customEventMap: Hash<Collection<CustomEventRegisterData>> = Hash.create<Collection<CustomEventRegisterData>>();

    protected componentManager: ComponentManager = ComponentManager.create(this);

    private _hasComponentCache: Hash<boolean> = Hash.create<boolean>();
    private _getComponentCache: Hash<boolean> = Hash.create<boolean>();
    private _componentChangeSubscription: IDisposable = null;
    private _entityObjectManager: EntityObjectManager = EntityObjectManager.create(this);

    @virtual
    public initWhenCreate() {
        this.addDataOrientedComponent(this.createTransform());
    }

    // @requireCheck(function(config:CloneEntityObjectConfigData = <any>{}){
    //     it("if has OneToManySourceInstance component, not support share geometry", () => {
    //         if(config.shareGeometry){
    //             expect(this.hasComponent(OneToManySourceInstance)).false;
    //         }
    //     });
    // })
    public clone(config: CloneEntityObjectConfigData = <any>{}) {
        var result = null;

        if (CloneUtils.isNotClone((this))) {
            return null;
        }

        config = ExtendUtils.extend({
            cloneChildren: true,
            shareGeometry: false,
            cloneGeometry: true
        }, config);

        result = CloneUtils.clone<EntityObject>(this);

        this.forEachComponent((component: Component) => {
            if (!config.cloneGeometry && component instanceof Geometry) {
                return;
            }

            if (config.shareGeometry && component instanceof Geometry) {
                result.addComponent(component, true);
                return;
            }

            result.addComponent(component.clone());
        });

        if (config.cloneChildren) {
            this._cloneChildren(result);
        }

        return result;
    }

    public init() {
        var self = this;

        // this._componentChangeSubscription = EventManager.fromEvent(this, <any>EEngineEvent.COMPONENT_CHANGE)
        //     .subscribe(() => {
        //         self._onComponentChange();
        //     });

        this.componentManager.init();

        //todo test
        for (let component of SortUtils.insertSort(this._componentMap.toArray(), (a: Component, b: Component) => {
            return ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable.getOrder(b);
        })) {
            component.init();
        }



        this._entityObjectManager.init();

        this.afterInitChildren();

        // ScriptComponentContainer.getInstance().execEntityObjectScriptOnlyOnce(this, "init");

        return this;
    }

    public dispose() {
        super.dispose();
        // this.onDispose();

        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }

        // EventManager.off(this);

        // this._componentChangeSubscription && this._componentChangeSubscription.dispose();

        this.componentManager.dispose();
        this._entityObjectManager.dispose();

        EventManager.off(this);
    }

    public hasChild(child: EntityObject): boolean {
        return this._entityObjectManager.hasChild(child);
    }

    public addChild(child: EntityObject): EntityObject {
        this._entityObjectManager.addChild(child);

        return this;
    }

    public getChildren() {
        return this._entityObjectManager.getChildren();
    }

    public removeChild(child: EntityObject): EntityObject {
        this._entityObjectManager.removeChild(child);

        return this;
    }

    public forEach(func: (entityObject: EntityObject, index: number) => void) {
        this._entityObjectManager.forEach(func);

        return this;
    }

    @cache(function(_class: any) {
        return this._getComponentCache.hasChild(_class.name);
    }, function(_class: any) {
        return this._getComponentCache.getChild(_class.name);
    }, function(result, _class: any) {
        this._getComponentCache.addChild(_class.name, result);
    })
    public getComponent<T>(_class: any): T {
        return this.componentManager.getComponent<T>(_class);
    }

    public hasComponent(component: Component): boolean;
    public hasComponent(_class: Function): boolean;

    /*!
     not use @cache,
     here judge return data of "getChild", so it don't need to invoke "hasChild"
     */
    public hasComponent(...args) {
        var key = this._getHasComponentCacheKey(args[0]),
            result = this._hasComponentCache.getChild(key);

        if (result !== void 0) {
            return result;
        }

        result = this.componentManager.hasComponent(args[0]);

        this._hasComponentCache.addChild(key, result);

        return result;
    }

    public addComponent(component: Component, isShareComponent: boolean = false) {
        this.componentManager.addComponent(component, isShareComponent);

        this.componentDirty = true;

        return this;
    }

    public removeComponent(component: Component);
    public removeComponent(_class: Function);

    public removeComponent(...args) {
        this.componentManager.removeComponent(args[0]);

        this.componentDirty = true;

        return this;
    }

    public forEachComponent(func: (component: Component) => void) {
        this.componentManager.forEachComponent(func);

        return this;
    }






    //todo refactor
    private _componentMap:Hash<DataOrientedComponent> = Hash.create<DataOrientedComponent>();

    public addDataOrientedComponent(component: DataOrientedComponent) {
        component.addToObject(this);

        this._componentMap.addChild(DataOrientedComponentTypeIdManager.getTypeIdFromComponent(component), component);

        return this;
    }

    public getDataOrientedComponent<T extends DataOrientedComponent>(_class: T): T {
        return this._componentMap.getChild(DataOrientedComponentTypeIdManager.getTypeIdFromClass(_class)) as T;
    }

    public removeDataOrientedComponent(component: DataOrientedComponent){
        //todo optimize Hash->removeChild: not return data; not judge param
        this._componentMap.removeChild(DataOrientedComponentTypeIdManager.getTypeIdFromComponent(component));

        component.removeFromObject(this);

        return this;
    }






    @virtual
    public render(renderer: Renderer, camera: GameObject): void {
        var rendererComponent = null;

        rendererComponent = this.componentManager.getRendererComponent();

        if (rendererComponent) {
            rendererComponent.render(renderer, this, camera);
        }

        this.getRenderList().forEach((child: EntityObject) => {
            child.render(renderer, camera);
        });
    }

    public update(elapsed: number): void {
        this.forEach((child: EntityObject) => {
            child.update(elapsed);
        });
    }

    public clearCache() {
        this._hasComponentCache.removeAllChildren();
        this._getComponentCache.removeAllChildren();
    }

    @virtual
    public getGeometry() {
        return this.componentManager.getGeometry();
    }

    protected abstract createTransform(): Transform;

    @virtual
    protected afterInitChildren() {
    }

    @virtual
    protected getRenderList() {
        return this.getChildren();
    }

    @ensure(function(key: string) {
        it(`key:${key} be string`, () => {
            expect(JudgeUtils.isString(key)).true;
        });
    })
    private _getHasComponentCacheKey(...args) {
        if (JudgeUtils.isComponenet(args[0])) {
            let component: Component = args[0];

            return String(component.uid);
        }
        else {
            let _class: any = args[0];

            return _class.name;
        }
    }

    private _cloneChildren(result: EntityObject) {
        this.forEach((child: EntityObject) => {
            var resultChild = child.clone();

            if (resultChild !== null) {
                result.addChild(resultChild);
            }
        });
    }
}

export type CloneEntityObjectConfigData = {
    cloneChildren?: boolean;
    shareGeometry?: boolean;
    cloneGeometry?: boolean;
}