
var spriteRun1Img = new Image();
spriteRun1Img.src = "./img/run1.png";
var spriteRun2Img = new Image();
spriteRun2Img.src = "./img/run2.png";
var spriteStandImg = new Image();
spriteStandImg.src = "./img/standBasic.png";
var spritePunchImg = new Image();
spritePunchImg.src = "./img/punchBasic.png"
var spriteChimpanzee = new Image();
spriteChimpanzee.src = "./img/enemy_1.png";

class Chimpanzee {
    //침팬지를 생성하는 클래스
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = spriteChimpanzee.width;
        this.height = spriteChimpanzee.height;
    }
    draw(){
        ctx.drawImage(spriteChimpanzee, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

//html의 요소들을 가져와서 변수에 넣어둠 
let body = document.querySelector("body"); //바디
let mainScreen = document.querySelector(".mainScreen"); //
let gameStartBtn = document.querySelector(".gameStartBtn");
let gameRankBtn = document.querySelector(".gameRankBtn");
let gameRoleBtn = document.querySelector(".gameRoleBtn");
let gameTitle = document.querySelector(".gameTitle");
let canvas = document.createElement("canvas");
canvas.id = "gameCanvas";
canvas.width = 1900/5;
canvas.height = 1080/5;
//게임 시작 버튼 눌렀을때
gameStartBtn.onclick= function(){
    mainBtnClickEvent();
    setTimeout(()=>mainScreen.remove(), 1800); //버튼들이 사라지는데 2초정도 걸림. 그래서 조금 더 빨리 메인의 버튼들을 모두 없앰.(mainScreen은 메인화면)
    //기다린 후 canvas를 붙여주고 게임을 실행한다.
    setTimeout(()=> {
        body.prepend(canvas);
        gameInit();
        gameRefresh(); //update, render 
    }, 500);
}
//게임에서 필요한 것들을 선언함.
var lastTime  = Date.now();
var wakgood; //d
var punch = false;
var lastime = Date.now();
var chimpanzees = [];

//애니메이션
var ctx = canvas.getContext('2d');


const run1State = 3000;
const run2State = 3001;
const standBasicState = 3002;
const punchState = 3003;

const bottomPunch = 20;
const midPunch = 40;
const topPunch = 60;

function gameInit(){
    sinceLastTime = 0; //시간 체크용
    //플레이어 세팅, 침팬지 세팅, 음악 등등 게임 처음 부분
    wakgood = {
        x : 0,
        y : 130,
        startGame: true,
        width : spriteRun1Img.width,
        height : spriteRun1Img.height,
        state : run1State,
        punch : false,
        punchType: null,
        draw(){
            switch(this.state){
                case run1State: ctx.drawImage(spriteRun1Img, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case run2State: ctx.drawImage(spriteRun2Img,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case standBasicState: ctx.drawImage(spriteStandImg,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                case punchState: ctx.drawImage(spritePunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
            }
            // img : 이미지 객체
            // - ix : 이미지 내에 있는 x 좌표
            // - iy : 이미지 내에 있는 y 좌표
            // - iw : 이미지 내에 있는 (x,y)를 중심으로 그려질 넓이
            // - ih: 이미지 내에 있는 (x,y)를 중심으로 그려질 높이
            // - cx : 캔버스의 x 좌표
            // - cy : 캔버스의 y 좌표
            // - cw : 캔버스 위에 그려질 이미지의 넓이
            // - ch : 캔버스 위에 그려질 이미지의 높이
            
            // 출처: https://devjhs.tistory.com/577 [키보드와 하루]
        },
        update(){
           

            //달리기부분
            switch(this.state){
                case run1State : this.state = run2State; break;
                case run2State : this.state = run1State; break;
            } 
        },
    }
    // chimpanzees.push(new Chimpanzee(80, 150));
    // // chimpanzees.push(new Chimpanzee(80, 90));
    // // chimpanzees.push(new Chimpanzee(80, 30));
    // chimpanzees.push(new Chimpanzee(130, 150));
    // // chimpanzees.push(new Chimpanzee(130, 90));
    // // chimpanzees.push(new Chimpanzee(130, 30));
    chimpanzeeRandLocProduce(80);
}

function gameRefresh(){
    var now = Date.now(); //현재 시간 체크
    var dt = (now-lastTime); //지난 시간
    gameUpdate(dt); //업데이트
    gameRender(); //그림 그리기
    lastTime = now;
    requestAnimationFrame(function(){
        //계속 실행하는 재귀함수.
        gameRefresh();
    })
}
var punchTime = 0;
function gameUpdate(dt){
    sinceLastTime += dt;
    if(sinceLastTime > 100){
        //0.2초 정도 지날때마다 wakgood update();
        wakgood.update();
        sinceLastTime = 0;
        if(chimpanzees[0]!=null){
            if(chimpanzees[0].x <= wakgood.x+20){ //침팬지 앞에서 멈추기.
                wakgood.state = standBasicState;
                wakgood.startGame = false;
            }
            else if(wakgood.startGame){
                wakgood.x+=3; //침팬지 앞이 아니라면 이동. 그리고 시작할때만
            }
        }

        if(chimpanzees[0]==null){ //침팬지 모두 없앰. 화면 전환
            chimpanzeeRandLocProduce(40);
            wakgood.x = 0;
            wakgood.y = 130;
            wakgood.startGame = true;
            wakgood.state = run1State;
        }

    }

    if(wakgood.punch == true){
        if(chimpanzees[0]!=null){ //한 개 이상의 침팬지가 있어야함
            if(wakgood.x >= chimpanzees[0].x-5 && wakgood.y == chimpanzees[0].y-20){
                    chimpanzees.splice(0, 1); //맨 앞의 한개의 값 삭제'
                    wakgood.state = punchState;
            }else if(wakgood.state != punchState){
                wakgood.x+=5;
            }
        }
        if(punchTime >= 200){ //0.2초
            wakgood.x+=5;
            wakgood.state = standBasicState;
            wakgood.punch = false;
            punchTime = 0;
        }else{
            punchTime+=dt;
        }
    }
    // chimpanzee2.draw();
    // chimpanzee3.draw();
}

function gameRender(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //모든 스프라이드(이미지) 그려주기.
    //플레이어(왁굳) 그려주기
    wakgood.draw();
    chimpanzees.forEach(element =>element.draw()); //존재하는 침팬지 모두 그리기
    //침팬지들 그려주기.
    // for(let chimpanzee of chimpanzees){
    //     chimpanzee.draw();
    // }
}

function chimpanzeeRandLocProduce(startX){
    var y, rand;
    //랜덤한 y좌표의 침팬지들을 생성한다.(화면이 전환될때 사용)
    for(var x = startX; x <= canvas.width-60; x+=20){ //30은 원숭이 간격. 화면의 끝까지 침팬지 생성ㄴ
        //150(맨 아래), 90(중간), 30(맨 위) 중에서 랜덤으로 나온다.(2은 150, 0는 90, 0은 30)
        y = 30 + (Math.floor(Math.random()*3)*60); //0~2까지의 난수 발생시키고 60을 곱해준 수를 30에  더한다.
        chimpanzees.push(new Chimpanzee(x, y));//랜덤한 장소에 생성
    }
}

//침팬지의 위치는 랜덤이다.
//침팬지는 처음에는

function mainBtnClickEvent(){
    //메인 화면에서 버튼을 클릭시 실행됨
    gameRankBtn.style.animation = 'go-margin-right 2s';
    gameRoleBtn.style.animation = 'go-margin-left 2s';
    gameStartBtn.style.animation = 'go-margin-top 2s';
    gameTitle.style.animation = 'go-padding-top 2s';
}

document.addEventListener('keydown', function(e){

    if(e.code === 'KeyD'){
        wakgood.y = 130;
        if(chimpanzees[0].x <= wakgood.x+20 &&wakgood.y == chimpanzees[0].y-20){
            wakgood.punch = true;
            wakgood.punchType = bottomPunch;
        }
    }
    if(e.code === 'KeyS'){
        wakgood.y = 70;
        if(chimpanzees[0].x <= wakgood.x+20 &&wakgood.y == chimpanzees[0].y-20){
            wakgood.punch = true;
            wakgood.punchType = midPunch;    
        }
    }
    
    if(e.code === 'KeyW'){
        wakgood.y = 10;
        if(chimpanzees[0].x <= wakgood.x+20 &&wakgood.y == chimpanzees[0].y-20){
            wakgood.punch = true;
            wakgood.punchType = topPunch;
        }
    }
})