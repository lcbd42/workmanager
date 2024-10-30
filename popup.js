document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("title");
    const dateInput = document.getElementById("date-input");
    const addBtn = document.getElementById("add-btn");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // 날짜 선택 시 제목 업데이트
    dateInput.addEventListener("input", function () {
        const selectedDate = dateInput.value;
        if (selectedDate) {
            title.textContent = `근무자용 인수인계 - ${selectedDate}`;
        } else {
            title.textContent = "근무자용 인수인계"; // 날짜가 선택되지 않았을 때 기본 제목
        }
    });

    addBtn.addEventListener("click", addTodo);

    function addTodo() {
        const task = todoInput.value.trim();
        if (task === "") return;

        const li = document.createElement("li");
        li.textContent = task;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => li.remove();

        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        todoInput.value = "";
    }
});
