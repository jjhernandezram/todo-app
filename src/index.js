import './styles.css';
import { TodoList } from './js/classes/todo-list.class';
import { crearTodoHTML } from './js/componentes';

export const listaTareas = new TodoList();

listaTareas.todos.forEach((todo) => crearTodoHTML(todo));
