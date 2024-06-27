import { MouseEvent, useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
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
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';
import { convertTreeNodeToNodesAndEdges, tree } from '../../data/nodes-edges';
import { css } from '@emotion/react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: initialNodes, edges: initialEdges } = convertTreeNodeToNodesAndEdges(tree);

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

export const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds),
      ),
    [],
  );
  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const [hidden, setHidden] = useState(true);

  const hide =
    (hidden: boolean, childEdgeIDs: string[], childNodeIDs: string[]) =>
    (nodeOrEdge: Node | Edge) => {
      if (childEdgeIDs.includes(nodeOrEdge.id) || childNodeIDs.includes(nodeOrEdge.id))
        nodeOrEdge.hidden = hidden;
      return nodeOrEdge;
    };

  const checkTarget = (edge: Edge[], id: string) => {
    let edges = edge.filter((ed) => {
      return ed.target !== id;
    });
    return edges;
  };

  let outgoers: Node[] = [];
  let connectedEdges: Edge[] = [];
  let stack = [];

  const nodeClick = (e: MouseEvent, node: Node) => {
    let currentNodeID = node.id;
    stack.push(node);
    while (stack.length > 0) {
      let lastNode = stack.pop();

      if (!lastNode) {
        break;
      }

      let childNodes = getOutgoers(lastNode, nodes, edges);
      let childEdges = checkTarget(getConnectedEdges([lastNode], edges), currentNodeID);
      childNodes.map((goer, key) => {
        stack.push(goer);
        outgoers.push(goer);
      });
      childEdges.map((edge, key) => {
        connectedEdges.push(edge);
      });
    }

    let childNodeIDs = outgoers.map((node) => {
      return node.id;
    });
    let childEdgeIDs = connectedEdges.map((edge) => {
      return edge.id;
    });

    const hidden = !(getOutgoers(node, nodes, edges)[0].hidden ?? false);

    setNodes((node) => node.map(hide(hidden, childEdgeIDs, childNodeIDs)) as Node[]);
    setEdges((edges) => edges.map(hide(hidden, childEdgeIDs, childNodeIDs)) as Edge[]);
    setHidden(!hidden);
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
      edges={edges}
      zoomOnDoubleClick={false}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={nodeClick}
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
