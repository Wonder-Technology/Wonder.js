var dyTool = {
    judgeFaceIndices: function (faces, indiceArr) {
        var face;

        for (var i = 0, len = faces.length; i < len; i++) {
            face = faces[i];

            expect(face.aIndex).toEqual(indiceArr[i * 3]);
            expect(face.bIndex).toEqual(indiceArr[i * 3 + 1]);
            expect(face.cIndex).toEqual(indiceArr[i * 3 + 2]);
        }
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
