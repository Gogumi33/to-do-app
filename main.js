let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 할일들을 저장할 배열.

addButton.addEventListener("click", addTask);

function addTask() { // taskList[] 배열에 사용자가 추가한 task저장하는 함수.
    if( taskInput.value == '' ){
        alert('아무것도 입력되지 않았습니다! 할 일을 작성 후 추가버튼을 눌러 주세요.');
        return; // 2. 아무것도 입력 x시 목록에 추가되지 않는 로직 추가.
    }

    //console.log("clicked"); // 이런 체크 자주해줘라!
    let task = { // 객체 - 필요한 정보들 하나로 묶음.
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false // check시, 이 값이 true.
    }

    taskList.push(task);
    console.log(taskList);
    render();
    taskInput.value = ''; // 1. + 버튼 누를 시 input창 지워지게하는 로직 추가.
}

function render() { // taskList목록들 화면에 출력해주는 함수.
    let resultHTML = ''
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML +=`<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${taskList[i].id}')" class="noLine"><img src="images/reload.png" class="imgSize"></button>
                <button onClick="deleteTask('${taskList[i].id}')" class="noLine"><img src="images/delete.png" class="imgSize"></button>
            </div>
        </div>`
        } else{ // 버튼 옆에 onClick으로 클릭이벤트 리스너 바로 추가.
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${taskList[i].id}')" class="noLine"><img src="images/check.png" class="imgSize"></button>
                <button onClick="deleteTask('${taskList[i].id}')" class="noLine"><img src="images/delete.png" class="imgSize"></button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) { // 체크 누를 시 밑줄가도록 하는 함수.
    console.log("id:", id); // test.
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // !taskList[i].isComplete 로 ON/OFF 스위치 기능!!!
            taskList[i].isComplete = !taskList[i].isComplete; // 밑줄가도록.
            break; // 이미 찾으면 더 이상 찾을 필요가 없도록.
        }
    }
    render(); // 이 함수 반드시 불러줘야함@@@@@
    console.log(taskList);
}

function deleteTask(id) {
    // console.log("삭제하기", id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i, 1); // i번째에 있는 것만 삭제하겠다.
            break;
        }
    }
    render();
}


function randomIDGenerate() { // 랜덤 id 생성기.
    return '_' + Math.random().toString(36).substring(2, 9);
}