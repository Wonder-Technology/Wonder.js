import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Component } from "../../core/Component";
import { Geometry } from "../geometry/Geometry";

//todo optimize:Component add "initOrder" attri
@registerClass("ComponentInitOrderTable")
export class ComponentInitOrderTable {
    public static getOrder(component: Component) {
        // if(component instanceof SourceInstance){
        //     return 1;
        // }
        // if(JudgeUtils.isClass(component, "Shadow")){
        //     return 2;
        // }
        // if(JudgeUtils.isClass(component, "ThreeDBitmapFont")){
        //     return 3;
        // }
        if (component instanceof Geometry) {
            return 4;
        }

        return 5;
    }
}