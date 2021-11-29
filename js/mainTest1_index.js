
var spriteRun1Img = new Image();
spriteRun1Img.src = "./img/run1.png";
var spriteRun2Img = new Image();
spriteRun2Img.src = "./img/run2.png";
var spriteStandImg = new Image();
spriteStandImg.src = "./img/standBasic.png";
var spriteBottomPunchImg = new Image();
spriteBottomPunchImg.src = "./img/punchBasic.png"
var spriteMidPunchImg = new Image();
spriteMidPunchImg.src = "./img/punchJump.png"
var spriteTopPunchImg = new Image();
spriteTopPunchImg.src = "./img/punchFly.png"
var spriteChimpanzee = new Image();
spriteChimpanzee.src = "./img/enemy_1.png";
var spriteBonusChimpanz = new Image();
spriteBonusChimpanz.src = "./img/enemy_2.png";
var spriteCloseBtn = new Image();
spriteCloseBtn.src = "./img/closeBtn.png";

const chimpenz_id_bonus = 601;
const chimpenz_id_basic = 602;

class Chimpanzee {
    //침팬지를 생성하는 클래스
    constructor(x, y, spriteImg, id){
        this.x = x;
        this.y = y;
        this.width = spriteImg.width;
        this.height = spriteImg.height;
        this.spriteImg = spriteImg;
        this.alive = true;
        this.id = id;
    }
    draw(){
        ctx.drawImage(this.spriteImg, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
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
canvas.width = 1900/4.8;
canvas.height = 1080/4.8;
//게임 시작 버튼 눌렀을때(게임 시작 부분)
gameStartBtn.onclick= function(){
    mainBtnClickEvent();
    setTimeout(()=>mainScreen.remove(), 1800); //버튼들이 사라지는데 2초정도 걸림. 그래서 조금 더 빨리 메인의 버튼들을 모두 없앰.(mainScreen은 메인화면)
    //기다린 후 canvas를 붙여주고 게임을 실행한다.
    setTimeout(()=> {
        body.prepend(canvas);
        gameInit(); //게임에 필요한 것들을 초기화.
        gameRefresh(); //update, render를 반복적으로 실행.
    }, 500);
}
//게임에서 필요한 것들을 선언함.
var lastTime  = Date.now();
var wakgood; //플레이어.
var closeBtn;
var punch = false;
var lastime = Date.now();
var chimpanzees = [];
var score = 0;

//키 입력 관련 선언
var keyW = false;
var keyS = false;
var keySpace = false;

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
                case punchState: 
                    switch(this.punchType){
                        case bottomPunch: ctx.drawImage(spriteBottomPunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                        case midPunch: ctx.drawImage(spriteMidPunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
                        case topPunch: ctx.drawImage(spriteTopPunchImg, 0, 0, this.width, this.height, this.x-30, this.y, this.width, this.height); break;
                    }
                break;
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

            

            console.log("score:"+score);
        },
    }

    closeBtn = {
        x : 377,
        y : 7,
        startGame: true,
        width : spriteCloseBtn.width,
        height : spriteCloseBtn.height,
        closeType: null,
        draw(){
            ctx.drawImage(spriteCloseBtn, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }

    chimpanzeeRandLocProduce(80); //침팬지 랜덤 생성 함수
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
var sequencePnchT = -1; //연속 펀치 가능 시간
var punchSequence = false; //연속 펀치 가능
function gameUpdate(dt){
    keyProcess();
    sinceLastTime += dt;
    if(sinceLastTime > 100){
        //0.2초 정도 지날때마다 wakgood update();
        wakgood.update();
        sinceLastTime = 0;
        
        //플레이어가 자동으로 움직여지는 부분이다.
        if(chimpanzees[0]!=null){
            if(wakgood.x+20 >= chimpanzees[0].x){ //침팬지 앞에서 멈추기.
                wakgood.state = standBasicState;
                wakgood.startGame = false;
            }
            else{
                if(wakgood.state == standBasicState){ wakgood.state = run1State;}
                wakgood.x+=5; //침팬지 앞이 아니라면 이동. 그리고 시작할때만
            }
        }

        //화면 전환(침팬지 모두 없앰. )
        if(chimpanzees[0]==null){ 
            chimpanzeeRandLocProduce(40);
            wakgood.x = 0;
            wakgood.y = 130;
            wakgood.startGame = true;
            wakgood.state = run1State;
            wakgood.punch = false;
        }

    }

    //침팬지 공격 관련
    if(wakgood.punch == true){
        chimpenzPunch(dt);
    }else{
        // if(chimpanzees[0].id == chimpenz_id_bonus && !punchSequence){ //보너스 침팬지이고 연속펀치 아직 불가능
        //         sequencePnchT+=dt; //연속 펀치 가능 시간 재기
        // }else if(chimpanzees[0].id == chimpenz_id_bonus && punchSequence){

        // }
        if(chimpanzees[0]!=null){ //한 개 이상의 침팬지가 있어야함
            if(!chimpanzees[0].alive){
                chimpanzees.splice(0, 1); //맨 앞의 한개의 침팬지 삭제'
            }
            // if(wakgood.x){
            //     if(chimpanzees[0].id == chimpenz_id_bonus && !punchSequence){ //보너스 침팬지이고 연속펀치 아직 불가능
            //         sequencePnchT+=dt; //연속 펀치 가능 시간 재기
    
            //     }else if(chimpanzees[0].id == chimpenz_id_basic){ //기본 침팬지면 바로 삭제
            //         chimpanzees.splice(0, 1); //맨 앞의 한개의 침팬지 삭제'
            //     }
            //}
        }
        
    }
}

function gameRender(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //모든 스프라이드(이미지) 그려주기.
    //플레이어(왁굳) 그려주기
    wakgood.draw();
    chimpanzees.forEach(element =>element.draw()); //존재하는 침팬지 모두 그리기
    closeBtn.draw();
    //침팬지들 그려주기.
    // for(let chimpanzee of chimpanzees){
    //     chimpanzee.draw();
    // }
}

function chimpenzPunch(dt){
    sequencePnchT+=dt;
    //펀치 모션을 위한 함수
    if(collisionCheck(wakgood.x-5, wakgood.y, chimpanzees[0].x, chimpanzees[0].y)){
        if(chimpanzees[0].id == chimpenz_id_basic){ chimpanzees[0].alive = false;}
        if(chimpanzees[0].id == chimpenz_id_bonus && punchSequence){ chimpanzees[0].alive = false; punchSequence = false; sequencePnchT= -1;}
        wakgood.state=punchState;
    }else if(wakgood.state != punchState){ //앞에 침팬지가 없다.
        wakgood.x+=8;
    }

    //펀치가 마무리되는 부분(끝나는부분)
  //if(wakgood.state==punchState){
        if(punchTime >= 200){ //0.2초
            punchEnd();
        }else{
            punchTime+=dt;
        }
  //}
}

function punchEnd(){
    //wakgood.x+=5;
    wakgood.state = standBasicState;
    wakgood.punch = false;
    punchTime = 0;
}


//보너스 침팬지는 침팬지가 30번 나오는동안 한 번 나온다.
var bnsChimpzPrdcIdx = Math.floor(Math.random()*50)+1; // 1~ 50 중 하나
var chimxPrdcIdx = 0;


//침팬지들을 생성하는 함수
function chimpanzeeRandLocProduce(startX){
    //침팬지를 한 화면에 x좌표부터 채워 넣음
    var y;
    //랜덤한 y좌표의 침팬지들을 생성한다.(화면이 전환될때 사용)
    for(var x = startX; x <= canvas.width-30; x+=30){ //30은 원숭이 간격. 화면의 끝까지 침팬지 생성ㄴ
        //150(맨 아래), 90(중간), 30(맨 위) 중에서 랜덤으로 나온다.(2은 150, 0는 90, 0은 30)
        y = 30 + (Math.floor(Math.random()*3)*60); //0~2까지의 난수 발생시키고 60을 곱해준 수를 30에  더한다.
        chimxPrdcIdx++;
        if(chimxPrdcIdx != bnsChimpzPrdcIdx){ //일반 침팬지 생성
            chimpanzees.push(new Chimpanzee(x, y, spriteBonusChimpanz, chimpenz_id_bonus));//랜덤한 장소에 생성
        }else{
            //보너스 침팬지 생성
            chimpanzees.push(new Chimpanzee(x, y, spriteBonusChimpanz, chimpenz_id_bonus));
        }
        if(chimxPrdcIdx == 50){
            //침팬지가 50번 나왔으면 다시 랜덤한 보너스 침팬지 idx생성
            bnsChimpzPrdcIdx = Math.floor(Math.random()*50)+1;
            chimxPrdcIdx = 0;
        }
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

//캐릭터와 적의 충돌 여부 확인
function collisionCheck(x, y, enemyX, enemyY){
    if(enemyX-20 <= x && enemyX+40 >= x && y >= enemyY-20 && y <= enemyY+20 && y >= enemyY-20){
        return true;
    }
    else { false; }
}

var keyDoubleSpc = false;
//키 입력 처리
function keyProcess(){

    //펀치 3가지
    if(keyW){
        if(wakgood.y - 60 >= 10) wakgood.y-=60;
        keyW = false;
    }
    else if(keyS){
        if(wakgood.y + 60 <= 130) wakgood.y+=60;
        keyS = false;
    }
    if(keySpace){
        if(collisionCheck(wakgood.x, wakgood.y, chimpanzees[0].x, chimpanzees[0].y) && !wakgood.punch){
            wakgood.punch = true; wakgood.punchType = topPunch;
        }
        keySpace = false;
    }
    if(keyDoubleSpc){
        if(collisionCheck(wakgood.x, wakgood.y, chimpanzees[0].x, chimpanzees[0].y)){
            wakgood.punch = true; wakgood.punchType = topPunch;
        }
        punchSequence = true;
        keyDoubleSpc = false;
    }

}
var preKeyCode = null;
document.addEventListener('keydown', function(e){
    if(e.code === 'KeyW'){  keyW = true; }
    if(e.code === 'KeyS'){ keyS = true; }
    if(e.code === 'Space'&& punchKeyInputPssible()){ keySpace = true; }
    if(e.code === 'Space'&& sequencePnchT <= 300 && sequencePnchT != -1 && preKeyCode == 'Space'){ keyDoubleSpc = true; } //연속 펀치 가능할때
    preKeyCode = e.code;
})


//펀치 키를 누를 수 있는지의 여부를 리턴함
function punchKeyInputPssible(){
    //펀치 키가 모두 안눌려있고 왁굳(플레이어)가 펀치중이 아닐때 펀치 키의 처리를 하는 것이 가능함
    if(!keySpace && !wakgood.punch && !keyDoubleSpc){
        return true;
    }
    else return false;
}