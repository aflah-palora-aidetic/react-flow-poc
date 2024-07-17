// src/components/NodeModal.js
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';

interface NodeData {
    id: string;
    label?: string;
    metric?: string;
    function?: string;
    type?: string;
    data_source?: string;
}

interface NodeModalProps {
    open: boolean;
    handleClose: () => void;
    nodeData: NodeData | null;
    handleSave: (nodeData: NodeData) => void;
    handleDelete: () => void;
}

export const NodeModal: FC<NodeModalProps> = ({ open, handleClose, nodeData, handleSave, handleDelete }) => {
    const [formData, setFormData] = useState<NodeData>(nodeData || { id: '' });

    useEffect(() => {
        setFormData(nodeData || { id: '' });
    }, [nodeData]);

    const handleChange = (field: keyof NodeData) => (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const onSave = () => {
        handleSave(formData);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            component='form'
            onSubmit={(e) => {
                e.preventDefault();
                onSave();
            }}
        >
            <DialogTitle>Edit Node</DialogTitle>
            <DialogContent>
                <Box
                    display='flex'
                    flexDirection='column'
                    gap={2}
                    p={3}
                >
                    <TextField
                        label='Label'
                        value={formData?.label || ''}
                        onChange={handleChange('label')}
                        fullWidth
                    />
                    <TextField
                        label='Metric'
                        value={formData?.metric || ''}
                        onChange={handleChange('metric')}
                        fullWidth
                    />
                    <TextField
                        label='Function'
                        value={formData?.function || ''}
                        onChange={handleChange('function')}
                        fullWidth
                    />
                    <TextField
                        label='Type'
                        value={formData?.type || ''}
                        onChange={handleChange('type')}
                        fullWidth
                    />
                    <TextField
                        label='Data Source'
                        value={formData?.data_source || ''}
                        onChange={handleChange('data_source')}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                {nodeData && handleDelete && (
                    <Button
                        sx={{ textTransform: 'none' }}
                        color='error'
                        variant='contained'
                        onClick={handleDelete}
                    >
                        Delete Node
                    </Button>
                )}
                <Button
                    sx={{ textTransform: 'none' }}
                    variant='outlined'
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    sx={{ textTransform: 'none' }}
                    // onClick={onSave}
                    variant='contained'
                    type='submit'
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
