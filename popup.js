document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date-input");
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    // 로컬 스토리지에서 선택한 날짜의 할 일 목록 불러오기
    const loadTasks = () => {
        const selectedDate = dateInput.value;
        const tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
        renderTasks(tasks);
    };

    // 할 일 목록 화면에 렌더링
    const renderTasks = (tasks) => {
        todoList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = task;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "x"; // 버튼 텍스트를 "x"로 변경
            deleteBtn.className = "delete-btn"; // 클래스 추가 (스타일링 용도)
            deleteBtn.onclick = () => {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks(tasks);
            };

            listItem.appendChild(deleteBtn);
            todoList.appendChild(listItem);
        });
    };

    // 로컬 스토리지에 할 일 목록 저장
    const saveTasks = (tasks) => {
        const selectedDate = dateInput.value;
        localStorage.setItem(selectedDate, JSON.stringify(tasks));
    };

    // 새로운 할 일 추가
    addBtn.addEventListener("click", () => {
        const task = todoInput.value.trim();
        if (!task || !dateInput.value) return;

        const tasks = JSON.parse(localStorage.getItem(dateInput.value)) || [];
        tasks.push(task);
        saveTasks(tasks);
        renderTasks(tasks);
        todoInput.value = "";
    });

    // 날짜 변경 시 해당 날짜의 할 일 목록 불러오기
    dateInput.addEventListener("change", loadTasks);

    // 페이지 로드 시 오늘 날짜로 설정하고 할 일 목록 불러오기
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    loadTasks();
});
