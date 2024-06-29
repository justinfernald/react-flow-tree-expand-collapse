import { useMemo } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Node,
  Edge,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';

import { convertTreeNodeToNodesAndEdges, tree } from '../../data/nodes-edges';
import { css } from '@emotion/react';
import { TreeNode, treeNodeHeight, treeNodeWidth } from './TreeNode';
import { Direction, getLayoutedElements } from '../../utils/dagre';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FlowHandler } from '../../models/FlowHandler';
import { TreeHandler, TreeHandlerContext } from '../../models/TreeHandler';

function injectDataProperties(
  nodes: Node[],
  edges: Edge[],
  changeShowingChildren: (nodeId: string, showChildren: boolean) => void,
): { nodes: Node[]; edges: Edge[] } {
  const updatedNodes = nodes.map((node) => {
    if (node.type === NodeType.TreeNode) {
      return {
        ...node,
        data: {
          ...node.data,
          showingChildren: false,
          changeShowingChildren,
        },
      };
    }
    return node;
  });

  return { nodes: updatedNodes, edges };
}

export enum NodeType {
  TreeNode = 'treeNode',
}

const nodeTypes = {
  [NodeType.TreeNode]: TreeNode,
} as const;

export const LayoutFlow = observer(() => {
  console.log('render');

  const changeShowingChildren = action((nodeId: string, showChildren: boolean) => {
    console.log('changeShowingChildren', nodeId, showChildren);
    const node = flowHandler.nodes.find((node) => node.id === nodeId);

    if (!node) return;

    node.data.showingChildren = showChildren;
  });

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

  const { nodes: hidableNodes, edges: hidableEdges } = useMemo(
    () => injectDataProperties(layoutedNodes, layoutedEdges, changeShowingChildren),
    [layoutedNodes, layoutedEdges],
  );

  const flowHandler = useMemo(
    () => new FlowHandler(hidableNodes, hidableEdges),
    [layoutedNodes, layoutedEdges],
  );

  const treeHandler = useMemo(() => new TreeHandler(flowHandler), [flowHandler]);

  return (
    <TreeHandlerContext.Provider value={treeHandler}>
      <ReactFlow
        css={[reactFlowStyle]}
        minZoom={0.2}
        maxZoom={5}
        proOptions={{
          hideAttribution: false,
        }}
        nodes={toJS(treeHandler.nodes)}
        nodeTypes={nodeTypes}
        edges={toJS(treeHandler.edges)}
        zoomOnDoubleClick={false}
        onNodesChange={flowHandler.onNodesChange}
        onEdgesChange={flowHandler.onEdgesChange}
        onConnect={flowHandler.onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <MiniMap zoomable pannable />
        <Controls showInteractive={false} />
        <Background />
      </ReactFlow>
    </TreeHandlerContext.Provider>
  );
});

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
