import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export interface IWDTargetData {
    metadata:IWDTargetMetadata;
    gameObjects:Array<GameObject>;
}

export interface IWDTargetMetadata {
    version:string;
    generator?:string;
    copyright?:string;

    // Specifies if the shaders were generated with premultiplied alpha.
    // premultipliedAlpha?:boolean;

    profile?: {
        api? :string;
        version?:string;
    };
}
