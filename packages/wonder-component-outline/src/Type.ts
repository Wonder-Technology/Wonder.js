// import { Map } from "immutable"
import { gameObject } from "wonder-core/src/abstract/scene_graph/IGameObjectForJs.gen"
import { dataNameType } from "../../wonder-component-type-outline"

export type outline = number

type color = [number, number, number]

// export type state = {
//     gameObjectOutlineMap: Map<gameObject, outline>,
//     gameObjectMap: Map<outline, gameObject>,
//     maxIndex: number,
//     outlineColorMap: Map<outline, color>
// }

export type config = {}

export type dataName = dataNameType

export type state = {
    gameObjectOutlineMap: Record<number, outline>,
    gameObjectMap: Record<outline, gameObject>,
    maxIndex: number,
    outlineColorMap: Record<outline, color>
}

