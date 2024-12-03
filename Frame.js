/** @type {typeof document.createElement} */
const _ = document.createElement.bind(document);
import { Plinko } from "./Plinko/Plinko.js";
import { Mines } from "./Mines/Mines.js";
import { Keno } from "./Keno/Keno.js";
export class Frame{

    constructor(){
        this.drawHeader();
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
        logo.src = "./Images/surge5.png";
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

        walletHolder.appendChild(walletName)
        walletHolder.appendChild(walletAmount)
        
        this.mBody = document.createElement('div')
        this.mBody.classList.add("mBody");
        document.body.appendChild(this.mBody);


        let self = this;
        // console.log(this.mBody)
        logo.onclick = (ev) =>{
            let x = document.body.querySelector(".mBody")
            x.replaceChildren()
            self.drawInitialPage(x)
            const hh = document.querySelector('.headHolder')
            hh.style.maxWidth = '1300px'
        }


        this.drawInitialPage(this.mBody);
        //const mines = new Plinko(this);
        //mines.drawEverything(this.mBody);


    }

    drawInitialPage(host){
        this.drawSlider(host);
        this.drawGames(host);
        // this.drawSlots(host);
        // this.drawTBASection(host)
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

        
        // const c1 = new Card('Promo', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c2 = new Card('Promo', 'Casino', 'Cash games now live!', 'Learn More!', 'chip.png', sliderWrapper);
        // const c3 = new Card('Promo', 'Poker', 'Cash games now live!', 'Learn More!', 'money.png', sliderWrapper);
        // const c4 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c5 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c6 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c7 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c8 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        // const c9 = new Card('Promotion', 'Poker', 'Cash games now live!', 'Play now!', 'crown.png', sliderWrapper);
        
        this.drawCard('Promo', 'Poker', 'Cash games now live!', 'Play now!', './Images/crown.png', sliderWrapper)
        this.drawCard('Promo', 'Poker', 'Cash games now live!', 'Learn More!', './Images/chip.png', sliderWrapper)
        this.drawCard('Promo', 'Poker', 'Cash games now live!', 'Learn More!', './Images/money.png', sliderWrapper)
        for(let i = 0; i < 6; i++){
            this.drawCard('Promo', 'Poker', 'Cash games now live!', 'Play now!', './Images/crown.png', sliderWrapper)
        }


        
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

        const sliderTitle = document.createElement('label')
        sliderTitle.classList.add('sliderTitle')
        sliderTitle.innerHTML="Games"
        gameSliderHolder.appendChild(sliderTitle);


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
        plinkoCover.src = "./Images/PACHINKO.png"
        game1.appendChild(plinkoCover);

        const game2 = document.createElement('div');
        game2.classList.add('game2')
        gameSlider.appendChild(game2);

        game2.onclick = (ev) =>{
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
            self.drawKeno();
        }

        

        const kenoCover = document.createElement('img');
        kenoCover.classList.add('frontCover');
        kenoCover.src = "./Images/KENO.png"
        game3.appendChild(kenoCover);

    }

    drawSlots(host){
        const gameSliderHolder = document.createElement('div')
        gameSliderHolder.classList.add('gameSliderHolder')
        host.appendChild(gameSliderHolder)

        const sliderTitle = document.createElement('label')
        sliderTitle.classList.add('sliderTitle')
        sliderTitle.innerHTML="Slots"
        gameSliderHolder.appendChild(sliderTitle);


        const gameSlider = document.createElement('div');
        gameSlider.classList.add('gameSlider')
        gameSliderHolder.appendChild(gameSlider);

        const textTitle = document.createElement('label')
        textTitle.classList.add('tt')
        textTitle.innerHTML = "TO BE IMPLEMENTED"
        gameSliderHolder.appendChild(textTitle)


    }

    drawTBASection(host){
        const tbdDiv = document.createElement('div')
        tbdDiv.classList.add('tbdDiv')
        host.appendChild(tbdDiv)

        const textTitle = document.createElement('label')
        textTitle.classList.add('tt')
        textTitle.innerHTML = "TO BE IMPLEMENTED"
        tbdDiv.appendChild(textTitle)
        
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