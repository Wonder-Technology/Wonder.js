/* let getHandle = (gl, shaderIndex, program, state:StateDataType.state) => {

                    for (let i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {

                        if (isColorDirty(i, AmbientLightDataFromSystem)) {
                            sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);

                            cleanColorDirty(i, AmbientLightDataFromSystem);
                        }
                    }
} */