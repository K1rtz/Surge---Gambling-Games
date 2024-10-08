export class Keno{

    static Low = [
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
        ['z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 'z', 1000]
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

        this.buttonSound = new Audio('./kenoButtonClick1.mp3')
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
            },300)
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
            kenoTileImage.src = "./star2.png"
            kenoTileHolder.appendChild(kenoTileImage);

            let kenoTileButton = document.createElement('button');
            kenoTileButton.classList.add('kenoTileButton');
            kenoTileHolder.appendChild(kenoTileButton);
            kenoTileButton.innerHTML = i+1;
            this.tiles.push({button: kenoTileButton, img: kenoTileImage});
            
            self = this;


            kenoTileButton.onclick = (ev) =>{
                if(!this.selected.find(e=> e.button === kenoTileButton && e.img === kenoTileImage) && this.selected.length < 10){
                    let sound = new Audio('./kenoButtonClick1.mp3');
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
            
            
            let u2 = document.createElement('img');
            u2.src = "./star2.png"//sak
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
                let payout = (index / this.count) * Keno.Low[index][upper.childNodes.length - 2];
                e.innerHTML = payout.toFixed(1);
            })
            this.count++;

        }else if(op == 'remove'){
            upper.childNodes.forEach((e, index) => {
                console.log(index + "-" + this.count)
                let payout = (index / this.count) * Keno.Low[index][upper.childNodes.length - 2];
                e.innerHTML = payout.toFixed(1);
            })
            upper.removeChild(upper.lastElementChild);
            lower.removeChild(lower.lastElementChild);
            console.log(this.count)
            this.count--;
        }

    }

    recalculateReturnValues(val){
        let upper = this.cont.querySelector(".displayLower1");

        upper.childNodes.forEach((e, index) => {
            let payout = (index / this.count) * Keno[val][index][upper.childNodes.length - 2];
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
        this.selected.length = 0;
        this.randomPicked.length = 0;
        this.numberOfHits = 0;
        this.numberOfClicked = 0;
        upper.replaceChildren();
        lower.replaceChildren();
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
                sound.src = "hit.mp3";
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
                sound.src = "err.mp3";
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
    }
}