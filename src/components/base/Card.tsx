import { Interpolation, Theme } from '@emotion/react';

import { borderRadius, colors, dropShadow, padding } from '../../styles';

export interface CardProps {
  children: React.ReactNode;
  css: Interpolation<Theme>;
}

export function Card(
  props: CardProps &
    React.ClassAttributes<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement>,
) {
  const { children, css, ...rest } = props;

  return (
    <div
      css={[
        {
          backgroundColor: colors.background,
          color: colors.text,
        },
        borderRadius('md'),
        padding('lg'),
        dropShadow(2),
        css,
      ]}
      {...rest}
    >
      {children}
    </div>
  );
}
