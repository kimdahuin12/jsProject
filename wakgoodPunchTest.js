var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1900/5;
canvas.height = 1080/5;


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

const run1 = 3000;
const run2 = 3001;
const standBasic = 3002;
const punch = 3003;

var wakgood = {
    x : 0,
    y : 110,
    width : spriteRun1Img.width,
    height : spriteRun1Img.height,
    state : run1,
    imgClear(){
        ctx.clearRect(this.x, this.y, this.width, this.height); //전 그림 지우기
    },
    draw(){
        switch(this.state){
            case run1: ctx.drawImage(spriteRun1Img, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
            case run2: ctx.drawImage(spriteRun2Img,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
            case standBasic: ctx.drawImage(spriteStandImg,  20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
            case punch: ctx.drawImage(spritePunchImg, 20, 0, this.width, this.height, this.x, this.y, this.width, this.height); break;
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
    punchDraw(){
        // ctx.drawImage(spriteChimpanzee, this.x-15, this.y-15);
        ctx.drawImage(spritePunchImg, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    },

}


class Chimpanzee {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = spriteChimpanzee.width;
        this.height = spriteChimpanzee.height;
    }
    draw(){
        // ctx.drawImage(spriteChimpanzee, this.x-15, this.y-15);
        ctx.drawImage(spriteChimpanzee, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    imgClear(){
        ctx.clearRect(this.x, this.y, this.width, this.height); //전 그림 지우기
    }
}


var timer = 0;

function 프레임마다실행할거(){
    requestAnimationFrame(프레임마다실행할거);
   // timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var chimpanzee = new Chimpanzee(80, 120);



    if(펀치 == true){
        var now = Date.now();
        var dt = (now-lastime);
        
        if(wakgood.x+(wakgood.width/2) == chimpanzee.x){  
            //punchwakgood.x += wxakgood.x;
            if(dt >= 700){
                펀치 = false;
                lastime = now;
                wakgood.state = standBasic;
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


var lastime = Date.now();

프레임마다실행할거();

var 펀치 = false;

document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        펀치 = true;
    }
})

// function ex01(){
//     var sec = 300;
//     setText(); // 카운트 다운 모드
 
//     //alert()호출 함수
//     function alertFunc() {
//         alert('짜잔');
//     }
 
//     //3,2,1 카운트 다운으로 text 변환 함수
//     function setText(){
//         document.getElementById('ex01Btn').innerText = sec--;
//     }
 
//     //3초뒤 alert 호출 함수 호출
//     setTimeout(alertFunc, 3005);
 
//     //0.01초 간격으로 3초 동안 text 변
//     var intervalID = setInterval(setText, 1000);
//     setTimeout(function(){
//         clearInterval(intervalID);
//         document.getElementById('ex01Btn').innerText = '실행';
//     }, 3000);
// }

// - 게임 시작 부분(우왁굳 등장, 버튼 아래, 타이틀 위로 사라지고 침팬지 나타남, 버튼 클릭 이동 등)
// - 침팬지 나타나는거(위, 중간, 아래 중에서 랜덤으로, 화면 전환까지)  / 보물 침팬지 -- 연속으로 두번 쳐야 죽고 점수 높다.


// - 캐릭터가 침팬지 치고 스코어 얻는거(치고 나서 다시 서있는자세로. 잘못 쳤을땐 앞의 침팬지 무시하고 다음 침팬지)
// - 타이머(2분 내에 침팬지 우리를 탈출하지 못하면 게임 오버)