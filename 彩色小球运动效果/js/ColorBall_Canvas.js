/**
 * Created by Shine on 2017/5/6.
 */
function ColorBall(option) {
    this._init(option);
}
ColorBall.prototype = {
    constructor : ColorBall,
    //初始化属性
    _init : function (option) {
        this.r = option.r;
        this.x = option.x;
        this.y = option.y;
        this.color = option.color;
        this.dx = Math.random() * 20 - 10; //-10~10
        this.dy = Math.random() * 20 - 10; //-10~10
        this.dr = - Math.random() * 1 - 1; //-1~-2
    },
    //渲染小球
    render : function (ctx) {
            ctx.save();
            ctx.beginPath();
            //画出圆形小球
            ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
    },
    //更新小球状态
    update : function (ballArr) {
        this.x += this.dx;
        this.y += this.dy;
        this.r += this.dr;
        //在数组中清空无法看见的小球
        for (var i = 0; i < ballArr.length; i++) {
            if (ballArr[i].r < 0) {
                ballArr.splice(i,1);
            }
        }
    }
};