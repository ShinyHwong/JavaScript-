/**
 * Created by Shine Hwong on 2017/4/21.
 */
$(function () {
    // 清除本地数据
    // store.clear();

    //一、 吸顶效果、返回顶部效果
    var offsetT = $('.nav').offset().top;
    $(window).on('scroll', function () {
        //卷去的距离大于nav距顶端的高度时发生吸顶
        if ($(window).scrollTop() > offsetT) {
            $('.nav').css({
                'position': 'fixed',
                'top': 0
            });
            $('.nav .log img').css({
                'opacity': 1
            });
            //返回顶部按钮出现
            $('.backTop').fadeIn(300)
        } else {
            //恢复
            $('.nav').css({
                'position': 'static'
            });
            $('.nav .log img').css({
                'opacity': 0
            });
            //返回顶部按钮消失
            $('.backTop').fadeOut(300)
        }
    });
    //返回顶部动画设置
    $('.backTop').on('click', function () {
        $('body').animate({scrollTop: 0})
    });

    //二、Tab切换
    $('.header li').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        //设置内容栏同步切换
        var tabIndex = $(this).index();
        $('.body').eq(tabIndex).addClass('active').siblings().removeClass('active');
    });

    //设置数组接收提交的文字数据
    var itemArr = store.get('localData') || [];
    //更新界面
    update();

    //三、点击提交文字出现在内容栏
    $('input[type=submit]').on('click', function (event) {
        //清除默认事件
        event.preventDefault();
        //获取输入内容
        var inputText = $('input[type=text]').val();
        //判断输入
        if (inputText.trim() === '') {
            //先清空内容再设置placeholder
            $('.nav input[type=text]').val('').attr('placeholder', '内容不能为空！');
        }
        else {
            //设置字符串接收数据
            var item = {
                title: '',
                content: '',
                isCheck: false,
                remindTime: '',
                isNotice: false
            };
            item.title = inputText;
            itemArr.push(item);

            //更新界面
            update();
        }
    });

    //数据与界面分离，数据单独保存
    // 四、更新数据方法
    function update() {
        /* 利用store库本地存储数据
         * 参数1表示自定义存储的项目名
         * 参数2表示需要存储的数据*/
        store.set('localData', itemArr);
        // 先清空所有，再逐一添加
        $('.task').empty();
        $('.finish').empty();
        for (var i = 0; i < itemArr.length; i++) {
            /*判断itemArr[i]是否为空,如果不进行这项操作，
             会导致报错，title不是null的属性*/
            if (itemArr[i] === undefined || !itemArr[i]) continue;
            //通过data-设置自定义属性，方便查找
            var li = '<li data-index=' + i + '>' +
                    // 判断数据中选中是否为true，来更新界面信息
                '<input type=checkbox ' + (itemArr[i].isCheck ? 'checked' : '') + '>' +
                '<span class="title">' + itemArr[i].title + '</span>' +
                '<span class="content">' + itemArr[i].content + '</span>' +
                '<a class="del">删除</a>' +
                '<a class="detail">详情</a>' +
                '</li>';

            //判断是个否选中来添加到不同的tab中
            if (itemArr[i].isCheck) {
                $('.finish').prepend(li);
            } else {
                $('.task').prepend(li);
            }
            //提醒过后li做淡化处理
            if (itemArr[i].isNotice) {
                $('li[data-index=' + i + '] .title').css({
                    'color': 'lightgreen'
                });
                $('li[data-index=' + i + '] .content').css({
                    'color': '#999'
                })
            }

            //提交数据后自动清空输入栏
            $('input[type=text]').val('');
        }
    }

    //五、li中的删除方法
    /*动态添加，在事件域外不能直接获取到，需要通过代理*/
    $('body').on('click', '.del', function () {
        //获取删除标签的父标签li
        var li = $(this).parent();
        //获取li的索引值
        var index = li.data('index');
        //删除数据数组中的这个li
        delete itemArr[index];//删除留下的空位为null
        //利用动画删除界面中的li
        li.slideUp(300, function () {
            li.remove();
        });
        //更新数据
        store.set('localData', itemArr);
    });

    //六、checkbox按钮设置
    /*动态添加，在事件域外不能直接获取到，需要通过代理*/
    $('body').on('click', 'input[type=checkbox]', function () {
        //获取索引来找到本地数据中存储的数据
        var li = $(this).parent();
        var index = li.data('index');
        //is()方法进行判断，返回布尔值，判断是否已经点击
        //勾选了返回true，没勾选返回false。通过这个来判断添加到哪个Tab
        itemArr[index].isCheck = $(this).is(':checked');
        //更新数据
        update();
    });

    //七、设置详情界面
    /*动态添加，在事件域外不能直接获取到，需要通过代理*/
    $('body').on('click', '.detail', function () {
        var li = $(this).parent();
        var index = li.data('index');
        var item = itemArr[index];
        //设置显示与关闭详情界面
        $('.detailCover').fadeIn(200);
        $('.close').click(function () {
            $('.detailCover').fadeOut(200);
        });
        //设置标题显示内容
        $('.detailTitle').text(item.title);
        //通过date库来设置时间选项卡
        $.datetimepicker.setLocale('ch'); //设置本地化时间
        $('.detailTime').datetimepicker();

        //点击按钮进行更新
        $('.update').on('click', function () {
            //标题更新
            if ($('.titleChange').val().trim() !== '') {
                item.title = $('.titleChange').val();
            }
            //获取textarea中输入的内容更新给li
            if ($('.detailContent').val().trim() !== '') {
                item.content = $('.detailContent').val();
            }
            //获取input里的时间
            itemArr[index].remindTime = $('.detailTime').val();
            //已经提示设置为false
            itemArr[index].isNotice = false;
            //更新界面
            update();
            $('.detailCover').fadeOut(200);
        })
    });

    //八、设置提醒时间响铃
    //利用定时器判断提醒时间是否大于系统时间并响铃
    setInterval(function () {
        var now = new Date().getTime();
        //遍历获取每个li中的时间进行对比
        for (var i = 0; i < itemArr.length; i++) {
            //进行校验处理
            if (itemArr[i] === undefined || !itemArr[i] || itemArr[i].isNotice) continue;
            var targetTime = new Date(itemArr[i].remindTime).getTime();
            //达到提醒时间
            if (now > targetTime) {
                //是否提醒设为true
                itemArr[i].isNotice = true;
                //播放铃声
                $('audio').get(0).play();
                //提醒过后li做淡化处理
                $('li[data-index=' + i + '] .title').css({
                    'color': 'lightgreen'
                });
                $('li[data-index=' + i + '] .content').css({
                    'color': '#999'
                })
            }
            //更新数据
            store.set('localData', itemArr);
        }
    }, 2000)
});