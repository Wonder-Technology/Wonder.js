import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"
import { getExn } from "../../../wonder-commonlib-ts/src/NullableUtils"

export let exec: execFunc = (states) => {
    return callFunc(() => {
        let canvas = getExn(
            states["wonder-work-plugin-init-webgpu"].canvas
        )

        return {
            ...states,
            "wonder-work-plugin-init-webgpu": {
                ...states["wonder-work-plugin-init-webgpu"],
                context: canvas.getContext("webgpu")
            }
        }
    })
}