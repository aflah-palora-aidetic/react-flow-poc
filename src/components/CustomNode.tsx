/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Handle, Position } from '@xyflow/react';

export const CustomNode: FC<{data: any}> = ({ data }) => {
    return (
        <Box sx={{ padding: 1, borderRadius: 1, boxShadow: 3, backgroundColor: 'background.paper', width: 240 }}>
            <Card sx={{ backgroundColor: 'primary.grey', color: 'primary.text' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {data?.label}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Metric:</Box> {data?.metric}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Function:</Box> {data?.function}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Type:</Box> {data?.type}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 'bold' }}>Data Source:</Box> {data?.data_source}
                    </Typography>
                </CardContent>
                <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
                <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
            </Card>
        </Box>
    );
};