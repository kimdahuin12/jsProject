class Game{
        constructor(){
            //캔버스를 가져오고 정보를 세팅
            this.canvas = document.getElementById('gameCanvas'); //캔버스 가져오기
            
            this.context = this.canvas.getContext('2d'); //캔버스의 컨텍스트 가져오기
            
            //이미지를 로드
            
            this.player = new Image(); //이미지 객체 생성
            this.player.src = "./img/stand_w.png";
            this.player2 = new Image();
            this.player2.src = "./img/run1.png";

            //이미지가 로드되면 Sprite 클래스를 이용하여 이미지 그리기(render에서 실제로 그려짐)
            const game = this;
            // this.backgroundImg.onload = function(){
            //     const options = { context:game.context, height:game.canvas.height, width:game.canvas.width, image:this }
            //     game.sprite = new Sprite(options);
            //     game.sprite.render();
            // }
            // this.player.onload = function(){
            //     const playerOptions = { context:game.context, height:this.height, width:this.width, image:this  }
            //     game.playerSprite = new Sprite(playerOptions);
            //     game.playerSprite.render();
            // }
            
            this.player2.onload = function(){
                const playerOptions = { context:game.context, height:80, width:80, image:this  }
                game.playerSprite2 = new Sprite(playerOptions);
                game.playerSprite2.render();
            }

        }
}

class Sprite{
    //이 클래스는 단순히 그림을 그리는 용도로 사용됨
    constructor(options){
        //이미지 속성 저장
        this.context = options.context; 
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
    }
    render(){
        //실제로 이미지들을 화면에 그려주는 함수
        this.context.drawImage(this.image, 0, 0, this.width, this.height);
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
canvas.width = 1900/4;
canvas.height = 1080/4;
//게임 시작 버튼 눌렀을때
gameStartBtn.onclick= function(){
    mainBtnClickEvent();
    setTimeout(()=>mainScreen.remove(), 1800); //버튼들이 사라지는데 2초정도 걸림. 그래서 조금 더 빨리 메인의 버튼들을 모두 없앰.(mainScreen은 메인화면)
    //기다린 후 canvas를 붙여주고 게임을 실행한다.
    setTimeout(()=> {
        body.prepend(canvas);
        const game = new Game();  
    }, 1000);
}

function mainBtnClickEvent(){
    //메인 화면에서 버튼을 클릭시 실행됨
    gameRankBtn.style.animation = 'go-margin-right 2s';
    gameRoleBtn.style.animation = 'go-margin-left 2s';
    gameStartBtn.style.animation = 'go-margin-top 2s';
    gameTitle.style.animation = 'go-padding-top 2s';
}

