/** @type {typeof document.createElement} */
const _ = document.createElement.bind(document);
import { Plinko } from "./Plinko/Plinko.js";
import { Mines } from "./Mines/Mines.js";
import { Keno } from "./Keno/Keno.js";

export class HomePage{

    constructor(){
        this.drawHeader();
        this.slides = [];
        this.mBody = null;
        this.currentGame;
        this._balance = 1000;
        this.mainPageActive = true;
        this.allGames =['keno', 'plinko', 'mines']
    }
    
    //Wallet 
    get balance(){
        return this._balance;
    }
    set balance(value){
        if(value < 0){
            console.log("Ne moze se dodati negativna vrednost na balans")
        }
        else{
            this._balance = value;
            this.updateWalletAmount();
        }
    }
    reduceBalance(value){
        if(this._balance >= value){
            this._balance -= value;
            this.updateWalletAmount();
            return true;
        }   
        else{
            console.log("Nemate dovoljno para!")
            return false;
        }
    }
    updateWalletAmount(){
        let walletAmount = document.body.querySelector(".walletAmount");
        walletAmount.innerHTML = this._balance.toFixed(2) + "$";
    }


    //Header
    drawHeader(){
        const head = _("header");
        document.body.appendChild(head);

        const headHolder = document.createElement('div');
        headHolder.classList.add('headHolder');
        head.appendChild(headHolder);

        const logo = document.createElement('img');
        logo.src = "./Images/surge5.png";
        logo.classList.add('logo')
        headHolder.appendChild(logo);
        
        const walletHolder = document.createElement('div');
        walletHolder.classList.add('walletHolder')
        headHolder.appendChild(walletHolder)

        const walletAmount = document.createElement('div');
        const walletName = document.createElement('div')
        walletAmount.classList.add('walletAmount')
        walletName.classList.add('walletName')

        walletAmount.innerHTML = "1,000$"
        walletName.innerHTML = "Wallet"

        walletHolder.appendChild(walletName)
        walletHolder.appendChild(walletAmount)
        
        this.mBody = document.createElement('div')
        this.mBody.classList.add("mBody");
        document.body.appendChild(this.mBody);


        logo.onclick = () =>{
            const x = document.body.querySelector(".mBody")
            x.replaceChildren()
            this.mainPageActive = true;
            this.drawInitialPage(x)
            const headerHolder = document.querySelector('.headHolder')
            headerHolder.style.maxWidth = '1300px'
        }
        this.drawInitialPage(this.mBody);
    }
    //Body
    drawInitialPage(host){
        this.drawSearch(host);
        this.drawSlider(host);
        const categories = ['All Games', 'Originals', 'Slots'];
        categories.forEach(category => {
            this.drawGames(host, category);
        });
    }

    drawCard(cardKind, text1, text2, buttonText, imageSrc, host){
        const cont = document.createElement('div');
        cont.classList.add('slide')
        host.appendChild(cont)

        const slideL = document.createElement('div');
        slideL.classList.add('slideL');
        cont.appendChild(slideL);

        const slideR = document.createElement('div');
        slideR.classList.add('slideR');
        cont.appendChild(slideR);

        const slideLI = document.createElement('div');
        slideLI.classList.add('slideLI');
        slideL.appendChild(slideLI);

        const slideLI1 = document.createElement('div');
        const slideLI2 = document.createElement('div');
        const slideLI3 = document.createElement('div');
        const slideLI4 = document.createElement('div');

        slideLI4.classList.add('slideLI4');
        slideLI3.classList.add('slideLI3');
        slideLI2.classList.add('slideLI2');
        slideLI1.classList.add('slideLI1');

        slideLI.appendChild(slideLI1)
        slideLI.appendChild(slideLI2)
        slideLI.appendChild(slideLI3)
        slideLI.appendChild(slideLI4)

        const slideLI1I = document.createElement('div')
        slideLI1I.classList.add('slideLI1I');
        slideLI1.appendChild(slideLI1I);

        slideLI1I.innerHTML = cardKind;
        slideLI2.innerHTML = text1;
        slideLI3.innerHTML = text2;
        
        const slideLButton = document.createElement('button')
        slideLButton.classList.add('sButton');
        slideLButton.innerHTML = buttonText;

        slideLI4.appendChild(slideLButton);

        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('img')
        slideR.appendChild(img);
    }

