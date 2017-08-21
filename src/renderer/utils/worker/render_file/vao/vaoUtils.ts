import { deleteVal } from "../../../../../utils/objectUtils";
import { WebGLVertexArrayObject } from "../../../../extend/interface";

export var removeVao = (index:number, vaos:Array<WebGLVertexArrayObject>) => {
    /*!
     no need to consider the memory problem caused by not-used val in vaos, because geometry index will be repeat(geometry memory will be reallocated)
     */
    deleteVal(index, vaos);
}

export var initData = (VaoDataFromSystem:any) => {
    VaoDataFromSystem.vaos = [];
}
