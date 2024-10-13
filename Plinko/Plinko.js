import { Ball } from "./Ball.js";

export class Plinko{
    static Low = [
        [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
        [5.6, 2, 1.6, 1, 0.7, 0.7, 1, 1.6, 2, 5.6],
        [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9],
        [8.4, 3, 1.9, 1.3, 1, 0.7, 0.7, 1, 1.3, 1.9, 3, 8.4],
        [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
        [8.1, 4, 3, 1.9, 1.2, 0.9, 0.7, 0.7, 0.9, 1.2, 1.9, 3, 4, 8.1],
        [7.1, 4, 1.9, 1.4, 1.3, 1.1, 1, 0.5, 1, 1.1, 1.3, 1.4, 1.9, 4, 7.1],
        [15, 8, 3, 2, 1.5, 1.1, 1, 0.7, 0.7, 1, 1.1, 1.5, 2, 3, 8, 15],
        [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16]
    ]
    
    constructor(parent){
        this.cont = null;
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
        this.parent = parent;
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
        amountInput.value="1.00";

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
        riskSelekt.classList.add('riskHandle')
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
        rowsSelekt.classList.add('rowsSelektt')

        
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
        numberOfBetsInput.classList.add('numberOfBetsHandle')

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
            let bet = parseFloat(this.cont.querySelector(".amountInput").value)
            this.parent.balance -= bet;
            this.activeBalls.push(new Ball(rnd, -6, this.ballSize, bet));
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

        const footInner = document.createElement('div')
        footInner.classList.add('footInner')
        gameFoot.appendChild(footInner);

        const screenOptions = document.createElement('div')
        screenOptions.classList.add('screenOptions')
        footInner.appendChild(screenOptions)



        const settings = document.createElement('button');
        settings.classList.add('butSettings')

        const svgNamespace = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("xmlns", svgNamespace);
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "24");   
        svg.setAttribute("viewBox", "0 0 50 50");

        var path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d","M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"); 
        path.setAttribute("fill", "lightgrey");
        svg.appendChild(path);

        settings.appendChild(svg);
        
        screenOptions.appendChild(settings);


        const theaterMode = document.createElement('button');
        theaterMode.classList.add('butSettings')

        svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("xmlns", svgNamespace);
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "24");   
        svg.setAttribute("viewBox", "0 0 50 50");

        path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d","M 26.5625 1 C 22.621094 1 19.40625 4.140625 19.40625 8 C 19.40625 9.769531 20.035156 10.992188 21.125 12.53125 C 21.894531 13.621094 21.988281 14.34375 21.84375 14.625 C 21.703125 14.894531 21.164063 15.046875 20.46875 15 C 17.996094 14.832031 10.339844 13.941406 10.3125 13.9375 C 10.140625 13.910156 9.964844 13.90625 9.8125 13.90625 C 8.9375 13.90625 7.417969 14.328125 7.09375 17.15625 C 7.007813 17.570313 6.617188 19.808594 6.03125 27.5625 C 5.96875 27.878906 6.015625 28.164063 6.0625 28.40625 C 6.277344 29.503906 7.003906 30.15625 8 30.15625 C 9.03125 30.15625 10.203125 29.460938 11.78125 28.34375 C 13.097656 27.414063 14.191406 27 15.3125 27 C 18.152344 27 20.46875 29.242188 20.46875 32 C 20.46875 34.757813 18.152344 37 15.3125 37 C 13.988281 37 13.078125 36.632813 11.71875 35.5625 C 10.140625 34.320313 8.949219 33.75 8 33.75 C 7.160156 33.75 6.511719 34.210938 6.1875 35 C 6 35.460938 5.964844 36.144531 6.03125 36.53125 C 6.550781 41.972656 6.808594 42.972656 7.03125 43.84375 L 7.125 44.21875 C 7.511719 45.90625 8.707031 47 10.15625 47 L 42.1875 47 C 44.507813 47 46 45.527344 46 43.25 L 46 17.375 C 46 15.660156 45.085938 14.515625 43.25 13.96875 C 43.125 13.929688 42.976563 13.925781 42.84375 13.9375 C 42.769531 13.945313 35.261719 14.691406 32.59375 15 C 32.492188 15.011719 32.378906 15.03125 32.28125 15.03125 C 32.027344 15.03125 31.574219 14.992188 31.40625 14.6875 C 31.222656 14.359375 31.273438 13.605469 31.96875 12.5 L 32.09375 12.3125 C 33.160156 10.617188 33.6875 9.761719 33.6875 8 C 33.6875 4.140625 30.503906 1 26.5625 1 Z"); 
        path.setAttribute("fill", "lightgrey");
        svg.appendChild(path);

        svg.appendChild(path)

        theaterMode.appendChild(svg)

        screenOptions.appendChild(theaterMode);


        const syncMode = document.createElement('button');
        syncMode.classList.add('butSettings')

        svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("xmlns", svgNamespace);
        svg.setAttribute("x", "0px");
        svg.setAttribute("y", "0px");
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "24");   
        svg.setAttribute("viewBox", "0 0 50 50");

