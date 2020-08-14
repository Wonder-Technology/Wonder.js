


function _generateTorso (radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength,vertices,normals,texCoords,indices){

	var index = 0;
	var indexArray = [];
	var halfHeight = height / 2;
	/* var groupStart = 0; */




		var x, y;
		/* var normal = new Vector3();
		var vertex = new Vector3(); */

		/* var groupCount = 0; */

		// this will be used to calculate the normal
		var slope = ( radiusBottom - radiusTop ) / height;

		// generate vertices, normals and texCoords

		for ( y = 0; y <= heightSegments; y ++ ) {

			var indexRow = [];

			var v = y / heightSegments;

			// calculate the radius of the current row

			var radius = v * ( radiusBottom - radiusTop ) + radiusTop;

			for ( x = 0; x <= radialSegments; x ++ ) {

				var u = x / radialSegments;

				var theta = u * thetaLength + thetaStart;

				var sinTheta = Math.sin( theta );
				var cosTheta = Math.cos( theta );

				// vertex

				/* vertex.x = radius * sinTheta;
				vertex.y = - v * height + halfHeight;
				vertex.z = radius * cosTheta;
                vertices.push( vertex.x, vertex.y, vertex.z );
                 */

                vertices.push(
                    radius * sinTheta,
                - v * height + halfHeight,
radius * cosTheta
                );

				// normal

				/* normal.set( sinTheta, slope, cosTheta ).normalize();
                normals.push( normal.x, normal.y, normal.z ); */

				normals.push( sinTheta, slope, cosTheta );

				// uv

				texCoords.push( u, 1 - v );

				// save index of vertex in respective row

				indexRow.push( index ++ );

			}

			// now save vertices of the row in our index array

			indexArray.push( indexRow );

		}

		// generate indices

		for ( x = 0; x < radialSegments; x ++ ) {

			for ( y = 0; y < heightSegments; y ++ ) {

				// we use the index array to access the correct indices

				var a = indexArray[ y ][ x ];
				var b = indexArray[ y + 1 ][ x ];
				var c = indexArray[ y + 1 ][ x + 1 ];
				var d = indexArray[ y ][ x + 1 ];

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

				// update group counter

				/* groupCount += 6; */

			}

		}

		/* // add a group to the geometry. this will ensure multi material support

		scope.addGroup( groupStart, groupCount, 0 );

		// calculate new start value for groups

        groupStart += groupCount;
*/


return [
index,
[ vertices, normals, texCoords, indices ]
]

        };

function _generateCap (top,index,radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength,vertices,normals,texCoords,indices){

	var halfHeight = height / 2;

		var x, centerIndexStart, centerIndexEnd;

		/* var uv = new Vector2();
		var vertex = new Vector3(); */

		var groupCount = 0;

		var radius = ( top === true ) ? radiusTop : radiusBottom;
		var sign = ( top === true ) ? 1 : - 1;

		// save the index of the first center vertex
		centerIndexStart = index;

		// first we generate the center vertex data of the cap.
		// because the geometry needs one set of texCoords per face,
		// we must generate a center vertex per face/segment

		for ( x = 1; x <= radialSegments; x ++ ) {

			// vertex

			vertices.push( 0, halfHeight * sign, 0 );

			// normal

			normals.push( 0, sign, 0 );

			// uv

			texCoords.push( 0.5, 0.5 );

			// increase index

			index ++;

		}

		// save the index of the last center vertex

		centerIndexEnd = index;

		// now we generate the surrounding vertices, normals and texCoords

		for ( x = 0; x <= radialSegments; x ++ ) {

			var u = x / radialSegments;
			var theta = u * thetaLength + thetaStart;

			var cosTheta = Math.cos( theta );
			var sinTheta = Math.sin( theta );

			// vertex

			vertices.push( radius * sinTheta, halfHeight * sign, radius * cosTheta);

			// normal

			normals.push( 0, sign, 0 );

			// uv

			texCoords.push( ( cosTheta * 0.5 ) + 0.5, ( sinTheta * 0.5 * sign ) + 0.5 );

			// increase index

			index ++;

		}

		// generate indices

		for ( x = 0; x < radialSegments; x ++ ) {

			var c = centerIndexStart + x;
			var i = centerIndexEnd + x;

			if ( top === true ) {

				// face top

				indices.push( i, i + 1, c );

			} else {

				// face bottom

				indices.push( i + 1, i, c );

			}

			/* groupCount += 3; */

		}

		/* // add a group to the geometry. this will ensure multi material support

		scope.addGroup( groupStart, groupCount, top === true ? 1 : 2 );

		// calculate new start value for groups

		groupStart += groupCount; */


return [index, [ vertices, normals, texCoords, indices ] ];
  };

function compute($staropt$star, $staropt$star$1, $staropt$star$2, radiusTop, radiusBottom, height, radialSegments, heightSegments, param) {
  var openEnded = $staropt$star !== undefined ? $staropt$star : false;
  var thetaStart = $staropt$star$1 !== undefined ? $staropt$star$1 : 0.0;
  var thetaLength = $staropt$star$2 !== undefined ? $staropt$star$2 : 2 * Math.PI;
  var vertices = /* array */[];
  var normals = /* array */[];
  var texCoords = /* array */[];
  var indices = /* array */[];
  var match = _generateTorso(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, vertices, normals, texCoords, indices);
  var match$1 = match[1];
  var indices$1 = match$1[3];
  var texCoords$1 = match$1[2];
  var normals$1 = match$1[1];
  var vertices$1 = match$1[0];
  var index = match[0];
  var match$2 = !openEnded;
  if (match$2) {
    var match$3 = radiusTop > 0;
    var match$4 = match$3 ? _generateCap(true, index, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, vertices$1, normals$1, texCoords$1, indices$1) : /* tuple */[
        index,
        /* tuple */[
          vertices$1,
          normals$1,
          texCoords$1,
          indices$1
        ]
      ];
    var match$5 = match$4[1];
    var indices$2 = match$5[3];
    var texCoords$2 = match$5[2];
    var normals$2 = match$5[1];
    var vertices$2 = match$5[0];
    var index$1 = match$4[0];
    var match$6 = radiusBottom > 0;
    var match$7 = match$6 ? _generateCap(false, index$1, radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength, vertices$2, normals$2, texCoords$2, indices$2) : /* tuple */[
        index$1,
        /* tuple */[
          vertices$2,
          normals$2,
          texCoords$2,
          indices$2
        ]
      ];
    var match$8 = match$7[1];
    return /* tuple */[
            match$8[0],
            match$8[1],
            match$8[2],
            match$8[3]
          ];
  } else {
    return /* tuple */[
            vertices$1,
            normals$1,
            texCoords$1,
            indices$1
          ];
  }
}

export {
  _generateTorso ,
  _generateCap ,
  compute ,
  
}
/* No side effect */
