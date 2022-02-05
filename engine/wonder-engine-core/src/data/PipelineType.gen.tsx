/* TypeScript file generated from PipelineType.res by genType. */
/* eslint-disable import/first */


// tslint:disable-next-line:interface-over-type-literal
export type link = "merge" | "concat";

// tslint:disable-next-line:interface-over-type-literal
export type elementType = "job" | "group";

// tslint:disable-next-line:interface-over-type-literal
export type elementName = string;

// tslint:disable-next-line:interface-over-type-literal
export type element = { readonly name: elementName; readonly type_: elementType };

// tslint:disable-next-line:interface-over-type-literal
export type groupName = string;

// tslint:disable-next-line:interface-over-type-literal
export type group = {
  readonly name: groupName; 
  readonly link: link; 
  readonly elements: element[]
};

// tslint:disable-next-line:interface-over-type-literal
export type groups = group[];

// tslint:disable-next-line:interface-over-type-literal
export type pipelineName = string;

// tslint:disable-next-line:interface-over-type-literal
export type pipelineData = {
  readonly name: pipelineName; 
  readonly groups: groups; 
  readonly first_group: groupName
};
