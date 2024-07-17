import { Edge, Node } from '@xyflow/react';
import { CustomEdgeType, CustomNodeType, Filter, NodeData } from './constants';

export const transformData = (data: { nodes: CustomNodeType[]; edges: CustomEdgeType[] }) => {
    const xSpacing = 400;
    const ySpacing = 300;
    let currentX = 0;
    let currentY = 0;
    let rowCount = 0;

    const nodes = data.nodes.map((node) => {
        const position = { x: currentX, y: currentY };
        currentX += xSpacing;
        rowCount++;

        if (rowCount >= 5) {
            currentX = 0;
            currentY += ySpacing;
            rowCount = 0;
        }

        return {
            id: node.id,
            type: 'custom',
            data: {
                label: node.name,
                metric: node.metric,
                function: node.function,
                type: node.type,
                data_source: node.data_source,
                dimensions: node.dimensions,
                filters: node.filters,
            },
            position: position,
        };
    });

    const edges = data.edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: 'bezier',
        animated: edge.relation === 'inverse',
    }));

    return { nodes, edges };
};

export const reverseTransformData = (transformedData: { nodes: Node<NodeData>[]; edges: Edge[] }) => {
    const nodes: CustomNodeType[] = transformedData.nodes.map((node) => ({
        name: node?.data?.label as string,
        id: node?.id as string,
        metric: node?.data?.metric as string,
        dimensions: node?.data?.dimensions as string[],
        filters: node?.data?.filters as unknown as Filter,
        function: node?.data?.function as string,
        type: node?.data?.type as string,
        data_source: node?.data?.data_source as string,
    }));

    const edges: CustomEdgeType[] = transformedData.edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
        relation: edge.animated ? 'inverse' : 'direct', // Adjust the relation based on whether the edge is animated
    }));

    return { nodes, edges };
};
