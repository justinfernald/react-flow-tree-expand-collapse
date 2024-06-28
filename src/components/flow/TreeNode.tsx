import { Handle, NodeProps, Position } from 'reactflow';
import { TreeViewData } from '../../data/nodes-edges';
import { Button } from '@blueprintjs/core';
import { FlexColumn } from '../base/Flex';
import { flex1, fullSize } from '../../styles';

export const treeNodeWidth = 172;
export const treeNodeHeight = 72;

export interface TreeNodeProps extends NodeProps<TreeViewData> {}

export const TreeNode = (props: TreeNodeProps) => {
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
        <div css={flex1}>{data.label}</div>
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
};
