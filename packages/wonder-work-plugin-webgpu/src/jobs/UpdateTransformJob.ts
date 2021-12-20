import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"

export let exec: execFunc = (states) => {
	return callFunc(() => {
		console.log("update transform job exec");

		let transformRepo = repo.sceneGraphRepo.transformRepo

		const allTransformList = transformRepo.getAllTransforms();

		allTransformList.forEach(transformRepo.updateTransform)

		return states;
	})
}