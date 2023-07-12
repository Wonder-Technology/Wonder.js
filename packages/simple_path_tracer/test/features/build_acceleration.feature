Feature: Build Acceleration
    As a Build Acceleration
    I want to build acceleration
    So that I can acceleration tracing scene

    # Rule: build bvh by middle

    #     Scenario: build bvh with only one leaf node by middle
    #         Given create 2 aabbs
    #         When build bvh with minCount=2
    #         Then should return tree which only has one leaf node

    #     Scenario: build bvh with 2 depth by middle
    #         Given create 3 aabbs
    #         When build bvh with minCount=1, maxDepth=2
    #         Then should return correct tree

    #     Scenario: build bvh with 3 aabbs by middle
    #         Given create 3 aabbs
    #         When build bvh with minCount=1
    #         Then should return correct tree

    Rule: build bvh by lbvh

        Scenario: build bvh with only one leaf node by lbvh
            Given create 2 aabbs
            When build bvh with minCount=2
            Then should return tree which only has one leaf node

        Scenario: build bvh with 2 depth by lbvh
            Given create 3 aabbs
            When build bvh with minCount=1, maxDepth=2
            Then should return correct tree

        Scenario: build bvh with 2 same aabbs by lbvh
            Given create 3 aabbs
            When build bvh with minCount=1, maxDepth=2
            Then should return correct tree

        Scenario Outline: find bit
            When find <Binary> bit at <Index>
            Then should return <Bit>

            Examples:

                | Binary                 | Index | Bit |
                | 0b11111111100011011011 | 20    | 1   |
                | 0b11111111100011011011 | 3     | 0   |

        Scenario Outline: morton encode
            When morton encode <GridPositionX>, <GridPositionY>
            Then should return <Code>

            Examples:

                | GridPositionX | GridPositionY | Code                   |
                | 0b1111001101  | 0b1111101011  | 0b11111111100011011011 |

        # Scenario: aaa
        #     Given create 3 aabbs
        #     When build bvh with minCount=1, maxDepth=2
        #     Then should return correct tree

    Rule: build acceleartion

        Scenario: build acceleartion
            Given create 4 aabbs
            And build bvh with minCount=1
            When build acceleartion with bvh
            Then should return correct topLevel and bottomLevel

        Scenario: build acceleartion with minCount=2
            Given create 4 aabbs
            And build bvh with minCount=2
            When build acceleartion with bvh
            Then should return correct bottomLevel

