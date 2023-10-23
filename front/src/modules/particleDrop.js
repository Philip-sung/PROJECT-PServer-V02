{
    var CreateRandomNumberBetween_1 = function (min, max) {
        return (Math.random() * (max - min) + min);
    };
    var canvas = document.querySelector('canvas');
    var ctx_1 = canvas.getContext('2d');
    var dpr = window.devicePixelRatio;
    var canvasWidth_1 = window.innerWidth || document.body.clientWidth;
    var canvasHeight_1 = window.innerHeight || document.body.clientHeight;
    canvas.width = canvasWidth_1 * dpr;
    canvas.height = canvasHeight_1 * dpr;
    canvas.style.width = canvasWidth_1 + 'px';
    canvas.style.height = canvasHeight_1 + 'px';
    ctx_1.scale(dpr, dpr);
    var Particle = /** @class */ (function () {
        function Particle(x, y, r, yVelocity) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.yVelocity = yVelocity;
        }
        Particle.prototype.draw = function () {
            if (ctx_1) {
                ctx_1.beginPath();
                ctx_1.arc(this.x, this.y, this.r, 0, Math.PI / 180 * 360);
                ctx_1.fillStyle = 'white';
                ctx_1.fill();
                ctx_1.closePath();
            }
        };
        Particle.prototype.AdoptGravity = function () {
            this.y += this.yVelocity;
            this.yVelocity *= 0.9975;
        };
        Particle.prototype.DrawUp = function () {
            if (this.y > canvasHeight_1 + this.r) {
                this.y = -this.r;
                this.yVelocity = CreateRandomNumberBetween_1(4, 10);
            }
        };
        return Particle;
    }());
    var particles_1 = [];
    for (var i = 0; i < 500; i++) {
        var particle = new Particle(CreateRandomNumberBetween_1(1, canvasWidth_1), CreateRandomNumberBetween_1(1, canvasHeight_1), CreateRandomNumberBetween_1(1, 10), CreateRandomNumberBetween_1(8, 20));
        particles_1.push(particle);
    }
    var updatedTime_1 = Date.now();
    var interval_1 = 1000 / 60;
    function DrawSnow() {
        window.requestAnimationFrame(DrawSnow);
        var curTime = Date.now();
        var deltaTime = curTime - updatedTime_1;
        if (deltaTime < interval_1) {
            console.log(deltaTime);
            return;
        }
        else if (deltaTime > interval_1) {
            ctx_1 === null || ctx_1 === void 0 ? void 0 : ctx_1.clearRect(0, 0, canvasWidth_1, canvasHeight_1);
            particles_1.forEach(function (particle) {
                particle.AdoptGravity();
                particle.DrawUp();
                particle.draw();
            });
            updatedTime_1 = curTime;
        }
    }
    DrawSnow();
}
