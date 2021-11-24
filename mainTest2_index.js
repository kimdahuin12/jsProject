class Sprite{
    //이 클래스는 단순히 그림을 그리는 용도로 사용됨
    constructor(options){
        //이미지 속성 저장
        this.context = options.context; 
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.x = options.x;
        this.y = options.y;
    }
    render(){
        //실제로 이미지들을 화면에 그려주는 함수
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Chimpanzee {
    //침팬지 클래스
    constructor(){
        this.x = 80;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.drawImage(침팬지, this.x-15, this.y-15);
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

//게임에서 필요한 것들을 선언함.
var lastTime  = Date.now();
var wakgood; //d


//게임 시작 버튼 눌렀을때
mainScreen.remove() //버튼들이 사라지는데 2초정도 걸림. 그래서 조금 더 빨리 메인의 버튼들을 모두 없앰.(mainScreen은 메인화면)
    //기다린 후 canvas를 붙여주고 게임을 실행한다.
    setTimeout(()=> {
        body.prepend(canvas);
        gameInit();
        gameRefresh();
        //const game = new Game();  
    }, 500);

var spriteRun1Img = new Image();
spriteRun1Img.src = "./img/run1.png";
var spriteRun2Img = new Image();
spriteRun2Img.src = "./img/run2.png";
var spriteStandImg = new Image();
spriteStandImg.src = "./img/standBasic.png";
var spritePunchImg = new Image();
spritePunchImg.src = "./img/punchBasic.png"



//애니메이션
var ctx = canvas.getContext('2d');


function mainBtnClickEvent(){
    //메인 화면에서 버튼을 클릭시 실행됨
    gameRankBtn.style.animation = 'go-margin-right 2s';
    gameRoleBtn.style.animation = 'go-margin-left 2s';
    gameStartBtn.style.animation = 'go-margin-top 2s';
    gameTitle.style.animation = 'go-padding-top 2s';
}
const run1State = 3000;
const run2State = 3001;
const standBasicState = 3002;
const punchState = 3003;
function gameInit(){
    sinceLastTime = 0; //시간 체크용
    //플레이어 세팅, 침팬지 세팅, 음악 등등 게임 처음 부분
    wakgood = {
        x : 0,
        y : 110,
        width : spriteRun1Img.width/2,
        height : spriteRun1Img.height,
        state : run1,
        draw(){
            ctx.fillRect(this.x, this.y, this.width, this.height); //전 그림 지우기
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
            if(wakgood.x<=50){
                //처음에 등장하는 부분.
                wakgood.x+=3;
            }else{
                //멈춰있을때
                this.state = standBasicState;
            }

            //달리기부분
            switch(this.state){
                case run1 : this.state = run2State; break;
                case run2 : this.state = run1State; break;
            } 
        },
    }
    wakgood.update();
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

function gameUpdate(dt){
    sinceLastTime += dt;
    if(sinceLastTime > 100){
        //0.2초 정도 지날때마다 wakgood update();
        wakgood.update();
        sinceLastTime = 0;
    }

    if(punch == true){
        var now = Date.now();
        var dt = (now-lastime);
        
        if(wakgood.x+(wakgood.width/2) == chimpanzee.x){  
            //punchwakgood.x += wxakgood.x;
            if(dt >= 700){
                punch = false;
                lastime = now;
                wakgood.state = standBasicState;
            }
            chimpanzee.draw();
            wakgood.punchDraw();
        }else{
            wakgood.x+=1;
            chimpanzee.draw();
            wakgood.draw();
        }
    }else{
        chimpanzee.draw();
        wakgood.draw();
    }
    chimpanzee2.draw();
    chimpanzee3.draw();

}

function gameRender(){
    //모든 스프라이드(이미지) 그려주기.
    //플레이어(왁굳) 그려주기
    wakgood.draw();
    //침팬지들 그려주기.
    // for(let chimpanzee of chimpanzees){
    //     chimpanzee.draw();
    // }
}


//침팬지의 위치는 랜덤이다.
//침팬지는 처음에는