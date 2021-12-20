import { execFunc } from "../Type"
import { callFunc } from "wonder-facade/src/MostAPI"

export let exec: execFunc = (states) => {
	return callFunc(() => {
		console.log("update camera job exec");

		let perspectiveCameraProjectionRepo = repo.sceneGraphRepo.perspectiveCameraProjectionRepo

		let allDirtyPerspectiveCameraProjectionList = perspectiveCameraProjectionRepo.getAllDirtyPerspectiveCameraProjections();

		allDirtyPerspectiveCameraProjectionList.forEach(perspectiveCameraProjectionRepo.updatePerspectiveCameraProjection)
		perspectiveCameraProjectionRepo.clearDirtyList();

		return states;
	})
}