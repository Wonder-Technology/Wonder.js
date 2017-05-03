import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { DataOrientedComponent } from "../../component/DataOrientedComponent";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { EntityObject } from "./EntityObject";

export var addComponent = requireCheckFunc((component: DataOrientedComponent, entityObject:EntityObject, componentMap:Hash<DataOrientedComponent>, DataOrientedComponentTypeIdManager:any) => {
    it("component should exist", () => {
        expect(component).exist;
    });
    it("shouldn't has this type of component", () => {
        expect(hasComponent(component, componentMap, DataOrientedComponentTypeIdManager)).false;
    });
}, (component: DataOrientedComponent, entityObject:EntityObject, componentMap:Hash<DataOrientedComponent>, DataOrientedComponentTypeIdManager:any) => {
    return IO.of(() => {
        component.addToObject(entityObject);

        componentMap.addChild(String(DataOrientedComponentTypeIdManager.getTypeIdFromComponent(component)), component);

        return this;
    });
})

export var hasComponent = (component: DataOrientedComponent, componentMap:Hash<DataOrientedComponent>, DataOrientedComponentTypeIdManager:any) => {
    return componentMap.hasChild(DataOrientedComponentTypeIdManager.getTypeIdFromComponent(component));
}