    drawSlider(host){

        var slider = _('div');
        var sliderWrapper = _('div');
        
        slider.className="slider"
        sliderWrapper.className = "sliderWrapper"
        
        const cards = [
            {title: 'Promo', game: 'Poker', desc: 'Cash games now live!', buttonText: 'Play now!', image: './Images/crown.png' },
            {title: 'Promo', game: 'Roulette', desc: 'Cash games now live!', buttonText: 'Learn more!', image: './Images/chip.png' },
            {title: 'Promo', game: 'Slots', desc: 'Cash games now live!', buttonText: 'Play now!', image: './Images/money.png' },
            {title: 'Promo', game: 'Poker', desc: 'Cash games now live!', buttonText: 'Play now!', image: './Images/crown.png' },
            {title: 'Promo', game: 'Roulette', desc: 'Cash games now live!', buttonText: 'Learn more!', image: './Images/chip.png' },
            {title: 'Promo', game: 'Slots', desc: 'Cash games now live!', buttonText: 'Play now!', image: './Images/money.png' },

        ]

        cards.forEach(card =>{
            this.drawCard(card.title, card.game, card.desc, card.buttonText, card.image, sliderWrapper);
        })


        var buttonLeft = _("button");
        var buttonRight = _("button");

        buttonLeft.classList.add('btn', 'buttonLeft');
        buttonRight.classList.add('btn', 'buttonRight', 'showable');

        buttonLeft.innerHTML="<";
        buttonRight.innerHTML = ">"

        slider.appendChild(buttonLeft);
        slider.appendChild(sliderWrapper);
        slider.appendChild(buttonRight)

        host.appendChild(slider);

        const firstCard = sliderWrapper.querySelector(".slide");
        const firstCardWidth = firstCard.offsetWidth;
        console.log(firstCardWidth);

        sliderWrapper.addEventListener('scroll', ()=>{
            const scrollPosition = sliderWrapper.scrollLeft;
            const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;
            const scrollPercent = (scrollPosition / maxScroll) * 100;
            
            if (scrollPercent <= 5) {
                buttonLeft.classList.remove('showable')
            } else if (scrollPercent >= 95) {
                buttonRight.classList.remove('showable')
            }else{
                buttonLeft.classList.add('showable')
                buttonRight.classList.add('showable')
            }

        })
        //Pomeranje slajdera levo desno
        buttonRight.addEventListener('click', () => {
            sliderWrapper.scrollLeft += firstCardWidth;
        });
        buttonLeft.addEventListener('click', () => {
           sliderWrapper.scrollLeft -= firstCardWidth;
        });
    }

