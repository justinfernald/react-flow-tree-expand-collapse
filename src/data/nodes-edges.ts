import { Node, Edge } from 'reactflow';
import { NodeType } from '../components/flow/DagreTree';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export interface TreeData {
  label: string;
  subLabel?: string;
  color?: string;
}

export interface TreeViewData extends TreeData {
  showingChildren: boolean;
  setShowingChildren?(showingChildren: boolean): void;
}

export interface TreeNode {
  id: string;
  data: TreeData;
  children?: TreeNode[];
}

export const tree: TreeNode = {
  id: '1',
  data: { label: 'input', subLabel: 'subLabel', color: '#FFCC00' },
  children: [
    {
      id: '2',
      data: { label: 'node 2' },
      children: [
        { id: '2a', data: { label: 'node 2a', subLabel: 'subLabel', color: '#FFCC00' } },
        { id: '2b', data: { label: 'node 2b', subLabel: 'subLabel', color: '#FFCC00' } },
        {
          id: '2c',
          data: { label: 'node 2c' },
          children: [{ id: '2d', data: { label: 'node 2d' } }],
        },
      ],
    },
    { id: '3', data: { label: 'node 3', color: '#CC0000' } },
    {
      id: '4',
      data: { label: 'node 4' },
      children: [
        {
          id: '5',
          data: { label: 'node 5' },
          children: [
            { id: '6', data: { label: 'output', subLabel: 'asdfasd' } },
            { id: '7', data: { label: 'output', subLabel: 'bruh' } },
          ],
        },
      ],
    },
  ],
};

export function convertTreeNodeToNodesAndEdges(
  treeNode: TreeNode,
  changeShowingChildren: (nodeId: string, showChildren: boolean) => void,
): {
  nodes: Node<TreeViewData>[];
  edges: Edge[];
} {
  const nodes: Node<TreeViewData>[] = [];
  const edges: Edge[] = [];

  function traverse(node: TreeNode, parent?: TreeNode) {
    nodes.push({
      id: node.id,
      data: {
        showingChildren: true,
        setShowingChildren: (showingChildren: boolean) => {
          changeShowingChildren(node.id, showingChildren);
        },
        ...node.data,
      },
      position,
      draggable: false,
      deletable: false,
      type: NodeType.TreeNode,
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
