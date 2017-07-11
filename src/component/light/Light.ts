import { Component } from "../Component";
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("Light")
export abstract class Light extends Component{
}

export var checkLightShouldAlive = (component:Light) => {
    checkComponentShouldAlive(component, null, (component:Light) => {
        return isComponentIndexNotRemoved(component);
    })
}