    drawSearch(host){
        const searchBarHolder = document.createElement('div');
        searchBarHolder.classList.add('searchBarHolder')
        host.appendChild(searchBarHolder);

            const searchBar = document.createElement('div');
            searchBar.classList.add("searchBar");
            searchBarHolder.appendChild(searchBar);

            const searchBarInner = document.createElement('div');
            searchBarInner.classList.add('searchBarInner');
            searchBar.appendChild(searchBarInner);

                const searchRow = document.createElement('div');
                searchRow.classList.add('row');
                searchBarInner.appendChild(searchRow);

                    const input = document.createElement('input')
                    input.type = 'text';
                    input.placeholder = "Search Anything";
                    input.autocomplete="off";
                    input.classList.add('input-box')
                    searchRow.appendChild(input);
            
                    const searchButton = document.createElement('button');
                    searchButton.classList.add('buttonSearch')

                    const iconElement = document.createElement("i");
                    iconElement.classList.add("fa-solid", "fa-magnifying-glass");
                    searchButton.appendChild(iconElement);

                    searchRow.appendChild(searchButton);

                const resultBox = document.createElement('div');
                resultBox.classList.add('result-box');
                searchBar.appendChild(resultBox);

                const resultBoxText = document.createElement('label');
                resultBoxText.classList.add('resultBoxText')
                resultBoxText.innerHTML = "Results"
                resultBox.appendChild(resultBoxText);



                const resultBoxGames = document.createElement('div');
                resultBoxGames.classList.add('result-box-games')
                resultBox.appendChild(resultBoxGames);

                const testing = document.createElement('div')
                testing.classList.add('testing')
                resultBox.appendChild(testing)

                const self = this;

                // input.onkeyup = function(){
                input.oninput = function(){

                    let result = [];
                    let inp = input.value;
                    if(inp.length){
                        result = self.allGames.filter((keyword)=>{
                            return keyword.toLowerCase().includes(inp.toLowerCase());
                        });
                        console.log(result);
                    }
                    self.displayResult(result);
                }



                input.addEventListener("focus", ()=>{                    
                    // self.allGames.forEach(game=>{
                    //     self.displejGame(game);
                    // });
                    // let gameHolder = document.querySelector('.result-box-games');
                    // this.displejGame('Plinko', gameHolder);
                    // console.log(self.displejGame('Plinko'));
                    // const games = Array.from(gameHolder.children);
                    // games.forEach(e=>{
                    //     console.log(e.getAttribute('name'));
                    // }
                    // )
                    // console.log(gameHolder.children.forEach(e=>console.log(e.name)))
                    resultBox.style.display = "flex";
                    console.log("bluruj")
                    let elements = document.querySelectorAll('.gameSliderHolder, .slider');
                    console.log(elements);
                    document.body.style.overflow = 'hidden';
                    elements.forEach(element => {
                        element.style.filter = 'blur(2px) opacity(0.1)'
                    });
                });


                document.addEventListener("click", (event) => {
                    if(this.mainPageActive){

                        if (!event.target.closest(".frontCover") && !event.target.closest(".frontkaver")) {
                            
                            let element1 = document.querySelector('.result-box');
                            let element2 = document.querySelector('.searchBarHolder');
                            
                            let games = document.querySelectorAll('.frontCover')
                            
                            
                            if (!element1.contains(event.target) && !element2.contains(event.target))  {
                                resultBox.style.display = "none";
                                console.log("klensuj")
                                let elements = document.querySelectorAll('.gameSliderHolder, .slider');
                                document.body.style.overflow = 'auto';
                                console.log(elements);
                                elements.forEach(element => {
                                    element.style.filter = 'blur(0px) opacity(1)'
                                });
                            }
                        }
                    }
                    });
                    

                
    }


    displayResult(result){
        //u result se nalaze one koje bi trebalo da budu prikazane

        console.log('RESULTS:' + result);
        const resultBoxGames = document.querySelector('.result-box-games')

            let currentGamesHolders = Array.from(resultBoxGames.children);
            let currentGameNames = [];
            currentGamesHolders.forEach(game=>{
                // console.log(game.getAttribute('name'));
                currentGameNames.push(game.getAttribute('name'));
            }
        )
        currentGamesHolders.forEach(cgh=>{
            if(!result.includes(cgh.getAttribute('name'))){
                cgh.parentNode.removeChild(cgh);
            }
        })
        result.forEach(game=>{
            if(!currentGameNames.includes(game)){
                this.displejGame(game, resultBoxGames);
            }
        })


        if(!result.length){
            let element = document.querySelector('.testing');
            element.style.boxShadow = "2px 0px 15px 3px #0d2d76";
            let element2 = document.querySelector('.result-box-games');
            element2.classList.remove("maxHeight")

            
        }else{
            let element = document.querySelector('.testing');
            element.style.boxShadow = "2px 0px 95px 3px #0d2d76";
            let element2 = document.querySelector('.result-box-games');
            element2.classList.add("maxHeight")
            let elementos = document.querySelectorAll('.frontkaver');
            setTimeout(()=>{elementos.forEach(e=>{
                e.classList.add('frontkaverExpand');
            }, 1)});


        }
    }

