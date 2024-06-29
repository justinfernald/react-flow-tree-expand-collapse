import { Handle, NodeProps, Position, useNodeId } from 'reactflow';
import { TreeViewData } from '../../data/nodes-edges';
import { Button } from '@blueprintjs/core';
import { FlexColumn } from '../base/Flex';
import { flex1, fullSize } from '../../styles';
import { observer } from 'mobx-react-lite';
import { useTreeHandler } from '../../models/TreeHandler';

export const treeNodeWidth = 172;
export const treeNodeHeight = 120;

export interface TreeNodeProps extends NodeProps<TreeViewData> {}

export const TreeNode = observer((props: TreeNodeProps) => {
  const treeHandler = useTreeHandler();

  const nodeId = useNodeId();
  const node = treeHandler.getNodeById(nodeId);

  const childCount = node ? treeHandler.getChildrenCount(node) : 0;
  const descendantsCount = node ? treeHandler.getDescendantsCount(node) : 0;

  const { data, isConnectable } = props;

  const { showingChildren, setShowingChildren } = data;

  return (
    <div
      css={{
        padding: 5,
        borderRadius: 3,
        background: data.color ?? '#EEE',
        border: '1px solid black',
        width: treeNodeWidth,
        height: treeNodeHeight,
      }}
    >
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <FlexColumn css={[fullSize]}>
        <div css={flex1}>
          <div>{data.label}</div>
          {data.subLabel && <div>{data.subLabel}</div>}

          <div>Children: {childCount}</div>
          <div>Descendants: {descendantsCount}</div>
        </div>
        <Button
          css={{ alignSelf: 'center' }}
          small
          minimal
          onClick={() => setShowingChildren?.(!showingChildren)}
          icon={showingChildren ? 'chevron-up' : 'chevron-down'}
        />
      </FlexColumn>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
});