        path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d","M 25 5 C 14.351563 5 5.632813 13.378906 5.054688 23.890625 C 5.007813 24.609375 5.347656 25.296875 5.949219 25.695313 C 6.550781 26.089844 7.320313 26.132813 7.960938 25.804688 C 8.601563 25.476563 9.019531 24.828125 9.046875 24.109375 C 9.511719 15.675781 16.441406 9 25 9 C 29.585938 9 33.699219 10.925781 36.609375 14 L 34 14 C 33.277344 13.988281 32.609375 14.367188 32.246094 14.992188 C 31.878906 15.613281 31.878906 16.386719 32.246094 17.007813 C 32.609375 17.632813 33.277344 18.011719 34 18 L 40.261719 18 C 40.488281 18.039063 40.71875 18.039063 40.949219 18 L 44 18 L 44 8 C 44.007813 7.460938 43.796875 6.941406 43.414063 6.558594 C 43.03125 6.175781 42.511719 5.964844 41.96875 5.972656 C 40.867188 5.988281 39.984375 6.894531 40 8 L 40 11.777344 C 36.332031 7.621094 30.964844 5 25 5 Z M 43.03125 23.972656 C 41.925781 23.925781 40.996094 24.785156 40.953125 25.890625 C 40.488281 34.324219 33.558594 41 25 41 C 20.414063 41 16.304688 39.074219 13.390625 36 L 16 36 C 16.722656 36.011719 17.390625 35.632813 17.753906 35.007813 C 18.121094 34.386719 18.121094 33.613281 17.753906 32.992188 C 17.390625 32.367188 16.722656 31.988281 16 32 L 9.71875 32 C 9.507813 31.96875 9.296875 31.96875 9.085938 32 L 6 32 L 6 42 C 5.988281 42.722656 6.367188 43.390625 6.992188 43.753906 C 7.613281 44.121094 8.386719 44.121094 9.007813 43.753906 C 9.632813 43.390625 10.011719 42.722656 10 42 L 10 38.222656 C 13.667969 42.378906 19.035156 45 25 45 C 35.648438 45 44.367188 36.621094 44.945313 26.109375 C 44.984375 25.570313 44.800781 25.039063 44.441406 24.636719 C 44.078125 24.234375 43.570313 23.996094 43.03125 23.972656 Z");
        path.setAttribute("fill", "lightgrey");
        svg.appendChild(path);

        svg.appendChild(path)

        syncMode.appendChild(svg)

        screenOptions.appendChild(syncMode);

        const logoContainer = document.createElement('div');
        logoContainer.classList.add('bLogoContainer');
        
        const logo = document.createElement('img')
        logo.classList.add('bLogo');
        logo.src="./surge5.png"
        
        logoContainer.appendChild(logo);
        
        footInner.appendChild(logoContainer)




        const fairnessHolder = document.createElement('div')
        fairnessHolder.classList.add('fairnessHolder')

        let label = document.createElement('label')
        label.innerHTML = "Fairness"
        fairnessHolder.appendChild(label);



        footInner.appendChild(fairnessHolder)
        
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
                this.activateMultiplierAnimation(e);
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

