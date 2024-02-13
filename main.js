let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 할일들을 저장할 배열.

addButton.addEventListener("click", addTask);

function addTask() {
    //console.log("clicked"); // 이런 체크 자주해줘라!
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() { // taskList목록들 화면에 출력해주는 함수.
    let resultHTML = ''
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}