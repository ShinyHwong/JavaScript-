/**
 * Created by Shine on 2017/5/6.
 */
//得到一个范围内的随机数
function randomRange(min, max) {
    var tmp = max - min;
    return Math.round(Math.random() * tmp) + min;
}

//创建类（构造函数）
function ColorBall(option) {
    this.init(option);
}
//设置原型扩展
ColorBall.prototype = {
    //初始化小球，小球的基本属性
    init: function (option) {
        var option = option || {};
        //定义小球半径
        this.r = option.r;
        //定义小球位置（圆心在鼠标中央）
        this.x = option.x - option.r * 0.5;
        this.y = option.y - option.r * 0.5;
        this.bgcolor = option.bgcolor;
        //变化范围
        this.dx = randomRange(-5, 5);
        this.dy = randomRange(-5, 5);
        this.dr = randomRange(1, 5);
        //加入数组
        ballArray.push(this);
    },
    //渲染小球
    render: function () {
        //创建小球
        var ball = document.createElement('div');
        //给小球添加样式
        ball.style.width = this.r + 'px';
        ball.style.height = this.r + 'px';
        ball.style.position = 'absolute';
        ball.style.left = this.x + 'px';
        ball.style.top = this.y + 'px';
        ball.style.backgroundColor = this.bgcolor;
        ball.style.borderRadius = '50%';
        //将小球添加到页面中
        document.body.appendChild(ball);
    },

    //小球动态变化
    update: function () {
        //小球变化
        this.x += this.dx;
        this.y += this.dy;
        this.r -= this.dr;
        //清除消失的小球
        for (var i = 0; i < ballArray.length; i++) {
            if (ballArray[i].r < 0) {
                ballArray.splice(i, 1);
            }
        }
    }
}