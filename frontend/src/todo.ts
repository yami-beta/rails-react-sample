const toggleComplete = event => {
  const todoEl = event.currentTarget.parentNode;

  const todoId = todoEl.getAttribute("data-todo-id");
  const completed = todoEl.classList.contains("todo--completed");

  fetch(`/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      complete: !completed
    })
  })
    .then(res => {
      if (res.ok) {
        window.location.reload();
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const bindToggleComplete = () => {
  const todoElements = document.querySelectorAll(".todo");
  todoElements.forEach(todoEl => {
    const contentEl = todoEl.querySelector(".todo__content");
    contentEl.removeEventListener("click", toggleComplete);
    contentEl.addEventListener("click", toggleComplete);
  });
};

const createTodo = event => {
  const todoNewEl = document.getElementById("todo-new");
  const text = (todoNewEl.querySelector(".todo-new__text") as HTMLInputElement)
    .value;

  fetch(`/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      text
    })
  })
    .then(res => {
      if (res.ok) {
        window.location.reload();
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const bindCreateTodo = () => {
  document.querySelectorAll(".todo-new__button").forEach(button => {
    button.removeEventListener("click", createTodo);
    button.addEventListener("click", createTodo);
  });
};

const todoInit = () => {
  document.addEventListener("DOMContentLoaded", () => {
    bindToggleComplete();
    bindCreateTodo();
  });

  document.addEventListener("turbolinks:load", () => {
    bindToggleComplete();
    bindCreateTodo();
  });
};

export { todoInit };
