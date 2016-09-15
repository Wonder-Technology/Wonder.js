	precision highp float;

	//todo define outside?
	#define BLADE_SEGS 4.0
	#define BLADE_DIVS (BLADE_SEGS + 1.0)  // # of divisions
	#define BLADE_VERTS (BLADE_DIVS * 2.0) // # of vertices (per side, so 1/2 total)

//	uniform mat4 modelViewMatrix;
//	uniform mat4 projectionMatrix;
	uniform mat4 u_mvpMatrix; // size of grass square area (width & height)
	uniform float u_patchSize; // size of grass square area (width & height)
	uniform vec2 u_drawPos; // centre of where we want to draw
	uniform float u_time;  // used to animate bladesNG82138


	attribute float a_vIndex; // Which vertex are we drawing - the main thing we need to know
	attribute vec4 a_offset; // {x:x, y:y, z:z, w:rot} (blade's position & rotation)
	attribute vec4 a_shape; // {x:width, y:height, z:lean, w:curve} (blade's a_shape properties)

    //	varying vec4 vColor;
    //	varying vec2 vUv;
    varying vec4 v_color;
    varying vec2 v_texCoord;

	vec2 rotate (float x, float y, float r) {
		float c = cos(r);
		float s = sin(r);
		return vec2(x * c - y * s, x * s + y * c);
	}

	void main() {
//	    float a_vIndex = 1.0;
//	    vec4 a_offset = vec4(0.5);
//	    vec4 a_shape = vec4(0.5);
//a_offset


//todo rotate to towards +y?


		float vi = mod(a_vIndex, BLADE_VERTS); // vertex index for this side of the blade
		float di = floor(vi / 2.0);  // div index (0 .. BLADE_DIVS)
		float hpct = di / BLADE_SEGS;  // percent of height of blade this vertex is at
		float bside = floor(a_vIndex / BLADE_VERTS);  // front/back side of blade
		float xside = mod(vi, 2.0);  // left/right edge (x=0 or x=1)
		float x = a_shape.x * (xside - 0.5) * (1.0 - pow(hpct, 3.0)); // taper blade as approach tip
		// apply blade's natural curve amount, then apply animated curve amount by u_time
		float curve = a_shape.w + 0.4 * (sin(u_time * 4.0 + a_offset.x * 0.8) + cos(u_time * 4.0 + a_offset.y * 0.8));
		float y = a_shape.z * hpct + curve * (hpct * hpct); // pow(hpct, 2.0);

		// based on centre of view cone position, what grid tile should
		// this piece of grass be drawn at?
		vec2 gridOffset = vec2(
			floor((u_drawPos.x - a_offset.x) / u_patchSize) * u_patchSize + u_patchSize / 2.0,
			floor((u_drawPos.y - a_offset.y) / u_patchSize) * u_patchSize + u_patchSize / 2.0
		);

		// rotate this blade vertex by this blade's rotation
		vec4 pos = vec4(
			rotate(x, y, a_offset.w),
			a_shape.y * di / BLADE_SEGS + a_offset.z,
			1.0
		);

		// move to grid position and then to blade position
		pos.x += gridOffset.x + a_offset.x;
		pos.y += gridOffset.y + a_offset.y;

		// grass texture coordinate for this vertex
		vec2 uv = vec2(xside, di * 2.0);

		// cheap lighting for now - light based on rotation angle of blade
		// and depending on which side of the blade this vertex is on
		// and depending on how high up the blade we are
		// TODO: calculate normal?
		float c = max(cos(a_offset.w + bside * 3.14159) - (1.0 - hpct) * 0.4, 0.0);
		c = 0.3 + 0.7 * c * c * c;

		// outputs
		v_color = vec4(
			c * 0.85 + cos(a_offset.x * 80.0) * 0.05,
			c + sin(a_offset.y * 140.0) * 0.05,
			c + sin(a_offset.x * 99.0) * 0.05,
			1.0
		);
		v_texCoord = uv;

//        vec4 pos = vec4(1.0);

		gl_Position = u_mvpMatrix * pos;
	}
