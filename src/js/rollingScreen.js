$(function() {
    let $container = $(".container");
    let nowPage = 0;
    let lock = true;
    $(document).mousewheel(function(e, delta) {
        if (!lock) {
            return;
        }
        nowPage -= delta
        move($container, nowPage);
        lock = false;
        /*函数节流，知道两秒钟后，才能执行该函数*/
        setTimeout(function() {
            lock = true;
        }, 1000);
    });
    $(window).keyup(function(e) {
        if (!lock) {
            return;
        }
        console.log(e.keyCode)
        switch (e.keyCode) {
            case 38:
                nowPage--;
                move($container, nowPage);
                break;
            case 40:
                nowPage++;
                move($container, nowPage);
                break;
            case 123:

                break;

            default:
                break;
        }
        lock = false;
        /*函数节流，知道两秒钟后，才能执行该函数*/
        setTimeout(function() {
            lock = true;
        }, 1000);
    })
})

function move(obj, page) {
    if (page < 0) {
        page = 0;
    }
    if (page > 4) {
        page = 4;
    }
    //让container进行动画 
    //方法一使用css样式 
    obj.css('top', -page * 100 + "%");
    //方法二 使用运动框架
    // $container.animate({
    //     "top": -nowPage * 100 + "%"
    // }, 1000);
}