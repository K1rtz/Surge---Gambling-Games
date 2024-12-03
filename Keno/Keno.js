export class Keno{

    static Low = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1.9, 0.2, 0.1, 0, 0, 0, 0, 0, 0, 0],
        ['z', 3, 2.4, 1.2, 1, 1, 0.8, 0, 0, 0.5],
        ['z', 'z', 11, 5, 4, 3, 2, 1.5, 1, 2],
        ['z', 'z', 'z', 20, 10, 5, 2, 2, 1.5, 5],
        ['z', 'z', 'z', 'z', 40, 35, 22, 10, 5, 10],
        ['z', 'z', 'z', 'z', 'z', 100, 85, 40, 40, 20],
        ['z', 'z', 'z', 'z', 'z', 'z', 250, 150, 100, 30],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 500, 400, 40],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 750, 50],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 100]
    ]
    static Medium = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['z', 5, 2, 1, 0, 0, 0, 0, 0, 0],
        ['z', 'z', 11, 5, 3, 2, 1, 1, 0, 0],
        ['z', 'z', 'z', 20, 10, 5, 2, 2, 1, 0],
        ['z', 'z', 'z', 'z', 40, 35, 22, 10, 5, 5],
        ['z', 'z', 'z', 'z', 'z', 100, 85, 40, 40, 25],
        ['z', 'z', 'z', 'z', 'z', 'z', 250, 150, 100, 120],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 500, 400, 200],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 750, 450],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 0]
    ]
    static High = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['z', 5, 2, 1, 0, 0, 0, 0, 0, 0],
        ['z', 'z', 11, 5, 3, 2, 1, 1, 0, 0],
        ['z', 'z', 'z', 20, 10, 5, 2, 2, 1, 0],
        ['z', 'z', 'z', 'z', 40, 35, 22, 10, 5, 5],
        ['z', 'z', 'z', 'z', 'z', 100, 85, 40, 40, 25],
        ['z', 'z', 'z', 'z', 'z', 'z', 250, 150, 100, 120],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 500, 400, 200],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 750, 450],
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 200]
    ]

    constructor(parent){
        this.cont = null;
        this.betAmount = 1.00;
        this.numberOfMines = 1;
        this.active;
        this.currentProfit = 0.00;
        this.multiplier = 1.00;
        
        this.tiles = [];
        this.selected = [];
        this.randomPicked = [];
        this.numberOfHits = 0;
        this.numberOfClicked = 0;
        this.count = 0;

        this.multipliers = [];
        this.mines = [];
        this.parent = parent;

        this.buttonSound = new Audio('./Sound/Keno/kenoButtonClick1.mp3')
    }


    drawEverything(host){
        const fullGame = document.createElement('div');
        fullGame.classList.add('fullGame');
        host.appendChild(fullGame);
        this.cont = fullGame;

        const gameBody = document.createElement('div');
        gameBody.classList.add('gameBodyKeno')
        fullGame.appendChild(gameBody);

        this.drawForm(gameBody);
        this.drawGame(gameBody);
        this.drawFoot(fullGame);
        this.drawDescription(host);

        this.active = false;



    }

    drawForm(host){

        const formHolder = document.createElement('div');
        formHolder.classList.add('formHolder');
        host.appendChild(formHolder);
        
        const form = document.createElement('div');
        form.classList.add('form')
        formHolder.appendChild(form)

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
        amountInput.type = "number";
        amountInput.min = "0.25";
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




        const riskHolder = document.createElement('div');
        const riskText = document.createElement('div')
        const riskSelekt = document.createElement('select')

        form.appendChild(riskHolder);

        riskHolder.appendChild(riskText)
        riskHolder.appendChild(riskSelekt)
        riskText.innerHTML = "Risk";
        riskText.classList.add('betAmountText')
        riskHolder.classList.add('riskHolder')
        riskSelekt.classList.add('riskInput')

        let op;
        let options = ["Low", "Medium", "High"]
        for(let i = 0; i < options.length; i++){
            op = document.createElement('option');
            op.innerHTML = options[i];
            riskSelekt.appendChild(op);
        }

        //Total profit

        const totalProfitDisplayHolder = document.createElement('div');
        totalProfitDisplayHolder.classList.add('totalProfitDisplayHolder')
        form.appendChild(totalProfitDisplayHolder);

        const totalProfitText = document.createElement('label');
        totalProfitText.classList.add('totalProfitText')
        totalProfitText.innerHTML ="Total profit [1.00x]"
        totalProfitDisplayHolder.appendChild(totalProfitText);

        const totalProfitDisplay = document.createElement('div');
        totalProfitDisplay.classList.add('totalProfitDisplay');
        totalProfitDisplayHolder.appendChild(totalProfitDisplay);

        totalProfitDisplay.innerHTML = this.currentProfit.toFixed(2);



        //buttonclear

        const buttonClearBox = document.createElement('div');
        buttonClearBox.classList.add('buttonBox');
        form.appendChild(buttonClearBox);

        const kenoButtonClear = document.createElement('button');
        kenoButtonClear.classList.add('kenoButtonAutoSelect')
        kenoButtonClear.classList.add('kenoButtonClear')
        buttonClearBox.appendChild(kenoButtonClear);

        kenoButtonClear.innerHTML = "Clear table"

        //PickRandom button

        const pickRandomButtonBox = document.createElement('div');  
        pickRandomButtonBox.classList.add('buttonBox');
        form.appendChild(pickRandomButtonBox);

        const kenoButtonAutoSelect = document.createElement('button');
        kenoButtonAutoSelect.classList.add('kenoButtonAutoSelect')
        kenoButtonAutoSelect.classList.add('kenoButtonAuto')
        pickRandomButtonBox.appendChild(kenoButtonAutoSelect);

        kenoButtonAutoSelect.innerHTML = "Auto pick"


        const self = this;
        riskSelekt.addEventListener('change', function(e){
            console.log(e.target.value);
            self.recalculateReturnValues(e.target.value);
        })
        






        //Button


        const buttonBox = document.createElement('div');
        const buttonBet = document.createElement('button');
        buttonBox.classList.add('buttonBox')
        buttonBet.classList.add('buttonBet')
        form.appendChild(buttonBox);
        buttonBox.appendChild(buttonBet);
        buttonBet.innerHTML = "Bet";




        kenoButtonAutoSelect.onclick = (ev) =>{
            this.clearTable()
            setTimeout(()=>{
                this.autoSelect()
            },100)
        }

        kenoButtonClear.onclick = (ev) =>{
            this.clearTable();  
        }



        buttonBet.onclick = (ev) =>{
            console.log(self.selected.length)
            if(this.selected.length > 0)
                self.initiateNewGame();
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

    drawGame(host){
        const display = document.createElement('div');
        display.classList.add('display3')
        host.appendChild(display)

        

        const kenoTilesHolder = document.createElement('div');
        kenoTilesHolder.classList.add('kenoTilesHolder');
        display.appendChild(kenoTilesHolder);


        for(let i =0;i < 40; i++){


            let kenoTileHolder = document.createElement('div');
            kenoTileHolder.classList.add("kenoTileHolder");
            kenoTilesHolder.appendChild(kenoTileHolder);
            kenoTileHolder.innerHTML = i+1;

            let kenoTileImage = document.createElement('img')
            kenoTileImage.classList.add('kenoTileImage');
            kenoTileImage.src = "./Images/Keno/star.png"
            kenoTileHolder.appendChild(kenoTileImage);

            let kenoTileButton = document.createElement('button');
            kenoTileButton.classList.add('kenoTileButton');
            kenoTileHolder.appendChild(kenoTileButton);
            kenoTileButton.innerHTML = i+1;
            this.tiles.push({button: kenoTileButton, img: kenoTileImage});
            
            self = this;


            kenoTileButton.onclick = (ev) =>{
                if(!this.selected.find(e=> e.button === kenoTileButton && e.img === kenoTileImage) && this.selected.length < 10){
                    let sound = new Audio('./Sound/Keno/kenoButtonClick1.mp3');
                    sound.volume = 0.1;
                    sound.play();
                    kenoTileButton.classList.add('kenoTileButtonSelected');
                    this.updateBars(1);
                    this.selected.push(this.tiles.find(e=> e.button === kenoTileButton && e.img == kenoTileImage));
                }
                else 
                if(this.selected.find(e=> e.button === kenoTileButton && e.img === kenoTileImage)){
                    if(this.selected.length == 10){
                        this.changeOpacity(1);
                    }

                    self.updateBars(0);
                    
                    let index = this.selected.findIndex(e => e.button === kenoTileButton && e.img === kenoTileImage);
                    if (index !== -1) {
                        this.selected.splice(index, 1);
                    }
                    kenoTileButton.classList.remove('kenoTileButtonSelected');


                }
                if(this.selected.length == 10){
                    this.changeOpacity(0);
                    console.log("pozvana metoda changeopacity")
                }
            }
        }



        const displayLower = document.createElement('div');
        displayLower.classList.add('displayLower1')
        display.appendChild(displayLower);

        const displayLower2 = document.createElement('div');
        displayLower2.classList.add('displayLower2')
        display.appendChild(displayLower2);

        let text = document.createElement('label');
        text.innerHTML="Select 1-10 numbers to play"
        displayLower2.appendChild(text);
    }

    changeOpacity(val){
        let notSelected = this.tiles.filter(e => !this.selected.find(s => s.button == e.button));
        if(val == 0){
            notSelected.forEach(e=> e.button.style.opacity='.5');
        }
        else{
            notSelected.forEach(e=> e.button.style.opacity='1');
        }
  

    }


    updateBars(val){
        const changeCount = val ? (this.selected.length === 0 ? 2 : 1) : (this.selected.length === 1 ? 2 : 1)
        for(let i = 0; i < changeCount; i++){
            this.changeChild(val ? 'add' : 'remove')
        }
        if(this.numberOfClicked == 10){

        }
    }
    
    changeChild(op){
        // console.log(this.numberOfClicked);
        let upper = this.cont.querySelector(".displayLower1");
        let lower = this.cont.querySelector(".displayLower2")
        
        if(op == 'add' && this.selected.length < 10){
            let u = document.createElement('div');
            u.classList.add('dl1')
            upper.appendChild(u);
            if(this.count==0){
                lower.replaceChildren();
            }
            
            
            let u2 = document.createElement('img');
            u2.src = "./Images/Keno/star.png"//sak
            u2.classList.add('dlImg')
            
            
            u = document.createElement('div')
            u.classList.add('dl2Txt')
            u.innerHTML = "" + this.count + "x";


            let x = document.createElement('div');
            x.classList.add('dl2');
            
            x.appendChild(u)
            x.appendChild(u2)

            lower.appendChild(x);
            
            upper.childNodes.forEach((e, index) => {
                let payout = (index / (this.selected.length+1)) * Keno.Low[index][this.selected.length];

                e.innerHTML = payout.toFixed(1);
            })

            this.count++;
        }
        else if(op == 'remove'){
            upper.childNodes.forEach((e, index) => {
                // console.log(index + "-" + this.count)
                let payout = (index / this.selected.length) * Keno.Low[index][this.selected.length-1];
                e.innerHTML = payout.toFixed(1);
            })
            upper.removeChild(upper.lastElementChild);
            lower.removeChild(lower.lastElementChild);
            this.count--;
            if(this.count==0){
                let text = document.createElement('label')
                text.innerHTML="Select 1-10 numbers to play";
                lower.appendChild(text);
            }
        }

    }

    recalculateReturnValues(val){
        let upper = this.cont.querySelector(".displayLower1");

        upper.childNodes.forEach((e, index) => {
            let payout = (index / this.selected.length) * Keno[val][index][upper.childNodes.length - 2];
            e.innerHTML = payout.toFixed(2);
        })
    }

    clearTable(){
        this.selected.forEach(m => {
            m.button.classList.remove('hidden');
            m.img.classList.remove('visible');
            m.img.classList.remove('end');
            m.button.classList.remove('end')
            m.button.setAttribute('clicked', 'false');
            m.button.classList.remove('kenoTileButtonSelected')
        })
        this.randomPicked.forEach(m=>{
            m.button.parentNode.classList.remove("borderadd");
            m.button.classList.remove('hidden');
            m.img.classList.remove('visible');
            m.button.parentNode.classList.remove("increaseFont")

        })

        this.changeOpacity(1);
        let upper = this.cont.querySelector(".displayLower1");
        let lower = this.cont.querySelector(".displayLower2")
        let text = document.createElement('label');
        text.innerHTML="Select 1-10 numbers to play"
        this.selected.length = 0;
        this.randomPicked.length = 0;
        this.numberOfHits = 0;
        this.numberOfClicked = 0;
        upper.replaceChildren();
        lower.replaceChildren();
        lower.appendChild(text);
        this.count = 0;
    }
    



    autoSelect(){
        
        if(this.selected.length == 10){
             this.selected.forEach(m => {
                 m.button.classList.remove('hidden');
                 m.img.classList.remove('visible');
                 m.img.classList.remove('end');
                 m.button.classList.remove('end')
                 m.button.setAttribute('clicked', 'false');
                 m.button.classList.remove('kenoTileButtonSelected')
             })
             this.changeOpacity(1);
             let upper = this.cont.querySelector(".displayLower1");
             let lower = this.cont.querySelector(".displayLower2")
             this.selected.length = 0;
             upper.replaceChildren();
             lower.replaceChildren();
             this.count = 0;
        }
        this.buttonState(true);
    
 
        this.pickRest().then(() => {
            this.buttonState(false); 
        });

    }

    initiateNewGame(){

        this.selected.forEach(m => {
            m.button.classList.remove('hidden');
            m.img.classList.remove('visible');
            m.img.classList.remove('end');
            m.button.classList.remove('end')
        })

        this.randomPicked.forEach(m=>{
            m.button.parentNode.classList.remove("borderadd");
            m.button.classList.remove('hidden');
            m.img.classList.remove('visible');
            m.button.parentNode.classList.remove("increaseFont")
        })
        this.randomPicked.length = 0;
        this.numberOfHits = 0;
        this.count = 0;
        this.reloadLower();

        let notSelected = this.cont.querySelectorAll('.kenoTileButton:not(.kenoTileButtonSelected)')
        notSelected.forEach( e=> e.style.opacity = '0.5');
        let amountInput = this.cont.querySelector(".amountInput").value;
        this.betAmount = parseFloat(amountInput).toFixed(2);
        this.parent.balance -= this.betAmount;




        this.buttonState(true);

        this.openTiles().then(() => {
            this.buttonState(false);
            setTimeout(()=>{

                
                console.log(this.numberOfHits);
                console.log(this.selected.length-1)
                let payout = (this.numberOfHits/this.selected.length) * Keno.Low[this.numberOfHits][this.selected.length-1]
                console.log(payout);
                this.parent.balance += payout;
            },600)
        });


    }

    openTiles(){
        let promises = [];
        for (let i = 0; i < 10; i++) {
            promises.push(
                new Promise((resolve) => {
                    setTimeout(() => {
                        this.openTile();
                        resolve();
                    }, 250 * i);
                })
            );
        }
        return Promise.all(promises);
    }


    openTile(){
        let rnd;
        do{
            rnd = Math.floor(Math.random() * 40);
        }
        while(this.randomPicked.find(obj => obj.button === this.tiles[rnd].button));
        let kenoTile = this.tiles[rnd];
        this.randomPicked.push(kenoTile);
        
        let kenoTileButton = this.tiles[rnd].button;
        let kenoTileImage = this.tiles[rnd].img;
        
        
        kenoTileButton.classList.add('animating')
        if(this.selected.find(obj => obj.button === kenoTileButton)){
            let lower = this.cont.querySelector(".displayLower2")
            setTimeout(() => {
                kenoTileButton.classList.remove('animating');
                kenoTileButton.classList.add('hidden'); // Nestani dugme
            }, 200); // Trajanje animacije rasta
            setTimeout(()=>{
                let sound = document.createElement('audio');
                sound.src = "./Sound/Keno/hit.mp3";
                sound.volume = 0.2;
                sound.play();
                kenoTileImage.classList.add('animating')
            },400);
            setTimeout(()=>{
                kenoTileImage.parentNode.classList.add("borderadd")
                kenoTileImage.classList.remove('animating')
                kenoTileImage.classList.add('visible')
                this.numberOfHits++;
                
                this.reloadLower();

                
            },600);
        }
        else{
            kenoTileButton.parentNode.classList.add("increaseFont");
            setTimeout(() => {
                kenoTileButton.classList.remove('animating');
                kenoTileButton.classList.add('hidden'); // Nestani dugme
                let sound = document.createElement('audio');
                sound.src = "./Sound/Keno/err.mp3";
                sound.playbackRate = 1.5;
                sound.volume = 0.2;
                sound.play();
            }, 200);
        }
        if(this.randomPicked.length == 10){
            
            setTimeout(()=>{
                console.log(this.randomPicked.length)
                this.tiles.forEach(t=>{
                    
                    t.button.style.opacity='1';
                })
            }, 800)
        }
    }

    reloadLower(){
        let lower = this.cont.querySelector(".displayLower2")

        lower.childNodes.forEach(e=>{
            e.childNodes[1].style.opacity="0.3"
            e.childNodes[1].classList.remove('scale')
            e.classList.remove("lighten")
        })

        lower.childNodes[this.numberOfHits].classList.add("lighten")
        lower.childNodes[this.numberOfHits].childNodes[1].style.opacity="1"
        lower.childNodes[this.numberOfHits].childNodes[1].classList.add('scale')
    }



    pickRest(){
        let promises = [];
        for (let i = 0; i < 10 - this.selected.length; i++) {
            promises.push(
                new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(`Executing pickRandom at index ${i}, time: ${performance.now()}`);

                        this.pickRandom();
                        resolve();
                    }, 80 * i);
                })
            );
        }
        return Promise.all(promises);
    }

    

    

    buttonState(v){

        let amountInput = this.cont.querySelector(".amountInput");
        let bDouble = this.cont.querySelector(".bDouble")
        let bHalf = this.cont.querySelector(".bHalf")
        let riskInput = this.cont.querySelector(".riskInput");
        let clearButton = this.cont.querySelector(".kenoButtonClear")
        let autoPickButton = this.cont.querySelector(".kenoButtonAuto")
        let buttonBet = this.cont.querySelector(".buttonBet")

        
        amountInput.disabled = v
        riskInput.disabled = v
        clearButton.disabled = v
        bDouble.disabled = v
        bHalf.disabled = v
        autoPickButton.disabled = v
        buttonBet.disabled = v

    }


    pickRandom(){

        let rnd;
        do{
            rnd = Math.floor(Math.random() * 40);
        }
        while(this.selected.find(obj => obj.button === this.tiles[rnd].button));
        
        let kenoTileButton = this.tiles[rnd].button;

        kenoTileButton.click();
    }




    endGame(result){
        
    }

    recalculateProfit(){


    }

    //
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
        logo.src="./Images/surge5.png"
        
        logoContainer.appendChild(logo);
        
        footInner.appendChild(logoContainer)




        const fairnessHolder = document.createElement('div')
        fairnessHolder.classList.add('fairnessHolder')

        let label = document.createElement('label')
        label.innerHTML = "Fairness"
        fairnessHolder.appendChild(label);



        footInner.appendChild(fairnessHolder)
    }

    drawDescription(host){

        const descriptionHolder = document.createElement('div')
        descriptionHolder.classList.add('descriptionHolder')
        host.appendChild(descriptionHolder)

        const coverAndRText = document.createElement('div');
        coverAndRText.classList.add('coverAndRText');


        const cover = document.createElement('img')
        cover.classList.add('cover')
        cover.src = './Images/KENO.png';
        coverAndRText.appendChild(cover);

        const textToTheRight = document.createElement('textToTheRight');
        textToTheRight.classList.add('textToTheRight');
        
        
        const text0 = document.createElement('span');
        text0.classList.add('text0')
        text0.innerHTML="Keno"
        textToTheRight.appendChild(text0);
        
        const text1 = document.createElement('span');
        text1.classList.add('text1')
        text1.innerHTML = "Keno is a lottery-like gambling game often played at modern casinos, and also offered as a game in some lotteries."
        textToTheRight.appendChild(text1);
        
        const text2 = document.createElement('span');
        text2.classList.add('text2')
        // text2.innerHTML="Inspired by the Japanese mechanical game known as Pachinko, Plinko provides players with the ability to customise your risk factor and multipliers ensuring this Stake Original game is suited for everyone at our online casino !"
        text2.innerHTML="The word 'Keno' has French or Latin roots, but by all accounts the game originated in China. Legend has it that Zhang Liang invented the game during the Chu-Han Contention to raise money to defend an ancient city, and its widespread popularity later helped raise funds to build the Great Wall of China. In modern China, the idea of using lotteries to fund a public institution was not accepted before the late 19th century."
        textToTheRight.appendChild(text2);
        coverAndRText.appendChild(textToTheRight);
        
        
        descriptionHolder.appendChild(coverAndRText);

        const additionalDescription = document.createElement('div');
        additionalDescription.classList.add('additionalDescription');
        descriptionHolder.appendChild(additionalDescription);

        const underText = document.createElement('span');
        underText.classList.add('underText');
        underText.innerHTML = "Chinese lottery is not documented before 1847, when the Portuguese government of Macao decided to grant a licence to lottery operators. According to some, results of keno games in great cities were sent to outlying villages and hamlets by carrier pigeons, resulting in its Chinese name 白鸽票 báigē piào, with the literal reading 'white dove tickets' in Mandarin, but in Southern varieties of Chinese spoken in Guangdong simply meaning 'pigeon tickets',[6] and pronounced baak6-gaap3-piu3 in Cantonese (on which the Western spelling 'pak-ah-pu' / 'pakapoo' was based).The Chinese played the game using sheets printed with Chinese characters, often the first 80 characters of the Thousand Character Classic, from which the winning characters were selected.[7][8] Eventually, Chinese immigrants introduced keno to the West when they sailed across the Pacific Ocean to work on construction of the First transcontinental railroad in the 19th century,[9] where the name was Westernized into boc hop bu[8] and puck-apu.[7] There were also other, earlier games called Keno, but these were played in the same way as the game now known as 'Bingo', not the modern game of Keno."

        additionalDescription.appendChild(underText);

    }

}