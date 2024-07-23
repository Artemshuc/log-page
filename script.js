const newTasksContainer = document.querySelector(".new-tasks");
const inProgressTasksContainer = document.querySelector(".in-progress-tasks");
const completedTasksContainer = document.querySelector(".completed-tasks");
const addTaskButton = document.querySelector(".add-task-button");

addTaskButton.addEventListener("click", () => {
  const newTask = document.createElement("div");
  newTask.className = "task";
  newTask.innerHTML = `
        <textarea placeholder="Введите текст" class="place"/></textarea>
        <div class="task-buttons">
            <span class="material-symbols-outlined done-button">check_small</span>
        </div>
    `;
  newTasksContainer.appendChild(newTask);

  const setTaskHandlersColumn1 = () => {
    const doneButton = newTask.querySelector(".done-button");
    doneButton.addEventListener("click", () => {
      inProgressTasksContainer.appendChild(newTask);
      newTask.querySelector(".task-buttons").innerHTML = "";

      const progressButtons = document.createElement("div");
      progressButtons.innerHTML = `
                <span class="material-symbols-outlined done-button">check_small</span>
                <span class="material-symbols-outlined back-button">remove</span>
            `;
      newTask.querySelector(".task-buttons").appendChild(progressButtons);

      const backButton = progressButtons.querySelector(".back-button");
      backButton.addEventListener("click", () => {
        newTasksContainer.appendChild(newTask); // Перемещаем назад в столбец 1
        progressButtons.remove(); // Удаляем обе кнопки
        newTask.querySelector(".task-buttons").innerHTML = `
                    <span class="material-symbols-outlined done-button">add</span>
                `;
        setTaskHandlersColumn1(); // Повторно добавляем обработчики для столбца 1
      });

      const doneButton2 = progressButtons.querySelector(".done-button");
      doneButton2.addEventListener("click", () => {
        completedTasksContainer.appendChild(newTask); // Перемещаем в "Выполненная"
        newTask.querySelector(".task-buttons").innerHTML = ""; // Очищаем кнопки

        const completedButtons = document.createElement("div");
        completedButtons.innerHTML = `
                    <span class="material-symbols-outlined back-button">delete_forever</span>
                `;
        newTask.querySelector(".task-buttons").appendChild(completedButtons);

        const finalBackButton = completedButtons.querySelector(".back-button");
        finalBackButton.addEventListener("click", () => {
          newTask.remove(); // Удаляем задачу
        });
      });
    });
  };

  setTaskHandlersColumn1(); // Устанавливаем обработчики для столбца 1 при создании задачи
});
