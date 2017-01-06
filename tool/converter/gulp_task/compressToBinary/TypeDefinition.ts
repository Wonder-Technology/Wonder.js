export type SourceJsonData = {
    animations:{
        [id:string]: SourceAnimation
    },
    meshes: {
        [id:string]: {
            primitives: Array<SourcePrimitive>
        }
    };
    skins:{
        [id:string]: SourceSkin
    },
}

export type SourceSkin = {
    bindShapeMatrix?:Array<number>;
    inverseBindMatrices: Array<number>;
    jointNames:Array<string>;
}

export type SourceAnimation = {
    channels: Array<any>;
    parameters: any;
    samplers: any;
}

export type SourcePrimitive = {
    attributes: SourceAttribute;
    morphTargets?:Array<SourceMorphTarget>;
    indices:Array<number>;
}

export type SourceAttribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
    JOINT?:Array<number>;
    WEIGHT?:Array<number>;
}

export type DataRecord = {
    data:Array<number>|string;
    where:string;
    componentType:number,
    type:string;
}

// export type DataRecord = {
//     data:Array<number>|string;
//     where:string;
//     componentType:number,
//     type:string;
// }
//
// export type DataRecord = {
//     data:Array<number>|string;
//     where:string;
//     componentType:number,
//     type:string;
// }

export type TargetJsonData = {
    images:{
        [id:string]: {
            uri:string
        }
    },
    animations:{
        [id:string]: Object
    },
    accessors: {
        [id:string]: Object
    },
    bufferViews:{
        [id:string]: Object
    },
    buffers:{
        [id:string]: Object
    },
    meshes: {
        [id:string]: {
            primitives: Array<TargetPrimitive>
        }
    };
}

export type TargetPrimitive = {
    attributes:TargetAttribute;
    morphTargets?:Array<TargetMorphTarget>;
    indices:string;
}

export type TargetAttribute = {
    POSITION:string;
    NORMAL?:string;
    TEXCOORD?:string;
    COLOR?:string;
}


export type SourceMorphTarget = {
    name:string;
    vertices:Array<number>;
    normals?:Array<number>;
}

export type TargetMorphTarget = {
    name:string;
    vertices:string;
    normals?:string;
}

