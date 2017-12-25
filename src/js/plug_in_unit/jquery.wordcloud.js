(function ($) {
    var tagCloud = function (ele, opts) {
        this.$element = ele;
        this.defaults = {
            words: []
        },

        this.radius = 0,
        this.options = $.extend({}, this.defaults, opts);

        this.mcList = [];
        this.dtr = Math.PI / 180;
        this.distr = true;
        this.size = 200;
        this.tspeed = 2;
        this.lasta = 0.16;
        this.lastb = 0.21;
        this.howElliptical = 1;

        this.mouseX = 0;
        this.mouseY = 0;

        this.d = 0;
        this.active = false;
    };

    tagCloud.prototype = {
        init: function () {
            var opts = this.options, // 拼配置项
                mcList = this.mcList, //
                wordsGroup = opts.words, // 所有词的数组
                words,
                len,
                colors = opts.colors, // 颜色数组
                i, el;

            var oFragment = document.createDocumentFragment(),
                counts = opts.words.length, // 词的数组的长度
                textNode;

            for (var j = 0; j < counts; j++) {
                words = wordsGroup[j];
                len = words.length;
                for (i = 0; i < len; i++) {
                    el = document.createElement('a');
                    textNode = document.createTextNode(words[i]);
                    el.appendChild(textNode);
                    el.setAttribute('groupIndex', j);
                    el.style.color = colors[j];
                    oFragment.appendChild(el);

                    mcList.push({
                        offsetWidth: 120,
                        offsetHeight: 40
                    });
                }
            }

            this.$element.addClass('tag-cloud');
            this.$element.append(oFragment);
            this.aA = this.$element[0].getElementsByTagName('a');

            this.reset();
            this.attachEvents();
        },

        reset: function() { // 计算球的半径
            this.radius = (window.innerHeight || document.documentElement.clientHeight) * 0.4 / 2;
            this.d = this.radius * 1.25; // 计算乘以1.21倍的
            this.sineCosine(0, 0, 0);
            this.positionAll();
            this.animate();
        },

        sineCosine: function (a, b, c) {
            var dtr = this.dtr;
            this.sa = Math.sin(a * dtr);
            this.ca = Math.cos(a * dtr);
            this.sb = Math.sin(b * dtr);
            this.cb = Math.cos(b * dtr);
            this.sc = Math.sin(c * dtr);
            this.cc = Math.cos(c * dtr);
        },

        positionAll: function () {
            var phi = 0,
                theta = 0,
                mcList = this.mcList,
                max = this.mcList.length,
                distr = this.distr,
                aA = this.aA,
                radius = this.radius,
                i = 0,
                aTmp = [],
                oFragment = document.createDocumentFragment(),
                oDiv = this.$element[0],
                left,
                top,
                item;

            //随机排序
            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort(function () {
                return Math.random() < 0.5 ? 1 : -1;
            });

            for (i = 0; i < aTmp.length; i++) {
                oFragment.appendChild(aTmp[i]);
            }

            oDiv.appendChild(oFragment);

            for (i = 1; i < max + 1; i++) {
                if (distr) {
                    phi = Math.acos(-1 + (2 * i - 1) / max);
                    theta = Math.sqrt(max * Math.PI) * phi;
                }
                else {
                    phi = Math.random() * (Math.PI);
                    theta = Math.random() * (2 * Math.PI);
                }

                item = mcList[i - 1];
                //坐标变换
                item.cx = radius * Math.cos(theta) * Math.sin(phi) * 0.5;
                item.cy = radius * Math.sin(theta) * Math.sin(phi) * 0.5;
                item.cz = radius * Math.cos(phi) * 0.5;


                aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2 - mcList[i - 1].offsetWidth / 2 + 'px';
                aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2 - mcList[i - 1].offsetHeight / 2 + 'px';
            }
        },

        doPosition: function () {
            var oDiv = this.$element[0],
                mcList = this.mcList,
                aA = this.aA,
                l = oDiv.offsetWidth / 2,
                t = oDiv.offsetHeight / 2,
                i,
                len,
                item, mc;

            for (i = 0, len = mcList.length; i < len; i++) {
                item = aA[i];
                mc = mcList[i];
                item.style.fontSize = mc.scale / 3 + 0.625 + 'em';
                item.style.filter = "alpha(opacity=" + 100 * mc.alpha + ")";
                item.style.opacity = mc.alpha;
                item.style.left = mc.cx + l - mc.offsetWidth / 2 + 'px';
                item.style.top = mc.cy + t - mc.offsetHeight / 2 + 'px';
            }
        },

        depthSort: function () {
            var i,
                aTmp = [],
                aA = this.aA;

            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort
            (
                function (vItem1, vItem2) {
                    if (vItem1.cz > vItem2.cz) {
                        return -1;
                    }
                    else if (vItem1.cz < vItem2.cz) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            );

            for (i = 0; i < aTmp.length; i++) {
                aTmp[i].style.zIndex = i;
            }
        },

        update: function() {
            var a,
                b,
                active = this.active,
                size = this.size,
                tspeed = this.tspeed,
                mcList = this.mcList,
                lasta = this.lasta,
                lastb = this.lastb,
                howElliptical = this.howElliptical,
                mouseX = this.mouseX,
                mouseY = this.mouseY,
                d = this.d,
                opts = this.options,
                radius = opts.radius;
            if (active) {
                a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
                b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
            }
            else {
                a = lasta * 0.98;
                b = lastb * 0.98;
            }

            lasta = a;
            lastb = b;

            if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
                return;
            }

            var c = 0;
            this.sineCosine(a, b, c);
            for (var j = 0; j < mcList.length; j++) {
                var rx1 = mcList[j].cx;
                var ry1 = mcList[j].cy * this.ca + mcList[j].cz * (-this.sa);
                var rz1 = mcList[j].cy * this.sa + mcList[j].cz * this.ca;

                var rx2 = rx1 * this.cb + rz1 * this.sb;
                var ry2 = ry1;
                var rz2 = rx1 * (-this.sb) + rz1 * this.cb;

                var rx3 = rx2 * this.cc + ry2 * (-this.sc);
                var ry3 = rx2 * this.sc + ry2 * this.cc;
                var rz3 = rz2;

                mcList[j].cx = rx3;
                mcList[j].cy = ry3;
                mcList[j].cz = rz3;

                var per = d / (d + rz3);

                mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
                mcList[j].y = ry3 * per;
                mcList[j].scale = per;
                mcList[j].alpha = per;

                mcList[j].alpha = (mcList[j].alpha - 0.5) * (10 / 6);
            }

            this.doPosition();
            this.depthSort();
        },

        attachEvents: function () {
            var self = this;
            $(window).on('resize', function () {
                window.cancelAnimationFrame(self.handler);
                self.reset();
            });

            /*this.$element.on({
                'mouseover': function () {
                    self.active = true;
                },

                'mouseout': function () {
                    self.active = false;
                },

                'mousemove': function (ev) {
                    var oEvent = window.event || ev,
                        oDiv = self.$element[0];

                    self.mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
                    self.mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);

                    self.mouseX /= 5;
                    self.mouseY /= 5;
                }
            });*/
        },

        replaceWord: function(postion, text, groupIndex) {
            var aA = this.aA,
                oDiv = this.$element,
                colors = this.options.colors,
                selectedEle = aA[postion],
                ele = $(aA[postion]).clone(),
                oldText = selectedEle.innerHTML,
                oldGroupIndex = selectedEle.getAttribute('groupIndex');

            function fadeIn() {
                ele.html(text);
                ele.css('color', colors[groupIndex]);
                ele.animate({ top: selectedEle.style.top, left: selectedEle.style.left, opacity: 1 }, function () {
                    ele.remove();
                    selectedEle.style.color = colors[groupIndex];
                    selectedEle.setAttribute('groupIndex', groupIndex);
                    selectedEle.innerHTML = text;
                });
            }

            function fadeOut() {
                oDiv.append(ele);
                selectedEle.innerHTML = '';
                ele.animate({ top: 0, left: 0, opacity: 0 }, fadeIn);
            }

            fadeOut();

            return {
                text: oldText,
                index: parseInt(oldGroupIndex)
            };
        },

        animate: function () {
            var self = this;
            (function update() {
                self.update();
                self.handler = window.requestAnimationFrame(arguments.callee);
            })();
        }
    };

    $.fn.tagCloud = function (options) {
        var plugin = new tagCloud(this, options);
        plugin.init();
        return plugin;
    }
})(jQuery);


