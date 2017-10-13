import {
    addActiveTexture as addActiveTextureUtils, clearAllBindTextureUnitCache as clearAllBindTextureUnitCacheUtils, initData as initDataUtils,
    isCached as isCachedUtils
} from "../../../utils/worker/render_file/texture/textureCacheUtils";

export const isCached = isCachedUtils;

export const addActiveTexture = addActiveTextureUtils;

export const clearAllBindTextureUnitCache = clearAllBindTextureUnitCacheUtils;

export const initData = initDataUtils;
