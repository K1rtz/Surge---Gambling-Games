export class Card{

    constructor(cardKind, text1, text2, buttonText, imageSrc, host){
        this.cardKind = cardKind;
        this.text1 = text1;
        this.text2 = text2;
        this.buttonText = buttonText;
        this.imageSrc = imageSrc;

        this.cont = null;
        this.drawCard(host);

    }


    drawCard(host){

        this.cont = document.createElement('div');
        this.cont.classList.add('slide')
        host.appendChild(this.cont)

        const slideL = document.createElement('div');
        slideL.classList.add('slideL');
        this.cont.appendChild(slideL);

        const slideR = document.createElement('div');
        slideR.classList.add('slideR');
        this.cont.appendChild(slideR);

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

        slideLI1I.innerHTML = this.cardKind;
        slideLI2.innerHTML = this.text1;
        slideLI3.innerHTML = this.text2;
        
        const slideLButton = document.createElement('button')
        slideLButton.classList.add('sButton');
        slideLButton.innerHTML = this.buttonText;

        slideLI4.appendChild(slideLButton);

        const img = document.createElement('img');
        img.src = this.imageSrc;
        img.classList.add('img')
        slideR.appendChild(img);




    }








}