let conjugate = ((x, y, z, w)) => (
  x *. (-1.0),
  y *. (-1.0),
  z *. (-1.0),
  w,
);

let length = ((x, y, z, w)) =>
  Js.Math.sqrt(x *. x +. y *. y +. z *. z +. w *. w);

let normalize = ((x, y, z, w) as tuple) => {
  let len = length(tuple);
  switch (len) {
  | 0. => (0., 0., 0., 1.)
  | len => (x /. len, y /. len, z /. len, w /. len)
  };
};

let invert = tuple => conjugate(tuple) |> normalize;

let multiply = ((q1x, q1y, q1z, q1w), (q2x, q2y, q2z, q2w)) => (
  q1w *. q2x +. q1x *. q2w +. q1y *. q2z -. q1z *. q2y,
  q1w *. q2y +. q1y *. q2w +. q1z *. q2x -. q1x *. q2z,
  q1w *. q2z +. q1z *. q2w +. q1x *. q2y -. q1y *. q2x,
  q1w *. q2w -. q1x *. q2x -. q1y *. q2y -. q1z *. q2z,
);

let setFromMatrix = [%raw
  matrixTypeArray => {|
             var m00, m01, m02, m10, m11, m12, m20, m21, m22,
                tr, s, rs, lx, ly, lz, m;
                var x,y,z,w;

            m = matrixTypeArray;

            // Cache matrix values for super-speed
            m00 = m[0];
            m01 = m[1];
            m02 = m[2];
            m10 = m[4];
            m11 = m[5];
            m12 = m[6];
            m20 = m[8];
            m21 = m[9];
            m22 = m[10];

            // Remove the scale from the matrix
            lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);

            m00 *= lx;
            m01 *= lx;
            m02 *= lx;
            m10 *= ly;
            m11 *= ly;
            m12 *= ly;
            m20 *= lz;
            m21 *= lz;
            m22 *= lz;

            // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf

            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                this.w = s * 0.5;
                s = 0.5 / s;
                x = (m12 - m21) * s;
                y = (m20 - m02) * s;
                z = (m01 - m10) * s;
            } else {
                if (m00 > m11) {
                    if (m00 > m22) {
                        // XDiagDomMatrix
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);

                        x = rs * 0.5;
                        rs = 0.5 / rs;
                        w = (m12 - m21) * rs;
                        y = (m01 + m10) * rs;
                        z = (m02 + m20) * rs;
                    } else {
                        // ZDiagDomMatrix
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);

                        z = rs * 0.5;
                        rs = 0.5 / rs;
                        w = (m01 - m10) * rs;
                        x = (m20 + m02) * rs;
                        y = (m21 + m12) * rs;
                    }
                } else if (m11 > m22) {
                    // YDiagDomMatrix
                    rs = (m11 - (m22 + m00)) + 1;
                    rs = Math.sqrt(rs);

                    y = rs * 0.5;
                    rs = 0.5 / rs;
                    w = (m20 - m02) * rs;
                    z = (m12 + m21) * rs;
                    x = (m10 + m01) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);

                    z = rs * 0.5;
                    rs = 0.5 / rs;
                    w = (m01 - m10) * rs;
                    x = (m20 + m02) * rs;
                    y = (m21 + m12) * rs;
                }
            }

            return [x,y,z,w]
  |}
];