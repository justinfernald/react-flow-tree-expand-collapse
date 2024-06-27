import { ComponentMeta, ComponentStory } from '@storybook/react';

import TodoList from '../components/todo/TodoList';
import TodoListModel from '../models/TodoListModel';

export default {
  title: 'Components/TodoList',
  component: TodoList,
  decorators: [
    (Story) => (
      <div style={{ width: 'min(700px, 90%)', padding: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TodoList>;

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  store: new TodoListModel(),
};
