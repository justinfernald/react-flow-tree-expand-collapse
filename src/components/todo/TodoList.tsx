import { observer, useLocalObservable } from 'mobx-react-lite';

import TodoListModel from '../../models/TodoListModel';
import {
  flexBetween,
  flexColumn,
  flexValue,
  fullSize,
  margin,
  padding,
} from '../../styles';
import { Todo } from './Todo';

export interface TodoListProps {
  store: TodoListModel;
}

export const TodoList = observer<TodoListProps>(({ store }) => {
  const state = useLocalObservable(() => ({ newTodoTitle: '' }));

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    state.newTodoTitle = e.target.value;
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    store.addTodo(state.newTodoTitle.trim());
    state.newTodoTitle = '';
    e.preventDefault();
  };

  return (
    <div css={[fullSize, flexColumn]}>
      <form onSubmit={handleFormSubmit} css={flexBetween}>
        <span>New Todo: </span>
        <div>
          <input type="text" value={state.newTodoTitle} onChange={handleInputChange} />
          <button css={{ marginLeft: 4 }} type="submit">
            Add
          </button>
        </div>
      </form>
      <hr css={margin('sm')} />
      <div css={[flexValue(), flexColumn, flexBetween]}>
        <ul css={padding('md')}>
          {store.todos.map((todo) => (
            <Todo todo={todo} key={todo.id} onDelete={() => store.removeTodo(todo)} />
          ))}
        </ul>
        <div>Tasks left: {store.unfinishedTodoCount}</div>
      </div>
    </div>
  );
});

export default TodoList;
