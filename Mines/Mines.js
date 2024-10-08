export class Mines{

    constructor(parent){
        this.cont = null;
        this.betAmount = 1.00;
        this.numberOfMines = 1;
        this.mines = [];
        this.values = [];
        this.active;
        this.currentProfit = 0.00;
        this.multiplier = 1.00;
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


        //Mines

        const rowsHolder = document.createElement('div');
        const rowsText = document.createElement('div')
        const rowsSelekt = document.createElement('select')

        form.appendChild(rowsHolder);

        rowsHolder.appendChild(rowsText)
        rowsHolder.appendChild(rowsSelekt)
        rowsText.innerHTML = "Mines";
        rowsText.classList.add('betAmountText')
        rowsHolder.classList.add('riskHolder')
        rowsSelekt.classList.add('riskInput')

        let op;
        for(let i = 1; i < 25; i++){
            op = document.createElement('option');
            op.innerHTML = i;
            rowsSelekt.appendChild(op);
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

        //PickRandom button

        const pickRandomButtonBox = document.createElement('div');
        pickRandomButtonBox.classList.add('buttonBox');
        form.appendChild(pickRandomButtonBox);

        const pickRandomButton = document.createElement('button');
        pickRandomButton.classList.add('buttonPickRandom')
        pickRandomButtonBox.appendChild(pickRandomButton);

        pickRandomButton.innerHTML = "Pick random field"






        const self = this;
        rowsSelekt.addEventListener('change', function(e){
            const numberOfMines = parseInt(e.target.value, 10);
            //Samo kada je trenutna igra okoncana
            //Tj kada nema loptica na ekranu
            //Potencijalno samo disable selekt element dok je igra aktivna
            //crtaj 
            //self.drawGame(host, rows);
            //self.calculateMineValues(numberOfMines);
            self.numberOfMines = numberOfMines;
        })
        






        //Button


        const buttonBox = document.createElement('div');
        const buttonBet = document.createElement('button');
        buttonBox.classList.add('buttonBox')
        buttonBet.classList.add('buttonBet')
        form.appendChild(buttonBox);
        buttonBox.appendChild(buttonBet);
        buttonBet.innerHTML = "Bet";



        

        pickRandomButton.onclick = (ev) =>{
            let covered = this.cont.querySelectorAll('.mineButton[clicked="false"]');
            if(covered.length!=0){
                let rnd = Math.floor(Math.random() * covered.length);
                console.log(rnd);
                covered[rnd].click();
            }
            
        }




        buttonBet.onclick = (ev) =>{ self.active ? this.endGame(true) : this.initiateNewGame()}

        

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
        display.classList.add('display2')
        host.appendChild(display)

        const minesHolder = document.createElement('div');
        minesHolder.classList.add('minesHolder');
        display.appendChild(minesHolder);

        for(let i =0;i < 25; i++){


            let mineHolder = document.createElement('div');
            mineHolder.classList.add("mineHolder");
            minesHolder.appendChild(mineHolder);

            let mineImage = document.createElement('img')
            mineImage.classList.add('mineImage')
            mineImage.src = "sak.png"
            mineHolder.appendChild(mineImage);

            let mineButton = document.createElement('button');
            mineButton.num = i;
            mineButton.classList.add('mineButton');
            mineHolder.appendChild(mineButton);

            this.mines.push({button: mineButton, img: mineImage});

            self = this;

            mineButton.setAttribute('clicked', 'true');
            mineButton.onclick = (ev)=>{
                if(mineButton.getAttribute('clicked') === 'false'){
                    mineButton.setAttribute('clicked', 'true');
                    
                    if(this.values[mineButton.num]==0){
                        this.mines[mineButton.num].img.src="123.png";
                        self.endGame(false);
                    }else{
                        this.mines[mineButton.num].img.src="sak.png";
                        self.recalculateProfit();
                    }
                    
                                      
                    mineButton.classList.add('animating')
                    setTimeout(() => {
                    mineButton.classList.remove('animating');
                    mineButton.classList.add('hidden'); // Nestani dugme
                     }, 200); // Trajanje animacije rasta
                    setTimeout(()=>{
                        mineImage.classList.add('animating')
                    },400);
                    setTimeout(()=>{
                        mineImage.classList.remove('animating')
                        mineImage.classList.add('visible')
                    },600);
                }
            }
        }
    }

    resetMines(){
        this.mines.forEach(m => {
            m.button.classList.remove('hidden');
            m.img.classList.remove('visible');
            m.img.classList.remove('end');
            m.button.classList.remove('end')
            m.button.setAttribute('clicked', 'false');
        })
    }

    calculateMineValues(numberOfMines){
        this.values.length = 0;

        for(let x = 0; x < 25; x++){
            this.values.push(1);
        }
        let currMinesCount = 0;
        while(currMinesCount != numberOfMines){
            let rnd = Math.floor(Math.random() * 25);
            if(this.values[rnd] === 1){
                this.values[rnd] = 0;
                currMinesCount++;
            }
        }
        console.log(this.values);
    }

    initiateNewGame(){
        this.active = true;
        let wager = parseFloat(this.cont.querySelector('.amountInput').value);
        this.currentProfit = wager;

        this.parent.balance -= wager;

        this.resetMines();
        this.calculateMineValues(this.numberOfMines);

        let profitDisplay = this.cont.querySelector('.totalProfitDisplayHolder');
        profitDisplay.style.display = 'inline'
        
        let randomButton = this.cont.querySelector('.buttonPickRandom');
        randomButton.style.display = 'inline'

        let rowsSelekt = this.cont.querySelector('.riskInput')
        let amountInput = this.cont.querySelector('.amountInput')
        let bHalf = this.cont.querySelector('.bHalf')
        let bDouble = this.cont.querySelector('.bDouble')

        rowsSelekt.disabled = true;
        amountInput.disabled = true;
        bHalf.disabled = true;
        bDouble.disabled = true;

        let totalProfitDisplay = this.cont.querySelector(".totalProfitDisplay");
        totalProfitDisplay.innerHTML = parseFloat(this.currentProfit).toFixed(2);
        
        let totalProfitText = this.cont.querySelector(".totalProfitText");
        totalProfitText.innerHTML = "Total profit [" + (this.multiplier).toFixed(2) + "x]";


        let buttonBet = this.cont.querySelector(".buttonBet");
        buttonBet.innerHTML = "Cashout"

    }

    endGame(result){
        this.active = false;
        if(result){
            this.parent.balance += this.currentProfit;
            this.resetMines();
            this.mines.forEach(m =>{
                m.button.setAttribute('clicked', 'true');
            })
        }
        else{
            //prikazi neoktrivena polja korisniku 
            this.mines.forEach(m =>{
                if(this.values[m.button.num] == 0){
                    m.img.src="123.png";
                }
                else{
                    m.img.src="sak.png";
                }
                m.button.setAttribute('clicked', 'true');
                m.img.classList.add('end');
                m.button.classList.add('end')
            })
        }   

        //Ova dva dugmeta treba da nestanu jer igra vise nije aktivna
        let totalProfitDisplayHolder = this.cont.querySelector('.totalProfitDisplayHolder')
        totalProfitDisplayHolder.style.display = 'none';
        
        let pickRandomButton = this.cont.querySelector('.buttonPickRandom')
        pickRandomButton.style.display = 'none';
        
        
        //Treba omoguciti izmene za narednu igru
        let rowsSelekt = this.cont.querySelector('.riskInput')
        let amountInput = this.cont.querySelector('.amountInput')
        let bHalf = this.cont.querySelector('.bHalf')
        let bDouble = this.cont.querySelector('.bDouble')

        rowsSelekt.disabled = false;
        amountInput.disabled = false;
        bHalf.disabled = false;
        bDouble.disabled = false;

        //setujemo gamestate na neaktivno
        this.active = false;

        //Menjamo tekst u dugmetu na Bet
        const buttonBet = this.cont.querySelector(".buttonBet");
        buttonBet.innerHTML = "Bet"

        //Resetujemo currnetProfit i multiplier nakon igre
        this.currentProfit = 0.00;
        this.multiplier =  1.00;
    }

    recalculateProfit(){
        let covered = this.cont.querySelectorAll('.mineButton[clicked="false"]');
        this.currentProfit *= (covered.length + 1) / (covered.length + 1 - this.numberOfMines);
        this.multiplier *=(covered.length + 1) / (covered.length + 1 - this.numberOfMines);
        console.log(this.multiplier);
        console.log(this.currentProfit);

        let totalProfitDisplay = this.cont.querySelector(".totalProfitDisplay");
        console.log(this.currentProfit);
        totalProfitDisplay.innerHTML = this.currentProfit.toFixed(2);

        let totalProfitText = this.cont.querySelector(".totalProfitText");
        totalProfitText.innerHTML = "Total profit [" + (this.multiplier).toFixed(2) + "x]";
    }

    //
    drawFoot(host){
        const gameFoot = document.createElement('div');
        gameFoot.classList.add('gameFoot')
        host.appendChild(gameFoot);
    }
}