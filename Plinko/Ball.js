export class Ball{

    constructor(x, y, radius, value){
        this.value = value;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = 0;
        this.velocityY = 0;
        this.maxSpeed = 4;
        this.gravity = 0.05;
    }

    update(){
        this.velocityY += this.gravity;
        
        this.y += this.velocityY;
        this.x += this.velocityX;

        const damping = 0.98; // Smanjuje brzinu na svakom frame-u
        this.velocityX *= damping;
        this.velocityY *= damping;

        if (Math.abs(this.velocityX) > this.maxSpeed) this.velocityX = this.maxSpeed * Math.sign(this.velocityX);
        if (Math.abs(this.velocityY) > this.maxSpeed) this.velocityY = this.maxSpeed * Math.sign(this.velocityY);

    }

    draw(ctx){
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI*2);
        ctx.fillStyle = '#ffd52a';
        ctx.fill();
        
        ctx.closePath();
        
        ctx.beginPath();
        
        ctx.ellipse(this.x, this.y, this.radius/1.5, this.radius/1.5, 0, 0, Math.PI*2);
        ctx.fillStyle = '#ffd52a';
        ctx.fill();
        ctx.strokeStyle = '#f99f55';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.closePath();

    }




}