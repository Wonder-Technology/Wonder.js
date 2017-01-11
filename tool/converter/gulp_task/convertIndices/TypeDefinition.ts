export type SourceJsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<SourcePrimitive>
        }
    };
}

export type SourcePrimitive = {
    attributes: Attribute;
    morphTargets?: Array<MorphTarget>;
    verticeIndices:Array<number>;
    normalIndices:Array<number>;
    texCoordIndices:Array<number>;
    colorIndices:Array<number>;
    material:string;
    mode:number;
    name:string;
}

export type TargetJsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<TargetPrimitive>
        }
    };
}

export type TargetPrimitive = {
    attributes: Attribute;
    morphTargets?: Array<MorphTarget>;
    indices:Array<number>;
    material:string;
    mode:number;
    name:string;
}


export type MorphTarget = {
    name:string;
    vertices:Array<number>;
    normals?:Array<number>;
}

export type Attribute = {
    POSITION:Array<number>;
    NORMAL?:Array<number>;
    TEXCOORD?:Array<number>;
    COLOR?:Array<number>;
    JOINT?:Array<number>;
    WEIGHT?:Array<number>;
}
