import { listaTareas } from '../index';
import { Todo } from './classes/todo.class';

const htmlTodo = document.querySelector('.todo-list');
const nuevoInput = document.querySelector('.new-todo');
const btnCompletado = document.querySelector('.clear-completed');
const btnFiltros = document.querySelector('.filters');
const btnActivo = document.querySelectorAll('.filtro');
const tareasPendientes = document.querySelector('.todo-count');

export const crearTodoHTML = (todo) => {
  const newTareaHtml = `<li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li>`;

  const div = document.createElement('div');
  div.innerHTML = newTareaHtml;
  htmlTodo.append(div.firstElementChild);
  tareasPendientes.innerHTML =
    listaTareas.getPendientes === 1
      ? `${listaTareas.getPendientes} Pendiente`
      : `${listaTareas.getPendientes} Pendientes`;
  return div.firstElementChild;
};

nuevoInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && nuevoInput.value.length > 0) {
    const nuevaTarea = new Todo(nuevoInput.value);
    listaTareas.registrarTarea(nuevaTarea);
    crearTodoHTML(nuevaTarea);
    nuevoInput.value = '';
  }
});

htmlTodo.addEventListener('click', (e) => {
  const nombreElemento = e.target.localName;
  const tareaElemento = e.target.parentElement.parentElement;
  const idElemento = tareaElemento.getAttribute('data-id');

  if (nombreElemento.includes('input')) {
    listaTareas.completarTarea(idElemento);
    tareaElemento.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    listaTareas.borrarTarea(idElemento);
    htmlTodo.removeChild(tareaElemento);
  }
  tareasPendientes.innerHTML =
    listaTareas.getPendientes === 1
      ? `${listaTareas.getPendientes} Pendiente`
      : `${listaTareas.getPendientes} Pendientes`;
});

btnCompletado.addEventListener('click', () => {
  listaTareas.borrarTareasCompletadas();
  for (let index = htmlTodo.children.length - 1; index >= 0; index--) {
    const elemento = htmlTodo.children[index];
    if (elemento.classList.contains('completed')) {
      htmlTodo.removeChild(elemento);
    }
  }
});

btnFiltros.addEventListener('click', (e) => {
  const nombreFiltro = e.target.text;

  if (!nombreFiltro) {
    return;
  }

  btnActivo.forEach((elem) => {
    elem.classList.remove('selected');
  });
  e.target.classList.add('selected');

  for (const elemento of htmlTodo.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch (nombreFiltro) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }
});
