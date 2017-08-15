import { getColorDataSize as getSpecifyLightColorDataSize } from "../worker/render_file/light/specifyLightUtils";

export var getColorDataSize = getSpecifyLightColorDataSize;

export var getIntensityDataSize = () => 1;

export var getConstantDataSize = () => 1;

export var getLinearDataSize = () => 1;

export var getQuadraticDataSize = () => 1;

export var getRangeDataSize = () => 1;
