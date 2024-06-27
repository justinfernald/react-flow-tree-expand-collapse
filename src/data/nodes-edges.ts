import { Node, Edge, MarkerType } from 'reactflow';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export interface TreeNode {
  id: string;
  data: { label: string };
  children?: TreeNode[];
}

export const tree: TreeNode = {
  id: '1',
  data: { label: 'input' },
  children: [
    {
      id: '2',
      data: { label: 'node 2' },
      children: [
        { id: '2a', data: { label: 'node 2a' } },
        { id: '2b', data: { label: 'node 2b' } },
        {
          id: '2c',
          data: { label: 'node 2c' },
          children: [{ id: '2d', data: { label: 'node 2d' } }],
        },
      ],
    },
    { id: '3', data: { label: 'node 3' } },
    {
      id: '4',
      data: { label: 'node 4' },
      children: [
        {
          id: '5',
          data: { label: 'node 5' },
          children: [
            { id: '6', data: { label: 'output' } },
            { id: '7', data: { label: 'output' } },
          ],
        },
      ],
    },
  ],
};

export function convertTreeNodeToNodesAndEdges(treeNode: TreeNode): {
  nodes: Node[];
  edges: Edge[];
} {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  function traverse(node: TreeNode, parent?: TreeNode) {
    nodes.push({
      id: node.id,
      data: node.data,
      position,
      draggable: false,
      deletable: false,
    });

    if (parent) {
      edges.push({
        id: `e${parent.id}${node.id}`,
        source: parent.id,
        target: node.id,
        type: edgeType,
        animated: false,
        // markerEnd: {
        //   type: MarkerType.ArrowClosed,
        // },
      });
    }

    if (node.children) {
      node.children.forEach((child) => traverse(child, node));
    }
  }

  traverse(treeNode);

  return { nodes, edges };
}
