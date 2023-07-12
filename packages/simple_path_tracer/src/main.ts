import { createState } from "./data/CreateData";
import { exec as init } from "./pipeline/InitPipeline";
import { exec as render } from "./pipeline/RenderPipeline";
import { createGeometryBuffer, createMaterialBuffer, createScene, createTransformBuffer } from "./scene/CreateScene";

let _buildScene = (state, { transformCount, geometryCount, materialCount }) => {
	return {
		...state,
		ecsData: createScene(transformCount),
		transformBuffer: createTransformBuffer(transformCount),
		geometryBuffer: createGeometryBuffer(geometryCount),
		materialBuffer: createMaterialBuffer(materialCount)
	}
}

let _main = async () => {
	// let count = { transformCount: 25000, geometryCount: 1, materialCount: 1 }
	// let count = { transformCount: 1000000, geometryCount: 1, materialCount: 1 }
	// let count = { transformCount: 20, geometryCount: 1, materialCount: 1 }
	// let count = { transformCount: 4000000, geometryCount: 1, materialCount: 1 }
	let count = { transformCount: 1000000, geometryCount: 1, materialCount: 1 }
	// let count = { transformCount: 500000, geometryCount: 1, materialCount: 1 }
	// let count = { transformCount: 3000000, geometryCount: 1, materialCount: 1 }

	let state = createState()

	state = _buildScene(state, count)

	state = await init(state)

	let stateContainer = {
		state: state
	}

	function frame() {
		let state = render(stateContainer.state)

		stateContainer.state = state

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
};

_main().then(() => {
	console.log("finish ");
});
