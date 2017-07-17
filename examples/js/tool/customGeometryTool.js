var customGeometryTool = (function () {
    return {
        setVertices:wd.setCustomGeometryVertices,
        setNormals:wd.setCustomGeometryNormals,
        setTexCoords:wd.setCustomGeometryTexCoords,
        setIndices:wd.setCustomGeometryIndices,
        create: wd.createCustomGeometry
    }
})()
