import './App.css';

import { Card } from './components/base';
import { LayoutFlow } from './components/flow/DagreTree';
import TodoList from './components/todo/TodoList';
import TodoListModel from './models/TodoListModel';
import { absolute, flexCenter, fullSize, padding } from './styles';

const todoListStore = new TodoListModel();

function App() {
  return (
    <div css={[absolute(), fullSize, flexCenter]}>
      <LayoutFlow />
    </div>
  );
}

export default App;
