import { loadFeature, defineFeature } from 'jest-cucumber';
import { build } from '../../src/math/MiddleBVH2D';
import { createAABBData, createAABB } from '../tool/AABBTool';
import * as Acceleration from '../../src/math/Acceleration';

const feature = loadFeature('./test/features/build_acceleration.feature');

defineFeature(feature, test => {
	test('build bvh with only one leaf node', ({ given, when, then }) => {
		let allAABBData
		let tree

		given(/^create (\d+) aabbs$/, (arg0) => {
			allAABBData = [
				createAABBData(0.1, 0.2, -0.1, 0.5, 0.5, 0.1, 0, 0),
				createAABBData(0.5, 0.3, -0.1, 0.8, 0.9, 0.0, 0, 1),
			]
		});

		when(/^build bvh with minCount=(\d+)$/, (arg0) => {
			tree = build(allAABBData, arg0)
		});

		then('should return tree which only has one leaf node', () => {
			expect(tree).toEqual({
				wholeAABB: createAABB(
					0.1, 0.2, -0.1,
					0.8, 0.9, 0.1
				),
				leafAllAABBData: allAABBData,
				child1: null,
				child2: null
			})
		});
	});

	test('build bvh with 2 depth', ({ given, when, then }) => {
		let allAABBData
		let tree

		given(/^create (\d+) aabbs$/, (arg0) => {
			allAABBData = [
				createAABBData(0.5, 0.3, -0.1, 0.3, 0.35, 0.1, 0, 0),
				createAABBData(0.1, 0.2, -0.1, 0.5, 0.5, 0.1, 1, 2),
				createAABBData(-0.5, 0.2, -0.2, 0.1, 0.3, 0.1, 2, 1),
			]
		});

		when(/^build bvh with minCount=(\d+), maxDepth=(\d+)$/, (arg0, arg1) => {
			tree = build(allAABBData, arg0, arg1)
		});

		then('should return correct tree', () => {
			// console.log(JSON.stringify(tree))
			expect(tree).toEqual({
				"wholeAABB": {
					"worldMin": [
						-0.5,
						0.2,
						-0.2
					],
					"worldMax": [
						0.5,
						0.5,
						0.1
					]
				},
				"leafAllAABBData": null,
				"child1": {
					"wholeAABB": {
						"worldMin": [
							-0.5,
							0.2,
							-0.2
						],
						"worldMax": [
							0.1,
							0.3,
							0.1
						]
					},
					"leafAllAABBData": [
						{
							"aabb": {
								"worldMin": [
									-0.5,
									0.2,
									-0.2
								],
								"worldMax": [
									0.1,
									0.3,
									0.1
								]
							},
							"primitiveIndex": 2,
							"instanceIndex": 1,
							"triangle": {
								"p0WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p1WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p2WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
							}
						}
					],
					"child1": null,
					"child2": null
				},
				"child2": {
					"wholeAABB": {
						"worldMin": [
							0.1,
							0.2,
							-0.1
						],
						"worldMax": [
							0.5,
							0.5,
							0.1
						]
					},
					"leafAllAABBData": [
						{
							"aabb": {
								"worldMin": [
									0.1,
									0.2,
									-0.1
								],
								"worldMax": [
									0.5,
									0.5,
									0.1
								]
							},
							"primitiveIndex": 1,
							"instanceIndex": 2,
							"triangle": {
								"p0WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p1WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p2WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
							}
						},
						{
							"aabb": {
								"worldMin": [
									0.5,
									0.3,
									-0.1
								],
								"worldMax": [
									0.3,
									0.35,
									0.1
								]
							},
							"primitiveIndex": 0,
							"instanceIndex": 0,
							"triangle": {
								"p0WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p1WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
								"p2WorldPosition": [
									0.1,
									0.2,
									0.3,
								],
							}
						}
					],
					"child1": null,
					"child2": null
				}
			})
		});
	});

	// test('build bvh with 3 aabbs', ({ given, when, then }) => {
	// 	let allAABBData
	// 	let tree

	// 	given(/^create (\d+) aabbs$/, (arg0) => {
	// 		allAABBData = [
	// 			createAABBData(0.5, 0.3, 0.3, 0.35, 0),
	// 			createAABBData(0.1, 0.2, 0.5, 0.5, 2),
	// 			createAABBData(-0.5, 0.2, 0.1, 0.3, 1),
	// 			// createAABBData(0.2, -0.2, 0.4, 0.3, 3),
	// 			// createAABBData(0.6, -0.1, 0.4, 0.4, 4),
	// 		]
	// 	});

	// 	when(/^build bvh with minCount=(\d+)$/, (arg0) => {
	// 		tree = build(allAABBData, arg0)
	// 	});

	// 	then('should return correct tree', () => {
	// 		// console.log(JSON.stringify(tree))
	// 		expect(tree).toEqual(
	// 			{
	// 				"wholeAABB": {
	// 					"worldMin": [
	// 						-0.5,
	// 						0.2
	// 					],
	// 					"worldMax": [
	// 						0.5,
	// 						0.5
	// 					]
	// 				},
	// 				"leafAllAABBData": null,
	// 				"child1": {
	// 					"wholeAABB": {
	// 						"worldMin": [
	// 							-0.5,
	// 							0.2
	// 						],
	// 						"worldMax": [
	// 							0.1,
	// 							0.3
	// 						]
	// 					},
	// 					"leafAllAABBData": [
	// 						{
	// 							"aabb": {
	// 								"worldMin": [
	// 									-0.5,
	// 									0.2
	// 								],
	// 								"worldMax": [
	// 									0.1,
	// 									0.3
	// 								]
	// 							},
	// 							"instanceIndex": 1
	// 						}
	// 					],
	// 					"child1": null,
	// 					"child2": null
	// 				},
	// 				"child2": {
	// 					"wholeAABB": {
	// 						"worldMin": [
	// 							0.1,
	// 							0.2
	// 						],
	// 						"worldMax": [
	// 							0.5,
	// 							0.5
	// 						]
	// 					},
	// 					"leafAllAABBData": null,
	// 					"child1": {
	// 						"wholeAABB": {
	// 							"worldMin": [
	// 								0.5,
	// 								0.3
	// 							],
	// 							"worldMax": [
	// 								0.3,
	// 								0.35
	// 							]
	// 						},
	// 						"leafAllAABBData": [
	// 							{
	// 								"aabb": {
	// 									"worldMin": [
	// 										0.5,
	// 										0.3
	// 									],
	// 									"worldMax": [
	// 										0.3,
	// 										0.35
	// 									]
	// 								},
	// 								"instanceIndex": 0
	// 							}
	// 						],
	// 						"child1": null,
	// 						"child2": null
	// 					},
	// 					"child2": {
	// 						"wholeAABB": {
	// 							"worldMin": [
	// 								0.1,
	// 								0.2
	// 							],
	// 							"worldMax": [
	// 								0.5,
	// 								0.5
	// 							]
	// 						},
	// 						"leafAllAABBData": [
	// 							{
	// 								"aabb": {
	// 									"worldMin": [
	// 										0.1,
	// 										0.2
	// 									],
	// 									"worldMax": [
	// 										0.5,
	// 										0.5
	// 									]
	// 								},
	// 								"instanceIndex": 2
	// 							}
	// 						],
	// 						"child1": null,
	// 						"child2": null
	// 					}
	// 				}
	// 			}
	// 		)
	// 	});
	// });

	test('build acceleartion', ({ given, and, when, then }) => {
		let allAABBData
		let tree
		let result

		given(/^create (\d+) aabbs$/, (arg0) => {
			allAABBData = [
				createAABBData(0.5, 0.3, -0.1, 0.8, 0.9, 0.1, 0, 0),
				createAABBData(0.6, 0.2, -0.1, 0.5, 0.5, 0.1, 1, 1),
				createAABBData(-0.5, 0.2, -0.1, 0.1, 0.3, 0.1, 2, 2),
				createAABBData(0.2, -0.2, -0.1, 0.4, 0.3, 0.1, 3, 3),
				// createAABBData(0.6, -0.1, 0.4, 0.4, 4),
			]
		});

		and(/^build bvh with minCount=(\d+)$/, (arg0) => {
			tree = build(allAABBData, arg0)

			// console.log(JSON.stringify(tree));
		});

		when('build acceleartion with bvh', () => {
			result = Acceleration.build(tree)
		});

		then('should return correct topLevel and bottomLevel', () => {
			let [topLevelArr, bottomLevelArr] = result

			// console.log(topLevelArr)
			// console.log(bottomLevelArr)
			expect(topLevelArr).toEqual(
				[
					[
						-0.5, -0.2, -0.1,
						0,
						0.8, 0.9, 0.1,
						0,
						1, 4,
					],
					[
						-0.5, -0.2, -0.1,
						0,
						0.4, 0.3, 0.1,
						0,
						2, 3,
					],
					[
						0.2, -0.2, -0.1,
						0,
						0.4, 0.3, 0.1,
						1,
						0, 0,
					],
					[
						-0.5, 0.2, -0.1,
						1,
						0.1, 0.3, 0.1,
						1,
						0, 0,
					],
					[
						0.5, 0.2, -0.1,
						0,
						0.8, 0.9, 0.1,
						0,
						5, 6,
					],
					[
						0.6, 0.2, -0.1,
						2,
						0.5, 0.5, 0.1,
						1,
						0, 0,
					],
					[
						0.5, 0.3, -0.1,
						3,
						0.8, 0.9, 0.1,
						1,
						0, 0,
					]
				]
			)
			expect(bottomLevelArr).toEqual(
				[
					[0.2, -0.2, -0.1,
						3,

						0.4, 0.3, 0.1,
						3,


						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
					],
					[-0.5, 0.2, -0.1,
						2,

						0.1, 0.3, 0.1,
						2,

					+     0.1,
					+     0.2,
					+     0.3,
						0,
					+     0.1,
					+     0.2,
					+     0.3,
						0,
					+     0.1,
					+     0.2,
					+     0.3,
						0,
					],
					[0.6, 0.2, -0.1,
						1,
						0.5, 0.5, 0.1,
						1,

						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
					],
					[0.5, 0.3, -0.1,
						0,

						0.8, 0.9, 0.1,
						0,

						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
						+     0.1,
						+     0.2,
						+     0.3,
						0,
					]
				]
			)
		});
	});


	// test('build acceleartion with minCount=2', ({ given, and, when, then }) => {
	// 	let allAABBData
	// 	let tree
	// 	let result

	// 	given(/^create (\d+) aabbs$/, (arg0) => {
	// 		allAABBData = [
	// 			createAABBData(0.5, 0.3, 0.8, 0.9, 0),
	// 			createAABBData(0.6, 0.2, 0.5, 0.5, 1),
	// 			createAABBData(-0.5, 0.2, 0.1, 0.3, 2),
	// 			createAABBData(0.2, -0.2, 0.4, 0.3, 3),
	// 			// createAABBData(0.6, -0.1, 0.4, 0.4, 4),
	// 		]
	// 	});

	// 	and(/^build bvh with minCount=(\d+)$/, (arg0) => {
	// 		tree = build(allAABBData, arg0)

	// 		// console.log(JSON.stringify(tree));
	// 	});

	// 	when('build acceleartion with bvh', () => {
	// 		result = Acceleration.build(tree)
	// 	});

	// 	then('should return correct bottomLevel', () => {
	// 		let [topLevelArr, bottomLevelArr] = result

	// 		// console.log(topLevelArr)
	// 		// console.log(bottomLevelArr)
	// 		expect(bottomLevelArr).toEqual(
	// 			[
	// 				[-0.5, 0.2, 0.1, 0.3, 2],
	// 				[0.2, -0.2, 0.4, 0.3, 3],
	// 				[0.6, 0.2, 0.5, 0.5, 1],
	// 				[0.5, 0.3, 0.8, 0.9, 0]
	// 			]
	// 		)
	// 	});
	// });
});
