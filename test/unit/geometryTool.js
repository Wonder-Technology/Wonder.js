var geometryTool = {
    judgeFaceIndices: function (faces, indiceArr) {
        var face,
            indices = [];

        for (var i = 0, len = faces.length; i < len; i++) {
            face = faces[i];

            indices.push(face.aIndex, face.bIndex, face.cIndex)
        }

        expect(indices).toEqual(indiceArr);
    },
    judgeFaceNormals: function (faces, normalArr) {
        var face, faceNormals = [];

        for (var i = 0, len = faces.length; i < len; i++) {
            face = faces[i];

            faceNormals.push(
                face.faceNormal.x,
                face.faceNormal.y,
                face.faceNormal.z
            );
        }

        expect(faceNormals).toEqual(normalArr);
    },
    judgeFaceVertexNormals: function (faces, normalArr) {
        var face, faceVertexNormals = [];

        for (var i = 0, len = faces.length; i < len; i++) {
            face = faces[i];

            faceVertexNormals = faceVertexNormals.concat(
                face.vertexNormals.toArray()
                    .map(function (v) {
                        return [v.x, v.y, v.z];
                    })
                    .reduce(function (previousValue, currentValue, index, array) {
                        return previousValue.concat(currentValue);
                    })
            );
        }

        expect(faceVertexNormals).toEqual(normalArr);
    },

    judgeMorphVertexNormals: function (faces, index, normalArr) {
        var face, morphVertexNormals = [];

        for (var i = 0, len = faces.length; i < len; i++) {
            face = faces[i];

            morphVertexNormals = morphVertexNormals.concat(
                face.morphVertexNormals.getChild(index).toArray()
                    .map(function (v) {
                        return [v.x, v.y, v.z];
                    })
                    .reduce(function (previousValue, currentValue, index, array) {
                        return previousValue.concat(currentValue);
                    })
            );
        }
    }
}
