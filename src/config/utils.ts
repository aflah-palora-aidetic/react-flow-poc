import { CustomEdgeType, CustomNodeType } from './constants';

export const transformData = (data: { nodes: CustomNodeType[]; edges: CustomEdgeType[] }) => {
    const nodes = data.nodes.map((node) => ({
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
        position: { x: Math.random() * 1000, y: Math.random() * 800 },
    }));

    const edges = data.edges.map((edge) => ({
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: 'bezier',
    }));

    return { nodes, edges };
};
