module wd {
    export class WDMorphDataParseUtils {
        public static parseMorphData(json: IWDJsonData, sourceMorphTargets: Array<IWDMorphTarget>, arrayBufferMap:wdCb.Hash<ArrayBuffer>) {
            var morphTargets: wdCb.Hash<MorphTargetsData> = wdCb.Hash.create<MorphTargetsData>(),
                morphNormals: wdCb.Hash<MorphTargetsData> = wdCb.Hash.create<MorphTargetsData>(),
                accessor: IWDAccessor = null;

            for (let frame of sourceMorphTargets) {
                let animName = this._getAnimName(frame.name);

                morphTargets.appendChild(animName, this._getMorphDatas(json, frame.vertices, arrayBufferMap));

                if (!!frame.normals) {
                    morphNormals.appendChild(animName, this._getMorphDatas(json, frame.normals, arrayBufferMap));
                }
            }

            if (morphNormals.getCount() === 0) {
                morphNormals = null;
            }

            return {
                morphTargets: morphTargets,
                morphNormals: morphNormals
            };
        }

        private static _getMorphDatas(json: IWDJsonData, frameDataAccessorId: string, arrayBufferMap:wdCb.Hash<ArrayBuffer>) {
            var accessor = json.accessors[frameDataAccessorId],
                {bufferReader, count} = WDUtils.getBufferReaderFromAccessor(json, accessor, arrayBufferMap),
                dataArr: Array<number> = [];

            for (let i = 0; i < count; i++) {
                dataArr.push(bufferReader.readFloat());
            }

            return dataArr;
        }

        private static _getAnimName(frameName: string): string {
            const PATTERN = /([a-z]+)_?(\d+)/,
                DEFAULT_ANIM_NAME = "defaultMorphAnimation";
            var parts = frameName.match(PATTERN);

            return parts && parts.length > 1 ? parts[1] : DEFAULT_ANIM_NAME;
        }
    }
}
