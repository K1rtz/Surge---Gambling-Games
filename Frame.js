/** @type {typeof document.createElement} */
const _ = document.createElement.bind(document);
import { Card } from "./Card.js";
import { Plinko } from "./Plinko/Plinko.js";
import { Mines } from "./Mines/Mines.js";
import { Keno } from "./Keno/Keno.js";
export class Frame{

    constructor(){
        this.drawHeader();
        // this.drawTesting();
        this.slides = [];
        this.mBody = null;
        this.currentGame;
        this._balance = 1000;
    }
    
    get balance(){
        return this._balance;
    }

    set balance(value){
        this._balance = value;
        let walletAmount = document.body.querySelector(".walletAmount");
        walletAmount.innerHTML = "" + value.toFixed(2) + "$";
    }







    drawHeader(){
        const head = _("header");
        document.body.appendChild(head);

        const headHolder = document.createElement('div');
        headHolder.classList.add('headHolder');
        head.appendChild(headHolder);



        const logo = document.createElement('img');
        logo.src = "./surge5.png";
        logo.classList.add('logo')
        logo.width = 110;
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

        walletHolder.appendChild(walletAmount)
        walletHolder.appendChild(walletName)
        
        this.mBody = document.createElement('div')
        this.mBody.classList.add("mBody");
        document.body.appendChild(this.mBody);


        let self = this;
        // console.log(this.mBody)
        logo.onclick = (ev) =>{
            let x = document.body.querySelector(".mBody")
            x.replaceChildren()
            self.drawInitialPage(x)
        }



        const mines = new Mines(this);
        mines.drawEverything(this.mBody);


        // this.drawPlinko(this.mBody);    



        // this.drawInitialPage(this.mBody);

    }

    drawInitialPage(host){
        this.drawSlider(host);
        this.drawGames(host);
    }




    drawSlider(host){

        var slider = _('div');
        var sliderWrapper = _('div');
        
        slider.className="slider"
        sliderWrapper.className = "sliderWrapper"

        
        const c1 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c2 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c3 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c4 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c5 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c6 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c7 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c8 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        const c9 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'sscrown3.png', sliderWrapper);
        
        
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

        //Sakrivanje strelica ako je skrol pri kraju
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
        const searchBarHolder =document.createElement('div');
        searchBarHolder.classList.add('searchBarHolder')
        host.appendChild(searchBarHolder);

        const searchBar = document.createElement('div');
        searchBar.classList.add("searchBar");
        searchBarHolder.appendChild(searchBar);
    }
    drawGames(host){

        const gameSliderHolder = document.createElement('div')
        gameSliderHolder.classList.add('gameSliderHolder')
        host.appendChild(gameSliderHolder)

        const gameSlider = document.createElement('div');
        gameSlider.classList.add('gameSlider')
        gameSliderHolder.appendChild(gameSlider);

        const game1 = document.createElement('div');
        game1.classList.add('game1')
        gameSlider.appendChild(game1);

        let self = this;
        game1.onclick = (ev) =>{
            self.drawPlinko();
        }

        const plinkoCover = document.createElement('img');
        plinkoCover.classList.add('frontCover');
        plinkoCover.src = "PlinkoCover2.png"
        game1.appendChild(plinkoCover);

        const game2 = document.createElement('div');
        game2.classList.add('game2')
        gameSlider.appendChild(game2);
        
        
        const plinkoCover2 = document.createElement('img');
        plinkoCover2.classList.add('frontCover');
        plinkoCover2.src = "PlinkoCover2.png"
        game2.appendChild(plinkoCover2);

        
        var plinkoCover3 = document.createElement('img');
        plinkoCover3.classList.add('frontCover');
        plinkoCover3.src = "PlinkoCover2.png"
        game2.appendChild(plinkoCover2);

        var game3 = document.createElement('div');
        gameSlider.appendChild(game3);
        game3.appendChild(plinkoCover3)


        for(let i = 0; i< 20; i++){

            plinkoCover3 = document.createElement('img');
            plinkoCover3.classList.add('frontCover');
            plinkoCover3.src = "PlinkoCover2.png"
            

            game3 = document.createElement('div');
            gameSlider.appendChild(game3);
            game3.appendChild(plinkoCover3)

        }

        
    }

    drawPlinko(){
        var x = document.body.querySelector(".mBody")
        x.replaceChildren();
        this.currentGame = new Plinko();
        this.currentGame.drawEverything(x);
    }



}