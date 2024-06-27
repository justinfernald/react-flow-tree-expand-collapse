import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Property } from 'csstype';

import { Card, CardProps } from '../components/base';

const CardTemplate = ({
  color,
  css,
  ...args
}: CardProps & {
  color: Property.BackgroundColor | string[] | Property.BackgroundColor[] | undefined;
}) => <Card {...args} css={[css, { backgroundColor: color }]} />;

export default {
  title: 'Components/Card',
  component: CardTemplate,
  argTypes: {
    color: { control: 'color' },
  },
} as ComponentMeta<typeof CardTemplate>;

const Template: ComponentStory<typeof CardTemplate> = (args) => (
  <CardTemplate {...args}>
    <h1>I am a card</h1>
    <p>This is holding card content.</p>
  </CardTemplate>
);

export const Custom = Template.bind({});
Custom.args = {
  css: {
    width: 300,
    height: 300,
    border: '1px solid black',
  },
  color: 'yellow',
};

export const Standard = Template.bind({});
Standard.args = {};
