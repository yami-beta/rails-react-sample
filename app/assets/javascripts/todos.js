// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function () {
  const toggleComplete = event => {
    const todoEl = event.currentTarget.parentNode;

    const todoId = todoEl.getAttribute("data-todo-id");
    const completed = todoEl.classList.contains("todo--completed");

    fetch(`/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        complete: !completed
      })
    }).then(res => {
      if (res.ok) {
        window.location.reload();
      }
    }).catch(error => {
      console.error(error);
    })
  };

  document.addEventListener("DOMContentLoaded", () => {
    const todoElements = document.querySelectorAll(".todo");
    todoElements.forEach(todoEl => {
      const contentEl = todoEl.querySelector(".todo__content");
      contentEl.removeEventListener("click", toggleComplete);
      contentEl.addEventListener("click", toggleComplete);
    });
  });
})();
