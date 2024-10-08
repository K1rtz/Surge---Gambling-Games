import { Ball } from "./Ball.js";
export class Plinko{

    constructor(){
        this.cont = null;
        //this.drawEverything(host);
        this.betAmount = 1;
        this.kanvas = null;
        this.ctx = null;
        this.rows = 8;
        this.ballSize = 15;
        this.multipliers = [];
        this.multiplierHolders = [];
        this.activeBalls = [];
        this.obstacles = [];
        this.lastObstacles = [];
        this.gap;
    }

    drawEverything(host){
        const fullGame = document.createElement('div');
        fullGame.classList.add('fullGame');
        host.appendChild(fullGame);
        this.cont = fullGame;

        const gameBody = document.createElement('div');
        gameBody.classList.add('gameBody')
        fullGame.appendChild(gameBody);



        this.drawForm(gameBody);
        this.drawGame(gameBody, 8);
        this.drawFoot(fullGame);
        this.drawDescription(host);

    }

    drawDescription(host){

        const descriptionHolder = document.createElement('div')
        descriptionHolder.classList.add('descriptionHolder')
        host.appendChild(descriptionHolder)


        const cover = document.createElement('img')
        cover.classList.add('cover')
        cover.src = './PlinkoCover2.png';
        descriptionHolder.appendChild(cover);

        const textToTheRight = document.createElement('textToTheRight');
        textToTheRight.classList.add('textToTheRight');
        descriptionHolder.appendChild(textToTheRight)


        const text0 = document.createElement('span');
        text0.classList.add('text0')
        text0.innerHTML="Plinko"
        textToTheRight.appendChild(text0);

        const text1 = document.createElement('span');
        text1.classList.add('text1')
        text1.innerHTML = "Plinko lets players drop a ball from the top of our triangular pin pyramid to find the winning route down to a corresponding multiplier."
        textToTheRight.appendChild(text1);

        const text2 = document.createElement('span');
        text2.classList.add('text2')
        // text2.innerHTML="Inspired by the Japanese mechanical game known as Pachinko, Plinko provides players with the ability to customise your risk factor and multipliers ensuring this Stake Original game is suited for everyone at our online casino !"
        text2.innerHTML="Pachinko (パチンコ) is a mechanical game originating in Japan that is used as an arcade game, and much more frequently for gambling. Pachinko fills a niche in Japanese gambling comparable to that of the slot machine in the West as a form of low-stakes, low-strategy gambling. Plinko provides players with the ability to customise your risk factor and multipliers ensuring this Stake Original game is suited for everyone at our online casino !"
        textToTheRight.appendChild(text2);

    }



