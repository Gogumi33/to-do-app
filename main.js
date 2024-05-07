let mode = 'all'; // 전역변수.
let filterList = []; // 전역변수2.
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []; // 할일들을 저장할 배열.
// querySelectorAll은 ""조건에 맞는 애들 싹 다 가져옴.
let tabs = document.querySelectorAll(".task-tabs div"); // 쿼리셀렉터는 "."으로 시작.
for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
    // 위 코드랑 비교.. 밑에꺼는 람다식 버젼인듯.
    // 클릭이벤트가 발생할 때 마다 hori-() 함수가 실행될 것.
    tabs[i].addEventListener("click", function(e){horizontalIndicator(e)});
}
// tabs.forEach(menu=>menu.addEventListener("click", (e)=>horizontalIndicator(e))) // 누나영상버젼.
let underLine = document.getElementById("under-line");

let skin1 = document.getElementById("skin1"); ///// 그라데이션
let skin2 = document.getElementById("skin2"); ///// 화이트
let skin3 = document.getElementById("skin3"); ///// 물결



addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) { // 키보드 입력받는건 'keydown'이벤트!
    if(event.keyCode == 13) { // 엔터 = keyCode:13
        addTask(event);
    }
})
skin1.addEventListener("click", changeSkin1); ///// 그라데이션
skin2.addEventListener("click", changeSkin2); ///// 화이트
skin3.addEventListener("click", changeSkin3); ///// 물결



function addTask() { // taskList[] 배열에 사용자가 추가한 task저장하는 함수.
    if(taskInput.value == ''){
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
    taskInput.value = ''; // 1. + 버튼 누를 시 input창 지워지게하는 로직 추가.
    render();
}

// mode를 전역변수로 바꿔 줌으로써 이제 이 render()함수가 사용할 수 있게 됨.
function render() { // taskList목록들 화면에 출력해주는 함수.
    let list = [];
    if(mode === "all"){
        list = taskList;
    } else if(mode === "ongoing"){
        list = filterList; // filterList도 전역변수 처리 해줘야함.
    } else if(mode === "done"){
        list = filterList;
    }
    
    
    let resultHTML = "";
    for(let i=0; i<list.length; i++){ // taskList -> 싹 다 list로 변경.
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')" class="noLine"><img src="images/reload.png" class="imgSize"></button>
                <button onClick="deleteTask('${list[i].id}')" class="noLine"><img src="images/delete.png" class="imgSize"></button>
            </div>
        </div>`
        } else{ // 버튼 옆에 onClick으로 클릭이벤트 리스너 바로 추가.
            resultHTML += `<div class="task">
            <div class="task-ongoing">${list[i].taskContent}</div>
            <div>
                <button onClick="toggleComplete('${list[i].id}')" class="noLine"><img src="images/check.png" class="imgSize"></button>
                <button onClick="deleteTask('${list[i].id}')" class="noLine"><img src="images/delete.png" class="imgSize"></button>
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
    filter(); // 반드시 무언가 바뀌면 UI도 바로 바뀌도록 로직 짤 것!!!
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
    filter();
}

function filter(event) { // event -> 내가 누구를 클릭했는가에 대한 정보.
    // console.log(event.target.id);
    if(event){
        mode = event.target.id; // @@@@@ 전역변수!
    }
    // 아래처럼 filterList를 매번 초기화를 해 줘야 번갈아서 탭을 누를 때 마다 중복되지 않는다★
    filterList = []; // @@ 얘도 전역! 필터를 통과한 애들만 모은 리스트.

    if(mode === "ongoing"){ // 진행중 아이템
        // task.isComplete=false 인 애들이 진행중인 애들
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        // console.log("진행중", filterList);
    } else if(mode === "done"){ // 끝난 아이템
        // task.isComplete=true 인 애들이 끝난애들
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerate() { // 랜덤 id 생성기.
    return '_' + Math.random().toString(36).substring(2, 9);
}

function horizontalIndicator(e) { // 탭에 분홍색 밑줄 생성기.
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 3 + "px";
}


// 배경변경 함수들
function changeSkin1() {
    document.body.style.backgroundImage = "url(images/gradation.jpeg)"; // 그라데이션
}
function changeSkin2() {
    document.body.style.backgroundImage = "url(images/white.jpeg)"; // 화이트
}
function changeSkin3() {
    document.body.style.backgroundImage = "url(images/third.jpeg)"; // 물결
}

// git clone and commit test