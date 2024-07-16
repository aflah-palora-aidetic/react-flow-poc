/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useCallback, useState } from 'react';
import { Background, Controls, MiniMap, ReactFlow, addEdge, useNodesState, useEdgesState, type OnConnect, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { transformData } from '../config/utils';
import JsonData from '../config/config_v2.json';
import { CustomNode } from './CustomNode';
import { NodeModal } from './NodeModal';
import { Box, Button, Input } from '@mui/material';
import { DownloadOutlined, UploadOutlined } from '@mui/icons-material';

type NodeData = {
    id: string;
    label?: string;
    metric?: string;
    function?: string;
    type?: string;
    data_source?: string;
    dimensions?: string[]; // Add dimensions if needed
    filters?: any[];
};

const { nodes: initialNodes, edges: initialEdges } = transformData(JsonData);

export const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>(initialNodes as unknown as Node<NodeData>[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleNodeSave = (updatedNode: NodeData) => {
        setNodes((nds) => nds.map((n) => (n?.id === selectedNode?.id ? ({ ...n, data: updatedNode } as Node<NodeData>) : n)));
    };

    const downloadJson = () => {
        const data = { nodes, edges };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flow_data.json';
        link.click();
    };

    const handleDeleteNode = () => {
        const isConfirm = confirm('Are you sure you want to delete this node?');
        if (isConfirm && selectedNode) {
            const nodeId = selectedNode.id;
            const filteredNodes = nodes.filter((node) => node.id !== nodeId);
            const filteredEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
            setNodes(filteredNodes);
            setEdges(filteredEdges);
            setSelectedNode(null);
            setModalOpen(false);
        }
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (text) {
                    const data = JSON.parse(text as string);
                    let transformedNodes = data.nodes;
                    let transformedEdges = data.edges;

                    if (!transformedNodes.some((node: any) => node.position)) {
                        const transformedData = transformData(data);
                        transformedNodes = transformedData.nodes;
                        transformedEdges = transformedData.edges;
                    }

                    setNodes(transformedNodes);
                    setEdges(transformedEdges);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <>
            <ReactFlow
                nodes={nodes}
                nodeTypes={{ custom: CustomNode }}
                onNodesChange={onNodesChange}
                edges={edges}
                edgeTypes={{}}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={(_, node) => {
                    setSelectedNode(node);
                    setModalOpen(true);
                }}
                fitView
            >
                <Background />
                <MiniMap />
                <Controls />
                <Box
                    position='absolute'
                    top={10}
                    right={10}
                    zIndex={99}
                >
                    <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        onClick={downloadJson}
                        startIcon={<DownloadOutlined />}
                        sx={{ textTransform: 'none' }}
                    >
                        Download JSON
                    </Button>
                    <Button
                        size='small'
                        variant='contained'
                        component='label'
                        startIcon={<UploadOutlined />}
                        sx={{ textTransform: 'none', marginLeft: '10px' }}
                    >
                        Load from JSON
                        <Input
                            type='file'
                            slotProps={{ input: { accept: 'application/json' } }}
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </Button>
                </Box>
            </ReactFlow>
            <NodeModal
                open={modalOpen}
                handleClose={handleModalClose}
                nodeData={selectedNode?.data || null}
                handleSave={handleNodeSave}
                handleDelete={handleDeleteNode}
            />
        </>
    );
};