    //Crta Formu levo, nije flex
    drawForm(host){
        
        const formHolder = document.createElement('div');
        formHolder.classList.add('formHolder');
        host.appendChild(formHolder);
        
        const form = document.createElement('div');
        form.classList.add('form')
        formHolder.appendChild(form)

        //Dugmici za auto/manual

        const bHolder = document.createElement('div');
        const bManual = document.createElement('button');
        const bAuto = document.createElement('button');
        bHolder.classList.add("bHolder")
        bManual.classList.add("bManual", "plinkoButtons", "hovColor");
        bAuto.classList.add("bAuto", "plinkoButtons");
        bManual.innerHTML = "Manual";
        bAuto.innerHTML = "Auto"



        bHolder.appendChild(bManual);
        bHolder.appendChild(bAuto);
        form.appendChild(bHolder);

        //Bet amount

        const betAmountHolder = document.createElement('div')
        betAmountHolder.classList.add('betAmountHolder')
        const betAmountText = document.createElement('div')
        betAmountText.classList.add('betAmountText')
        const betAmountInput = document.createElement('div')
        betAmountInput.classList.add('betAmountInput')

        betAmountText.innerHTML = "Bet Amount";

        betAmountHolder.appendChild(betAmountText)
        betAmountHolder.appendChild(betAmountInput)

        const amountInput = document.createElement('input');
        amountInput.classList.add('amountInput');
        betAmountInput.appendChild(amountInput);
        amountInput.value="0.00";

        const bHalf = document.createElement('button')
        const bDouble = document.createElement('button')
        bHalf.classList.add("btni", 'bHalf')
        bDouble.classList.add("btni", 'bDouble')
        bHalf.innerHTML = "½"
        bDouble.innerHTML = "2x"

        betAmountInput.appendChild(bHalf)
        betAmountInput.appendChild(bDouble)

        form.appendChild(betAmountHolder);

        //Risk

        const riskHolder = document.createElement('div');
        const riskText = document.createElement('div')
        const riskSelekt = document.createElement('select')

        riskText.innerHTML ="Risk";
        riskText.classList.add('betAmountText')
        riskHolder.classList.add('riskHolder')
        riskSelekt.classList.add('riskInput')
        form.appendChild(riskHolder);
        riskHolder.appendChild(riskText);
        riskHolder.appendChild(riskSelekt);

        

        var riskOptions = ["Low", "Medium", "High"];
        let op;
        riskOptions.forEach(e=>{
            op = document.createElement('option');
            op.innerHTML = e;
            riskSelekt.appendChild(op);
        })

        //Rows

        const rowsHolder = document.createElement('div');
        const rowsText = document.createElement('div')
        const rowsSelekt = document.createElement('select')

        form.appendChild(rowsHolder);

        rowsHolder.appendChild(rowsText)
        rowsHolder.appendChild(rowsSelekt)
        rowsText.innerHTML ="Rows";
        rowsText.classList.add('betAmountText')
        rowsHolder.classList.add('riskHolder')
        rowsSelekt.classList.add('riskInput')

        
        for(let i = 8; i < 17; i++){
            op = document.createElement('option');
            op.innerHTML = i;
            rowsSelekt.appendChild(op);
        }





        const self = this;
        rowsSelekt.addEventListener('change', function(e){
            const rows = parseInt(e.target.value, 10);
            //Samo kada je trenutna igra okoncana
            //Tj kada nema loptica na ekranu
            //Potencijalno samo disable selekt element dok je igra aktivna
            //crtaj 
            //self.drawGame(host, rows);

            self.rows = rows;
            self.updateRectangles(rows);
            self.updateObstacles(rows);

        })
        






        //Number of bets

        const numberOfBetsHolder = document.createElement('div');
        const numberOfBetsText = document.createElement('div')
        const numberOfBetsInput = document.createElement('input')
        numberOfBetsInput.value = "0";

        numberOfBetsHolder.appendChild(numberOfBetsText);
        numberOfBetsHolder.appendChild(numberOfBetsInput);

        numberOfBetsHolder.classList.add('numberOfBetsHolder')
        numberOfBetsText.classList.add('betAmountText')
        numberOfBetsInput.classList.add('numberOfBetsInput')

        form.appendChild(numberOfBetsHolder)

        numberOfBetsText.innerHTML = "Number of Bets";


        //Button


        const buttonBox = document.createElement('div');
        const buttonBet = document.createElement('button');
        buttonBox.classList.add('buttonBox')
        buttonBet.classList.add('buttonBet')
        form.appendChild(buttonBox);
        buttonBox.appendChild(buttonBet);
        buttonBet.innerHTML = "Bet";

        buttonBet.onclick = (ev) =>{
            let rnd = Math.floor(Math.random() * this.gap * 2 + 1 + this.kanvas.width/2 - this.gap)
            this.activeBalls.push(new Ball(rnd, -6, this.ballSize, 10));
        }





        bManual.onclick = (ev) =>{
            bManual.classList.add("hovColor");
            bAuto.classList.remove("hovColor");

            numberOfBetsHolder.style.display = "none";      
            buttonBet.innerHTML = "Bet";

        }
        bAuto.onclick = (ev) =>{
            bAuto.classList.add("hovColor");
            bManual.classList.remove("hovColor");

            numberOfBetsHolder.style.display = "flex";            
            buttonBet.innerHTML = "Start Autobet";
        }

        bHalf.onclick = (ev) =>{
            if(this.betAmount != 0 && this.betAmount >= 0.5){
                amountInput.value = (this.betAmount / 2).toFixed(2);
                this.betAmount = this.betAmount / 2;
            }
        }
        bDouble.onclick = (ev) =>{
            if(this.betAmount != 0){
                amountInput.value = (this.betAmount * 2).toFixed(2);
                this.betAmount = this.betAmount * 2;
            }
        }



    }

    drawGame(host, rows){
        const display = document.createElement('div');
        display.classList.add('display')
        host.appendChild(display)

        const displayInner = document.createElement('div');
        displayInner.classList.add('displayInner');
        display.appendChild(displayInner);

        // const displayInnerCanvasHolder= document.createElement('div')
        // displayInnerCanvasHolder.classList.add('displayInnerCanvasHolder')
        // displayInner.appendChild(displayInnerCanvasHolder);

        this.kanvas = document.createElement('canvas')
        this.kanvas.classList.add('kanvas')
        // displayInnerCanvasHolder.appendChild(this.kanvas);
        displayInner.appendChild(this.kanvas);

        this.kanvas.width = 720;
        this.kanvas.height = 540;

        this.ctx = this.kanvas.getContext('2d');

        //this.drawPyramid(rows);


        const displayInnerRectanglesHolder = document.createElement('div')
        displayInnerRectanglesHolder.classList.add('displayInnerRectanglesHolder');
        displayInner.appendChild(displayInnerRectanglesHolder)

        const displayInnerRectangles = document.createElement('div')
        displayInnerRectangles.classList.add('displayInnerRectangles');
        displayInnerRectanglesHolder.appendChild(displayInnerRectangles)

        this.updateRectangles(rows);

        this.updateObstacles(rows);
        this.animate();
    }

