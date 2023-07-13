Feature: Build Acceleration
    As a Build Acceleration
    I want to build acceleration
    So that I can acceleration tracing scene

    Rule: build bvh

        Scenario: build bvh with only one leaf node
            Given create 2 aabbs
            When build bvh with minCount=2
            Then should return tree which only has one leaf node

        Scenario: build bvh with 2 depth
            Given create 3 aabbs
            When build bvh with minCount=1, maxDepth=2
            Then should return correct tree

        # Scenario: build bvh with 3 aabbs
        #     Given create 3 aabbs
        #     When build bvh with minCount=1
        #     Then should return correct tree


    Rule: build acceleartion

        Scenario: build acceleartion
            Given create 4 aabbs
            And build bvh with minCount=1
            When build acceleartion with bvh
            Then should return correct topLevel and bottomLevel

        # Scenario: build acceleartion with minCount=2
        #     Given create 4 aabbs
        #     And build bvh with minCount=2
        #     When build acceleartion with bvh
        #     Then should return correct bottomLevel

