let _generateTorso = [%bs.raw
  (
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength,
    vertices,
    normals,
    texCoords,
    indices,
  ) => {|

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

        |}
];

let _generateCap =
    (
      true,
      index,
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
      vertices,
      normals,
      texCoords,
      indices,
    ) => {};

let _generateCap = [%bs.raw
  (
    top,
    index,
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength,
    vertices,
    normals,
    texCoords,
    indices,
  ) => {|

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
  |}
];

let compute =
    (
      ~openEnded=false,
      ~thetaStart=0.0,
      ~thetaLength=2. *. Js.Math._PI,
      ~radiusTop,
      ~radiusBottom,
      ~height,
      ~radialSegments,
      ~heightSegments,
      (),
    ) => {
  let vertices = [||];
  let normals = [||];
  let texCoords = [||];
  let indices = [||];

  let (index, (vertices, normals, texCoords, indices)) =
    _generateTorso(
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength,
      vertices,
      normals,
      texCoords,
      indices,
    );

  ! openEnded ?
    {
      let (index, (vertices, normals, texCoords, indices)) =
        radiusTop > 0. ?
          _generateCap(
            true,
            index,
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength,
            vertices,
            normals,
            texCoords,
            indices,
          ) :
          (index, (vertices, normals, texCoords, indices));

      let (index, (vertices, normals, texCoords, indices)) =
        radiusBottom > 0. ?
          _generateCap(
            false,
            index,
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength,
            vertices,
            normals,
            texCoords,
            indices,
          ) :
          (index, (vertices, normals, texCoords, indices));

      (vertices, normals, texCoords, indices);
    } :
    (vertices, normals, texCoords, indices);
};