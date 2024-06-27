export interface FlexProps {
  /**
   * The children elements to be rendered inside the Flex component.
   */
  children: React.ReactNode;

  /**
   * The alignment of the flex items along the main axis.
   */
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  /**
   * The alignment of the flex items along the cross axis.
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';

  /**
   * The direction in which flex items are laid out in the flex container.
   */
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  /**
   * Whether flex items should wrap or not if they exceed the container's width.
   */
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';

  /**
   * The gap between flex items.
   */
  gap?: number | string;
  className?: string;
  divProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'css' | 'className'>;
}

/**
 * Renders a flexible container component.
 *
 * @param props - The props for the Flex component.
 * @returns The rendered Flex component.
 */
export function Flex(props: FlexProps) {
  const {
    children,
    justifyContent,
    alignItems,
    flexDirection,
    flexWrap,
    gap,
    className,
    divProps,
  } = props;

  return (
    <div
      className={className}
      css={[
        {
          display: 'flex',
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
          gap,
        },
      ]}
      {...divProps}
    >
      {children}
    </div>
  );
}

/**
 * Renders a flex container with a row direction.
 * @param props - The props for the FlexRow component.
 * @returns The rendered FlexRow component.
 */
export function FlexRow(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection="row" />;
}

/**
 * Renders a flex container with a column direction.
 * @param props - The props for the FlexColumn component.
 * @returns The rendered FlexColumn component.
 */
export function FlexColumn(props: Omit<FlexProps, 'flexDirection'>) {
  return <Flex {...props} flexDirection="column" />;
}