    drawFoot(host){
        const gameFoot = document.createElement('div');
        gameFoot.classList.add('gameFoot')
        host.appendChild(gameFoot);
    }

    
    //Ove dole
    drawCircle(x,y,radius){
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI*2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawPyramid(rows){
        let frl = 3; //duzina prvog reda

        let radius;
        let y;

        switch(rows){
            case 8:
                this.gap = 68;
                radius = 8;
                
                y = 30;
                break;
            case 9:
                this.gap = 60;
                radius = 7;
                y = 30;
                break;
            case 10:
                this.gap = 53.5;
                radius = 6;
                y = 30;
                break;
            case 11:
                this.gap =48;
                radius = 5.5;
                y = 30;
                break;
            case 12:
                this.gap = 43.5;
                radius = 5;
                y = 30;
                break;
            case 13:
                this.gap = 40;
                radius = 4.5;
                y = 30;
                break;
            case 14:
                this.gap = 37;
                radius = 4;
                y = 30;
                break;
            case 15:
                this.gap = 34.5;
                radius = 4;
                y = 30;
                break;
            case 16:
                this.gap = 32.4;
                radius = 3.5;
                y = 30;
                break;
            default:
                this.gap = 0;
                radius = 0;
                y = 0;
        }
        let x = this.kanvas.width/2 - this.gap;


        
        this.ctx.fillStyle = 'white';
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < frl; j++){
                this.drawCircle(x+this.gap*j, y+this.gap*i, radius);
            }
            
            x-=this.gap/2;
            frl++;
        }

    }

    ////////////////////// LOOPER

    animate(){
        this.ctx.clearRect(0,0, this.kanvas.width, this.kanvas.height);
        this.update();
        this.activeBalls = this.activeBalls.filter(e=>{
            // console.log(e)
            if(e.y > this.lastObstacles[0].y){
                this.activateMultiplierAnimation(e.x);
                e.update();
                return false
            }
            e.update();
            e.draw(this.ctx);
            return true;
        })

        this.activeBalls.forEach(b =>{
            this.obstacles.forEach(o =>{
                if(this.checkForCollision(b,o)){
                    this.reflect(b, o);
                }
            })
        })



        console.log("xd");
        this.animationFrameId = requestAnimationFrame(()=>this.animate());
    }

    activateMultiplierAnimation(ballX){

        const manji = this.lastObstacles.filter(e=> e.x < ballX);
        console.log(this.multipliers[manji.length-1]);
        if(this.multipliers[manji.length-1]){
        this.multiplierHolders[manji.length-1].style.backgroundColor="green";
        this.multiplierHolders[manji.length-1].classList.add('animation');
        setTimeout(()=>{this.multiplierHolders[manji.length-1].classList.remove('animation');},200);
        }
 
        
    }




    update(){
        this.drawPyramid(this.rows);
    }

    updateRectangles(rows){
        let n = rows+1;
        let width;
        switch(rows){
            case 8:
                width = '85%';
                this.multipliers = ['5.6x', '2.1x', '1.1x', '1x', '0.5x', '1x', '1.1x', '2.1x', '5.6x']
                break;
            case 9:
                width = '82.5%';
                this.multipliers = ['5.6x', '2x', '1.6x', '1x', '0.7x', '0.7x', '1x', '1.6x', '2x', '5.6x']
                break;
            case 10:
                width = '81.2%';
                this.multipliers = ['8.9x', '3x', '1.4x', '1.1x', '1x', '0.5x', '1x', '1.1x', '1.4x', '3x', '8.9x']
                break;
            case 11:
                width = '80.2%';
                this.multipliers = ['8.4x', '3x', '1.9x', '1.3x', '1x', '0.7x', '0.7x', '1x', '1.3x', '1.9x', '3x', '8.4x']
                break;
            case 12:
                width = '79.2%';
                this.multipliers = ['10x', '3x', '1.6x', '1.4x', '1.1x', '1x', '0.5x', '1x', '1.1x', '1.4x', '1.6x', '3x', '10x']
                break;
            case 13:
                width = '78.2%';
                this.multipliers = ['8.1x', '4x', '3x', '1.9x', '1.2x', '0.9x', '0.7x', '0.7x', '0.9x', '1.2x', '1.9x', '3x', '4x', '8.1x']
                break;
            case 14:
                width = '77.5%';
                this.multipliers = ['7.1x', '4x', '1.9x', '1.4x', '1.3x', '1.1x', '1x', '0.5x', '1x', '1.1x', '1.3x', '1.4x', '1.9x', '4x', '7.1x']
                break;
            case 15:
                width = '77%';
                this.multipliers = ['15x', '8x', '3x', '2x', '1.5x', '1.1x', '1x', '0.7x', '0.7x', '1x', '1.1x', '1.5x', '2x', '3x', '8x', '15x']
                break;
            case 16:
                width = '76.4%';
                this.multipliers = ['16x', '9x', '2x', '1.4x', '1.4x', '1.2x', '1.1x', '1x', '0.5x', '1x', '1.1x', '1.2x', '1.4x', '1.4x', '2x', '9x', '16x']
                break;
            default:
                width = '9999%';
        }

        var par = this.cont.querySelector(".displayInnerRectangles");
        par.replaceChildren();
        par.style.width = width;
        this.multiplierHolders.length = 0;

        let z;
        let s;
        for(let i =0; i < rows+1 ; i++){
            z=document.createElement('div');
            z.classList.add('z');
            s = document.createElement('span');
            s.classList.add('s');
            z.appendChild(s);
            s.innerHTML = this.multipliers[i];
            this.multiplierHolders.push(z);
            par.appendChild(z);
        }
        //z.style.animation = ' slideDown 0.5s ease-in-out';




    }

    updateObstacles(rows){
        let frl = 3; //duzina prvog reda
        let radius;
        let y;

        switch(rows){
            case 8:
                this.gap = 68;
                this.ballSize = 16;
                radius = 8;
                y = 30;
                break;
            case 9:
                this.gap = 60;
                this.ballSize = 15;
                radius = 7;
                y = 30;
                break;
            case 10:
                this.gap = 53.5;
                this.ballSize = 14;
                radius = 6;
                y = 30;
                break;
            case 11:
                this.gap =48;
                this.ballSize = 13.5;
                radius = 5.5;
                y = 30;
                break;
            case 12:
                this.gap = 43.5;
                this.ballSize = 13;
                radius = 5;
                y = 30;
                break;
            case 13:
                this.gap = 40;
                this.ballSize = 12.5;
                radius = 4.5;
                y = 30;
                break;
            case 14:
                this.gap = 37;
                this.ballSize = 11.5;
                this.ballSize = 12;
                radius = 4;
                y = 30;
                break;
            case 15:
                this.gap = 34.5;
                this.ballSize = 11;
                radius = 4;
                y = 30;
                break;
            case 16:
                this.gap = 32.4;
                this.ballSize = 10;
                radius = 3.5;
                y = 30;
                break;
            default:
                this.gap = 0;
                radius = 0;
                y = 0;
        }
        let x = this.kanvas.width/2 - this.gap;

        this.obstacles.length = 0;
        this.lastObstacles.length = 0;
        
        this.ctx.fillStyle = 'white';
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < frl; j++){
                //this.drawCircle(x+gap*j, y+gap*i, radius);
                this.obstacles.push({
                    x: x+this.gap*j,
                    y: y+this.gap*i,
                    radius: radius
                })
                if(i==rows-1){
                    console.log("XDD")
                    this.lastObstacles.push({
                        x: x+this.gap*j,
                        y: y+this.gap*i,
                        radius: radius
                    })
                }
            }
            x-=this.gap/2;
            frl++;
        }

        console.log(this.lastObstacles);

    }

    checkForCollision(ball, obstacle){
        const dx = ball.x - obstacle.x;
        const dy = ball.y - obstacle.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        //console.log(distance);
        return distance < ball.radius + 4;
    }

    reflect(ball, obstacle){
        const dx = ball.x - obstacle.x;
        const dy = ball.y - obstacle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const overlap = ball.radius + 4 - distance;
    
        // Sinus i kosinus ugla normalnog vektora u odnosu na x osu.
        const normalX = dx / distance;
        const normalY = dy / distance;
    
        // Pomeri loptu van prepreke
        ball.x += normalX * overlap;
        ball.y += normalY * overlap;
    
        // Reflektuj brzinu lopte
        const dot = ball.velocityX * normalX + ball.velocityY * normalY;
        const restitution = 0.8; // Smanji intenzitet odbijanja
        ball.velocityX -= 2 * dot * normalX * restitution;
        ball.velocityY -= 2 * dot * normalY * restitution;

        const randomness = 0.03; // Intenzitet nasumične promene
        ball.velocityX += (Math.random() - 0.5) * randomness;
        ball.velocityY += (Math.random() - 0.5) * randomness;
    }

}