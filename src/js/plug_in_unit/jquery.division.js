/**
 * jQuery division 1.0.0
 * @Author saigsf<qq: 2270029397 email: sai_gsf@163.com>
 * @Date: 2018-5-17
 * @Last Modified by: M S I
 * @Last Modified time: 2018-5-17 
 */
; (function ($) {

  var Division = function (opt) {
    this.option = opt;
    this.domArr = [];
    this.width = ''; // 容器宽度
    this.height = ''; // 容器高度
    this.subWidth = ''; // 分块宽度
    this.subHeight = ''; // 分块高度
    this.timer = null;
    this._init();
  }

  // 初始化
  Division.prototype._init = function () {
    this.width = this.option.container.width()
    this.height = this.option.container.height();
    this.subWidth = this.option.container.width() / this.option.col
    this.subHeight = this.option.container.height() / this.option.row;
    this.option.n = this.option.n ? this.option.n : 0;
    this._render();

  }

  // 页面渲染
  Division.prototype._render = function () {
    this.domArr = [];
    this.option.container.html('');
    var dom = ''
    for (let i = 0; i < this.option.row; i++) {
      for (let j = 0; j < this.option.col; j++) {
        // DOM操作
        dom = document.createElement('div');
        dom.style.width = this.subWidth + 'px';
        dom.style.height = this.subHeight + 'px';
        dom.style.backgroundImage = 'url(' + this.option.imgURL[0] + ')';
        dom.style.backgroundSize = this.width + 'px ' + this.height + 'px'
        dom.style.backgroundPositionX = -this.subWidth * j + 'px'
        dom.style.backgroundPositionY = -this.subHeight * i + 'px'

        // 添加到数组
        this.domArr.push(dom);
      }
    }

    // 添加到容器
    this.option.container.append(this.domArr);
    // 启动分裂效果
    this.splitEffect(this.option.n);
    // 启动图片自动切换
    this.imgAutoChange();
    // 碎片点击事件
    this.fragment()
  }

  // 图片分裂效果
  Division.prototype.splitEffect = function (n) {
    var effectArr = [];
    var _this = this;
    var m = _this.option.max - _this.option.min;
    var mn = _this.option.min;
    effectArr.push(function (type) {
      switch (type) {
        case 'auto':
          clearInterval(_this.timer)
          _this.timer = setInterval(function () {
            for (let i = 0; i < _this.domArr.length; i++) {
              const item = _this.domArr[i];
              item.style.transform = 'translate3D(' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px)';
            }
          }, _this.option.splitInterval)
          break;
        case 'mouseover':
          _this.option.container.on('mouseover', function () {
            for (let i = 0; i < _this.domArr.length; i++) {
              const item = _this.domArr[i];
              item.style.transform = 'translate3D(' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px)';
            }
          })
          _this.option.container.on('mouseout', function () {
            for (let i = 0; i < _this.domArr.length; i++) {
              const item = _this.domArr[i];
              item.style.transform = 'translate(0px, 0px)';
            }
          })
          break;
        case 'click':
          _this.option.container.on('click', function () {
            for (let i = 0; i < _this.domArr.length; i++) {
              const item = _this.domArr[i];
              item.style.transform = 'translate3D(' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px,' + (Math.random() * m - mn) + 'px)';
            }
          })
          break;


        default:
          break;
      }
    });

    if (n || n == 0) {
      effectArr[n](_this.option.splitType)
    }
  }

  // 图片切换
  Division.prototype.changeImg = function (url) {
    for (let i = 0; i < this.domArr.length; i++) {
      const item = this.domArr[i];
      item.style.backgroundImage = 'url(' + url + ')';
    }
  }

  // 图片自动切换
  Division.prototype.imgAutoChange = function () {
    var _this = this;
    var timer = null;
    if (_this.option.imgIsAutoChange) {
      var i = 0;

      clearInterval(timer);
      timer = setInterval(function () {
        i++;
        if (i >= _this.option.imgURL.length) {
          i = 0;
        }
        var item = _this.option.imgURL[i];

        _this.changeImg(item)
      }, _this.option.imgAutoChangeInterval)
    }
  }

  // 碎片点击效果
  Division.prototype.fragment = function () {
    var _this = this;
    var flag = true;
    for (let i = 0; i < _this.domArr.length; i++) {
      $(_this.domArr[i]).on('click', function () {
        if (flag) {
          console.log(i, i % _this.option.col, Math.floor(i / _this.option.row))
          this.style.width = _this.width + 'px';
          this.style.height = _this.height + 'px';
          this.style.backgroundSize = _this.width * _this.option.col + 'px ' + _this.height * _this.option.row + 'px'
          this.style.backgroundPositionX = -_this.width * (i % _this.option.col) + 'px'
          this.style.backgroundPositionY = -_this.height * Math.floor(i / _this.option.col) + 'px'
          $(this).siblings().css('display', 'none');
          clearInterval(_this.timer);
        } else {
          _this._render()
        }
        flag = !flag
        // console.log(this);


      })
    }
  }



  $.fn.division = function (option) {
    var def = {
      row: 4, // 行
      col: 4, // 列
      imgURL: [''], // 图片地址
      imgIsAutoChange: false, // 图片是否自动切换
      imgAutoChangeInterval: 2000, // 图片是否自动切换
      splitType: 'auto', // 效果触发方式
      splitInterval: 2000, // 延迟，当type = 'auto'时有效
      min: -30,
      max: 30
    };
    var _this = this;

    $.extend(def, option, {
      container: _this
    })


    return new Division(def);
  }
})(jQuery);

