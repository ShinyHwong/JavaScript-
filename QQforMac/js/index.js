$(function () {
    var index = 0;
    var timer = null;
    var max = $('section').length - 1;

    $('header').hide(); //首屏隐藏header

    //点击指示器事件
    $('.indicator li').on('click', function () {
        index = $(this).index();
        togglePage(index);
    });

    //鼠标滚动事件  delta:下滚-1  上滚1
    $(window).mousewheel(function (event, delta) {
        clearTimeout(timer);
        //节流降低事件触发频率
        timer = setTimeout(function () {
            index -= delta;
            //限制index范围
            if (index < 0) index = max;
            else if (index > max) index = 0;
            togglePage(index);
        }, 500)
    });

    //切换屏幕显示内容
    function togglePage(index) {
        //控制器样式切换
        $('.indicator li').eq(index).addClass('active').siblings().removeClass();
        //每屏内容的显示
        $('section').eq(index).show().siblings('section').hide();
        $('header').show();
        $('.title').hide();
        if (index === 0) {
            $('header').hide();
            $('.title').show();
        }
        setTimeout(function () {
            $('section').eq(index).removeClass('current').siblings('section').addClass('current');
        }, 50)
    }
});
