import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
  Connection,
  MiniMap,
  Controls,
  Background,
  getOutgoers,
  getConnectedEdges,
  getIncomers,
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import { convertTreeNodeToNodesAndEdges, tree } from '../../data/nodes-edges';
import { css } from '@emotion/react';
import { TreeNode, treeNodeHeight, treeNodeWidth } from './TreeNode';
import { Direction, getLayoutedElements } from './utils/dagre';
import { makeAutoObservable } from 'mobx';

export class FlowHandler {
  nodes: Node[] = [];
  edges: Edge[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onNodesChange = (nodes: Node[]) => {
    this.nodes = nodes;
  }

  onEdgesChange = (edges: Edge[]) => {
    this.edges = edges;
  }

  onConnect = (params: Connection) => {
    this.edges = addEdge(params, this.edges);
  }

  
}

export enum NodeType {
  TreeNode = 'treeNode',
}

const nodeTypes = {
  [NodeType.TreeNode]: TreeNode,
} as const;

export const LayoutFlow = () => {
  useEffect(() => {
    setTimeout(() => {
      handleUpdate();
    }, 100);
  }, []);

  const changeShowingChildren = (nodeId: string, showChildren: boolean) => {
    console.log('changeShowingChildren', nodeId, showChildren);
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== nodeId) {
          return node;
        }
        return {
          ...node,
          data: {
            ...node.data,
            showingChildren: showChildren,
          },
        };
      }),
    );

    setTimeout(() => {
      handleUpdate();
    }, 100);
  };
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertTreeNodeToNodesAndEdges(tree, changeShowingChildren),
    [],
  );

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () =>
      getLayoutedElements(
        initialNodes,
        initialEdges,
        Direction.Vertical,
        treeNodeWidth,
        treeNodeHeight,
      ),
    [initialNodes, initialEdges],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      ),
    [],
  );

  const hide = useCallback(
    (hidden: boolean, childEdgeIDs: string[], childNodeIDs: string[]) =>
      (nodeOrEdge: Node | Edge) => {
        if (childEdgeIDs.includes(nodeOrEdge.id) || childNodeIDs.includes(nodeOrEdge.id))
          nodeOrEdge.hidden = hidden;
        return { ...nodeOrEdge };
      },
    [],
  );

  const hideChildren = useCallback(
    (node: Node, nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } => {
      const outgoers = getOutgoers(node, nodes, edges);
      const childNodeIDs = outgoers.map((node) => node.id);
      const childEdgeIDs = getConnectedEdges(outgoers, edges).map((edge) => edge.id);

      const updatedNodes = nodes.map(hide(true, childEdgeIDs, childNodeIDs)) as Node[];
      const updatedEdges = edges.map(hide(true, childEdgeIDs, childNodeIDs)) as Edge[];

      return outgoers.reduce(
        (acc, childEdge) => hideChildren(childEdge, acc.nodes, acc.edges),
        { nodes: updatedNodes, edges: updatedEdges },
      );
    },
    [],
  );

  const showChildren = (
    node: Node,
    nodes: Node[],
    edges: Edge[],
  ): { nodes: Node[]; edges: Edge[] } => {
    const outgoers = getOutgoers(node, nodes, edges);
    const childNodeIDs = outgoers.map((node) => node.id);
    const childEdgeIDs = getConnectedEdges(outgoers, edges).map((edge) => edge.id);

    const updatedNodes = nodes.map(hide(false, childEdgeIDs, childNodeIDs)) as Node[];
    const updatedEdges = edges.map(hide(false, childEdgeIDs, childNodeIDs)) as Edge[];

    return outgoers.reduce(
      (acc, childEdge) => showChildren(childEdge, acc.nodes, acc.edges),
      { nodes: updatedNodes, edges: updatedEdges },
    );
  };

  const handleUpdate = () => {
    const rootNodes = nodes.filter(
      (node) => getIncomers(node, nodes, edges).length === 0,
    );
  };

  return (
    <ReactFlow
      css={[reactFlowStyle]}
      minZoom={0.2}
      maxZoom={5}
      proOptions={{
        hideAttribution: true,
      }}
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      zoomOnDoubleClick={false}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <MiniMap zoomable pannable />
      <Controls showInteractive={false} />
      <Background />
    </ReactFlow>
  );
};

export const reactFlowStyle = css({
  '& .react-flow__handle': {
    opacity: 0,
    height: 0,
    width: 0,
  },
  '& .react-flow__handle-left': {
    left: 0,
  },
  '& .react-flow__handle-top': {
    top: 0,
  },
  '& .react-flow__handle-right': {
    right: 0,
  },
  '& .react-flow__handle-bottom': {
    bottom: 0,
  },
});
