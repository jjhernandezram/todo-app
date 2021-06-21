import { Todo } from './todo.class';

export class TodoList {
  constructor() {
    this.cargarLocalStorage();
  }

  get getPendientes() {
    const pendientes = this.todos.filter((todo) => !todo.completado);
    return pendientes.length;
  }

  registrarTarea(todo) {
    this.todos.push(todo);
    this.guardarLocalStorage();
  }

  borrarTarea(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.guardarLocalStorage();
  }

  completarTarea(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completado = !todo.completado;
        break;
      }
    }
  }

  borrarTareasCompletadas() {
    this.todos = this.todos.filter((todo) => !todo.completado);
    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos));
  }

  cargarLocalStorage() {
    this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    this.todos = this.todos.map((obj) => Todo.fromJason(obj));
  }

  /* tareasPendientes() {
    const pendientes = this.todos.filter((todo) => !todo.completado);
    return pendientes.length;
  } */
}
