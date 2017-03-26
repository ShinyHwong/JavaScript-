/**
 * Created by Shine on 2017/3/20.
 */
window.onload = function () {
    //获取DOM
    var banner = document.querySelector('.banner');
    var imgs = document.querySelector('.bannerPic');
    var leftArrow = document.querySelector('.leftArrow');
    var rightArrow = document.querySelector('.rightArrow');

    //获取导航圆点
    var dots = document.querySelector('.bannerDot');
    var pic1 = dots.children[0];
    var pic2 = dots.children[1];
    var pic3 = dots.children[2];
    var pic4 = dots.children[3];
    var pic5 = dots.children[4];

    //导航圆点样式事件
    function clearDot(picChoose) {
        for (var i = 0; i < dots.children.length; i++) {
            dots.children[i].className = ''; //清空所有圆点样式
        }
        picChoose.className += 'current'; //为当前圆点添加样式
    }

    //导航圆点单击事件
    function picOnClick(pic, marginLeft) {
        pic.onclick = function () {
            target = marginLeft;
            clearDot(this);
        }
    }
    picOnClick(pic1, 0);
    picOnClick(pic2, -1226);
    picOnClick(pic3, -2452);
    picOnClick(pic4, -3678);
    picOnClick(pic5, -4904);

    //鼠标单机左箭头事件
    leftArrow.onclick = function () {
        target += 1226;
    };

    //鼠标单机右箭头事件
    rightArrow.onclick = function () {
        target -= 1226;
    };

    //防止鼠标点击移动时选中与拖动元素
    selectNone(leftArrow);
    selectNone(rightArrow);
    selectNone(imgs);
    imgs.ondragstart = function () {
        return false;
    };
    function selectNone(obj) {
        obj.onselectstart = function () {
            return false;
        }
    }

    //缓冲动画及无限轮播效果
    var target = 0, num = 0;
    setInterval(function () {
        //步长取整
        var step = (target - num) * 0.1;
        //向左移动取顶，向右移动取底
        var step = target - num > 0 ? Math.ceil(step) : Math.floor(step);
        num += step; //缓冲效果
        if (target > 0) {
            target = -4904; //第一张跳最后一张
        } else if (target < -4904) {
            target = 0; //最后一张跳第一张
        } else {
            imgs.style.marginLeft = num + 'px';
        }
        //导航圆点跟随图片
        switch (target) {
            case 0:
                clearDot(pic1);
                break;
            case -1226:
                clearDot(pic2);
                break;
            case -2452:
                clearDot(pic3);
                break;
            case -3678:
                clearDot(pic4);
                break;
            case -4904:
                clearDot(pic5);
                break;
        }
    }, 20);

    //自动轮播切换
    function autoPlay() {
        target -= 1226;
        if (target == 6130) {
            target = 0;
        }
    }

    //设置自动轮播定时器
    var timer = null;
    timer = setInterval(autoPlay, 5000);

    //鼠标进入时清除自动轮播
    banner.onmouseover = function () {
        clearInterval(timer);
    };
    //鼠标移出时开启自动轮播
    banner.onmouseout = function () {
        timer = setInterval(autoPlay, 5000);
    };
};