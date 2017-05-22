$(function () {
    $(window).on('resize', function () {
        var clientW = $(window).width();

        //动态变化轮播图尺寸
        var isSmallImage = clientW < 790; //判断是否显示大图
        var items = $('#wjs_carousel .item');
        items.each(function (index, item) {
            var item = $(item);
            if (isSmallImage) { //小图
                var img = '<img src="'+ item.data('sm-img') +'">';
                item.empty().append($(img));
            } else{ //大图
                item.css('backgroundImage', 'url('+item.data('lg-img')+')');
                item.empty(); //清空item内的img标签
            }
        });

        //屏幕过小出现滚动条
        var li = $('#wjs_product .nav li[role=presentation]'); //获取左边所有li
        var totalWidth = li.parent().parent().width(); //获取宽度
        var sumWidth = 0; //定义所有li宽度的总和
        li.each(function (index, item) {
            sumWidth += $(item).width();
        });
        if (sumWidth >= totalWidth) {
            li.parent().width(sumWidth); //设置固定宽度
        } else{
            li.parent().removeAttr('style'); //清楚宽度
        }
    }); //屏幕窗口变化事件
    $(window).trigger('resize'); //一加载触发屏幕缩放事件

    $('[data-toggle="tooltip"]').tooltip();//工具提示
});
