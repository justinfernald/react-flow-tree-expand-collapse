export interface SpacingProps {
  mainAxis?: number | string;
  crossAxis?: number | string;
  direction?: 'row' | 'column';
}

/**
 * Renders a spacing component with customizable dimensions.
 * @param {SpacingProps} props - The props for the spacing component.
 * @returns {JSX.Element} The rendered spacing component.
 */
export function Spacing(props: SpacingProps) {
  const { mainAxis = 15, crossAxis = 0, direction = 'column' } = props;

  return (
    <div
      css={{
        width: direction === 'column' ? crossAxis : mainAxis,
        height: direction === 'column' ? mainAxis : crossAxis,
      }}
    />
  );
}
