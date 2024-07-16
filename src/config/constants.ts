type Rule = {
    id: string;
    field: string;
    value: string | string[];
    operator: string;
    valueSource: string;
};

type Filter = {
    id: string;
    rules: Rule[];
};

export type CustomNodeType = {
    name: string;
    id: string;
    metric: string;
    dimensions: string[];
    filters: Filter | null;
    function: string;
    type: string;
    data_source: string;
};

export type CustomEdgeType = {
    target: string;
    source: string;
    relation: string;
};
