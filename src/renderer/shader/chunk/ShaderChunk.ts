export const empty:GLSLChunk = {top:"", define:"", varDeclare:"", funcDeclare:"", funcDefine:"", body:""};
export const NULL:number = -1.0;
export const basic_materialColor_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "vec4 totalColor = vec4(u_color, 1.0);\n"};
export const end_basic_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n"};
export const common_define:GLSLChunk = {top: "",define: "#define NULL -1.0\n",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const common_fragment:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const common_function:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\n//bool isRenderListEmpty(int isRenderListEmpty){\n//  return isRenderListEmpty == 1;\n//}\n",body: ""};
export const common_vertex:GLSLChunk = {top: "",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const highp_fragment:GLSLChunk = {top: "precision highp float;\nprecision highp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const lowp_fragment:GLSLChunk = {top: "precision lowp float;\nprecision lowp int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export const mediump_fragment:GLSLChunk = {top: "precision mediump float;\nprecision mediump int;\n",define: "",varDeclare: "",funcDeclare: "",funcDefine: "",body: ""};
export type GLSLChunk = {top:string;define:string;varDeclare:string;funcDeclare:string;funcDefine:string;body:string;}
