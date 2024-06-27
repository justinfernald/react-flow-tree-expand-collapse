import { observer } from 'mobx-react-lite';

import TodoModel from '../../models/TodoModel';
import { flexBetween, margin } from '../../styles';

export interface TodoProps {
  todo: TodoModel;
  onDelete: () => void;
}

export const Todo = observer<TodoProps>(({ todo, onDelete }) => (
  <li css={[{ backgroundColor: '#eee' }, margin('xs'), flexBetween]}>
    <span>
      <input
        type="checkbox"
        checked={todo.finished}
        onChange={() => (todo.finished = !todo.finished)}
      />
      <span> {todo.title}</span>
    </span>
    <button onClick={onDelete}>X</button>
  </li>
));