    displejGame(game , rbg){
        
        console.log("Pozvano display game:" + game)
        let g = document.createElement('div');
        g.classList.add('game1');
        console.log(game + rbg)
        rbg.appendChild(g);
        document.body.style.overflow = 'auto';
        const self = this;
        const pc = document.createElement('img');
        pc.classList.add('frontkaver');
        switch(game){
            case "plinko":
                pc.src = "./Images/PACHINKO.png"
                g.setAttribute('name', 'plinko')
                pc.onclick = (ev) => {
                    self.mainPageActive = false;
                    self.drawPlinko();
                }
                break;
            case "keno":
                pc.src = "./Images/KENO.png"
                g.setAttribute('name', 'keno')
                pc.onclick = (ev) => {
                    self.mainPageActive = false;
                    self.drawKeno();
                    
                }
                break;
                case "mines":
                g.setAttribute('name', 'mines')
                pc.src = "./Images/MINES.png"
                    pc.onclick = (ev) => {
                        self.mainPageActive = false;
                        self.drawMines();
                    }
                break;
            default:
                break;
        }

        g.appendChild(pc);
    }
    drawGames(host, name){

        const gameSliderHolder = document.createElement('div')
        gameSliderHolder.classList.add('gameSliderHolder')
        host.appendChild(gameSliderHolder)

        const sliderTitle = document.createElement('label')
        sliderTitle.classList.add('sliderTitle')
        sliderTitle.innerHTML= name;
        gameSliderHolder.appendChild(sliderTitle);


        const gameSlider = document.createElement('div');
        gameSlider.classList.add('gameSlider')
        gameSliderHolder.appendChild(gameSlider);

        const game1 = document.createElement('div');
        game1.classList.add('game1')
        gameSlider.appendChild(game1);

        let self = this;
        game1.onclick = (ev) =>{
            self.mainPageActive = false;
            self.drawPlinko();
        }

        const plinkoCover = document.createElement('img');
        plinkoCover.classList.add('frontCover');
        plinkoCover.src = "./Images/PACHINKO.png"
        game1.appendChild(plinkoCover);

        const game2 = document.createElement('div');
        game2.classList.add('game2')
        gameSlider.appendChild(game2);

        game2.onclick = (ev) =>{
            self.mainPageActive = false;
            self.drawMines();
        }

        
        
        const plinkoCover2 = document.createElement('img');
        plinkoCover2.classList.add('frontCover');
        plinkoCover2.src = "./Images/MINES.png"
        game2.appendChild(plinkoCover2);

        
        var game3 = document.createElement('div');
        game3.classList.add('game1')
        gameSlider.appendChild(game3);

        
        game3.onclick = (ev) =>{
            self.mainPageActive = false;
            self.drawKeno();
        }

        const kenoCover = document.createElement('img');
        kenoCover.classList.add('frontCover');
        kenoCover.src = "./Images/KENO.png"
        game3.appendChild(kenoCover);

    }

    drawPlinko(){
        var x = document.body.querySelector(".mBody")
        x.replaceChildren();
        this.currentGame = new Plinko(this);
        this.currentGame.drawEverything(x);
        this.updateHeadHolder()

    }

    drawMines(){
        var x = document.body.querySelector(".mBody")
        x.replaceChildren();
        this.currentGame = new Mines(this);
        this.currentGame.drawEverything(x);
        this.updateHeadHolder()

    }

    drawKeno(){
        var x = document.body.querySelector(".mBody")
        x.replaceChildren();
        this.currentGame = new Keno(this);
        this.currentGame.drawEverything(x);
        this.updateHeadHolder()
    }

    updateHeadHolder(){
        const hh = document.querySelector('.headHolder')
        hh.style.maxWidth = '1200px'
    }


}