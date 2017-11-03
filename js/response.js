(function() {
    init();
    window.onresize = function() {
        init();
    }

    function init() {
        // 得到可是窗口的宽度和高度
        var $windowWidth = $(window).width();
        var $windowHeight = $(window).height();

        // 得到第一页，让其高度随可是窗口变化
        var page1 = document.querySelector(".page1 .container");
        var containerW = $(".page1 .container").width();
        // page1.style.height = containerW / 2 + "px";
        //
        // var code = document.querySelector(".wx-code");
        // code.style.height = $windowHeight + "px";

    }


})();