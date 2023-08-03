class Paddle {
    constructor(x, y, l, w, c) {
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.l = l;
        this.w = w;
        this.c = c;
    }

    draw(ctx) {
        ctx.fillStyle = this.c;
        ctx.strokeStyle = "black";

        ctx.fillRect(this.x, this.y, this.w, this.l);
        ctx.strokeRect(this.x, this.y, this.w, this.l);

        
    }

    move() {
        let newY = this.y + this.vy;

        if (newY < 0) return;
        if (newY + this.l > boardHeight) return;


        this.y = newY;
    }

    moveCPU(ball) {
        let cpv = Math.abs(ball.vy)
        if (cpv > 3){
            cpv = 3
        }
        if (this.y + this.l/2 - 20 <  ball.y){
            this.vy = cpv;
        }
        if (this.y + this.l/2 + 20 > ball.y){
            this.vy = -cpv
        }

        this.move();
    }
    
}