        let select = this.cont.querySelector(".rowsSelektt")
        let risk = this.cont.querySelector(".riskHandle")
        let numOfBets = this.cont.querySelector(".numberOfBetsHandle")
        

        if(this.activeBalls.length > 0 && select.disabled == false){
            select.disabled = true;
            risk.disabled = true;
            numOfBets.disabled = true;
        }else if(this.activeBalls.length == 0 && select.disabled == true){
            select.disabled = false;
            risk.disabled = false;
            numOfBets.disabled = false;
        }
        


        // console.log("xd");
        this.animationFrameId = requestAnimationFrame(()=>this.animate());
    }

    activateMultiplierAnimation(ball){

        const manji = this.lastObstacles.filter(e=> e.x < ball.x);
        if(this.multipliers[manji.length-1]){
        this.multiplierHolders[manji.length-1].classList.add('animation');


        this.parent.balance += this.multipliers[manji.length-1]*ball.value

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
                break;
            case 9:
                width = '82.5%';
                break;
            case 10:
                width = '81.2%';
                break;
            case 11:
                width = '80.2%';
                break;
            case 12:
                width = '79.2%';
                break;
            case 13:
                width = '78.2%';
                break;
            case 14:
                width = '77.5%';
                break;
            case 15:
                width = '77%';
                break;
            case 16:
                width = '76.4%';
                break;
            default:
                width = '9999%';

        }

        this.multipliers = Plinko.Low[rows-8]

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
            const lightness = 90 - (Math.abs((rows) / 2 - i) * 10); 
            z.style.backgroundColor = `hsl(210, 100%, ${lightness}%)`;
            s.innerHTML = this.multipliers[i] + "x";
            this.multiplierHolders.push(z);
            par.appendChild(z);
        }




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
                    // console.log("XDD")
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

        // console.log(this.lastObstacles);

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
    
    drawDescription(host){

        const descriptionHolder = document.createElement('div')
        descriptionHolder.classList.add('descriptionHolder')
        host.appendChild(descriptionHolder)

        const coverAndRText = document.createElement('div');
        coverAndRText.classList.add('coverAndRText');


        const cover = document.createElement('img')
        cover.classList.add('cover')
        cover.src = './PACHINKO.png';
        coverAndRText.appendChild(cover);

        const textToTheRight = document.createElement('textToTheRight');
        textToTheRight.classList.add('textToTheRight');
        
        
        const text0 = document.createElement('span');
        text0.classList.add('text0')
        text0.innerHTML="Plinko"
        textToTheRight.appendChild(text0);
        
        const text1 = document.createElement('span');
        text1.classList.add('text1')
        text1.innerHTML = "Pachinko is a mechanical game originating in Japan that is used as an arcade game, and much more frequently for gambling. Pachinko fills a niche in Japanese gambling comparable to that of the slot machine in the West as a form of low-stakes, low-strategy gambling."
        textToTheRight.appendChild(text1);
        
        const text2 = document.createElement('span');
        text2.classList.add('text2')
        text2.innerHTML="Pachinko parlors are widespread in Japan, and usually also feature a number of slot machines (called pachislo or pachislots) so these venues look and operate similarly to casinos. Modern pachinko machines have both mechanical and electrical components."
        textToTheRight.appendChild(text2);
        coverAndRText.appendChild(textToTheRight);
        
        
        descriptionHolder.appendChild(coverAndRText);

        const additionalDescription = document.createElement('div');
        additionalDescription.classList.add('additionalDescription');
        descriptionHolder.appendChild(additionalDescription);

        const underText = document.createElement('span');
        underText.classList.add('underText');
        underText.innerHTML = "A pachinko machine resembles a vertical pinball machine, but is different from Western pinball in several ways. It uses small  steel balls, which the owner rents to the player, while pinball games use a larger, captive ball. The player loads one or more balls into the machine, then presses and releases a spring-loaded handle, which is attached to a padded hammer inside the machine, launching the ball(s) into a metal track. The track guides the ball over the top of the playing field; then when it loses momentum, it falls into the playing field. Some pachinko machines have a bumper to bounce the ball as it reaches the top, while others allow it to travel all the way around the field, to fall the second time it reaches the top."

        additionalDescription.appendChild(underText);

    }

}