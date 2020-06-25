$(document).ready(function () {

    //搜索引擎列表【预设】
    var se_list_preinstall = {
        '1': {
            id: 1,
            title: "百度",
            url: "https://www.baidu.com/s",
            name: "wd",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/baidu.svg",
        },
        '2': {
            id: 2,
            title: "谷歌",
            url: "https://www.google.com/search",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/google.svg",
        },
        '3': {
            id: 3,
            title: "夸克",
            url: "https://quark.sm.cn/s",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/kuake.svg",
        },
        '4': {
            id: 4,
            title: "必应",
            url: "https://cn.bing.com/search",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/bing.svg",
        },
        '5': {
            id: 5,
            title: "搜狗",
            url: "https://www.sogou.com/web",
            name: "query",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/sougou.svg",
        },
        '6': {
            id: 6,
            title: "秘迹",
            url: "https://mijisou.com",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/mijisou.svg",
        },
        '7': {
            id: 7,
            title: "多吉",
            url: "https://www.dogedoge.com/results",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/doge.svg",
        },
        '8': {
            id: 8,
            title: "镜像",
            url: "https://google.9sr.ltd/search",
            name: "q",
            img: "https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/goo.svg",
        },
    };

    //主页快捷方式【预设】
    var quick_list_preinstall = {
        /*'1': {
            title: "哔哩哔哩",
            url: "https://www.bilibili.com/",
            img: ".https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/bilibili.png",
            explain: "哔哩哔哩 (゜-゜)つロ 干杯~",
        },
        '2': {
            title: "GitHub",
            url: "https://github.com/",
            img: ".https://cdn.jsdelivr.net/gh/hnwsz/sou/icon/github.png",
            explain: "GitHub",
        },*/
    };
    
    //搜索框数据加载
    searchData();

    //快捷方式数据加载
    quickData();

    //判断窗口大小，添加输入框自动完成
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    } else {
        $(".wd").focus();
    }

    //设置内容加载
    setSeInit();//搜索引擎设置
    setQuickInit();//快捷方式设置


    //获取搜索引擎列表
    function getSeList() {
        var se_list_local = Cookies.get('se_list');
        if (se_list_local !== "{}" && se_list_local) {
            return JSON.parse(se_list_local);
        } else {
            setSeList(se_list_preinstall);
            return se_list_preinstall;
        }
    }

    //设置搜索引擎列表
    function setSeList(se_list) {
        if (se_list) {
            Cookies.set('se_list', se_list, {expires: 36500});
            return true;
        }
        return false;
    }

    //选择搜索引擎点击事件
    $(document).on('click', function (e) {
        if ($(".search-engine").is(":hidden") && $(".se").is(e.target)) {
            if ($(".se").is(e.target)) {
                seList();
                $(".search-engine").show();
            }
        } else {
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    //搜索引擎列表点击
    $(".search-engine-list").on("click", ".se-li", function () {
        var url = $(this).attr('url');
        var name = $(this).attr('name');
        var img = $(this).attr('img');
        $(".search").attr("action", url);
        $(".wd").attr("name", name);
        $(".se").attr("src", img);
        $(".search-engine").hide();
    });

    //菜单点击
    $("#menu").click(function (event) {
        $(this).toggleClass('on');
        $(".side").toggleClass('closed');
    });
    $("#content").click(function (event) {
        $(".on").removeClass('on');
        $(".side").addClass('closed');
    });

    // 侧栏标签卡切换
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    //修改默认搜索引擎
    $(".se_list_table").on("click", ".set_se_default", function () {
        var name = $(this).val();
        Cookies.set('se_default', name, {expires: 36500});
        setSeInit();
    });

    //获得默认搜索引擎
    function getSeDefault() {
        var se_default = Cookies.get('se_default');
        return se_default ? se_default : 1;
    }

    //搜索框数据加载
    function searchData() {
        var se_default = getSeDefault();
        var se_list = getSeList();
        var defaultSe = se_list[se_default];
        if (defaultSe) {
            $(".search").attr("action", defaultSe["url"]);
            $(".se").attr("src", defaultSe["img"]);
            $(".wd").attr("name", defaultSe["name"]);
        }
    }

    //搜索引擎列表加载
    function seList() {
        var html = "";
        var se_list = getSeList();
        for (var i in se_list) {
            html += "<li class='se-li' url='" + se_list[i]["url"] + "' name='" + se_list[i]["name"] + "' img='" + se_list[i]["img"] + "'><img src='" + se_list[i]["img"] + "'>" + se_list[i]["title"] + "</li>";
        }
        $(".search-engine-list").html(html);
    }

    //设置-搜索引擎列表加载
    function setSeInit() {
        var se_default = getSeDefault();
        var se_list = getSeList();
        var html = "";
        for (var i in se_list) {
            var tr = "<tr><td></td>";
            if (i === se_default) {
                tr = "<tr><td><span class='iconfont iconhome'></span></td>";
            }
            tr += "<td>" + i + ". " + se_list[i]["title"] + "</td><td><button class='set_se_default' value='" + i + "'><span class='iconfont iconstrore-add'></span></button><button class='edit_se' value='" + i + "'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='" + i + "'><span class='iconfont icondelete'></span></button></td></tr>";
            html += tr;
        }
        $(".se_list_table").html(html);
    }

    //搜索引擎添加
    $(".set_se_list_add").click(function () {
        $(".se_add_content input").val("");
        $(".se_add_content").show();
    });

    //搜索引擎保存
    $(".se_add_save").click(function () {
        var key_inhere = $(".se_add_content input[name='key_inhere']").val();
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var se_list = getSeList();

        if (se_list[key]) {
            alert("顺序:" + key + " 已有数据，不可用");
            return;
        }

        if (key_inhere && key !== key_inhere) {
            delete se_list[key_inhere];
        }

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };
        setSeList(se_list);
        setSeInit();
        $(".se_add_content").hide();
    });

    //关闭表单
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();
    });

    //搜索引擎修改
    $(".se_list").on("click", ".edit_se", function () {

        var se_list = getSeList();
        var key = $(this).val();
        $(".se_add_content input[name='key_inhere']").val(key);
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);

        $(".se_add_content").show();
    });

    //搜索引擎删除
    $(".se_list").on("click", ".delete_se", function () {
        var se_default = getSeDefault();
        var key = $(this).val();
        if (key == se_default) {
            alert("默认搜索引擎不可删除！");
        } else {
            var r = confirm("顺序 " + key + " 是否删除！");
            if (r) {
                var se_list = getSeList();
                delete se_list[key];
                setSeList(se_list);
                setSeInit();
            }
        }
    });

    //恢复预设搜索引擎
    $(".set_se_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setSeList(se_list_preinstall);
            Cookies.set('se_default', 1, {expires: 36500});
            setSeInit();
        }
    });

    //获取快捷方式列表
    function getQuickList() {
        var quick_list_local = Cookies.get('quick_list');
        if (quick_list_local !== "{}" && quick_list_local) {
            return JSON.parse(quick_list_local);
        } else {
            setQuickList(quick_list_preinstall);
            return quick_list_preinstall;
        }
    }

    //设置快捷方式列表
    function setQuickList(quick_list) {
        if (quick_list) {
            Cookies.set('quick_list', quick_list, {expires: 36500});
            return true;
        }
        return false;
    }

    //快捷方式数据加载
    function quickData() {
        var html = "";
        var quick_list = getQuickList();
        for (var i in quick_list) {
            html += "<li class='quick' title='" + quick_list[i]['explain'] + "'>\
                        <a href='" + quick_list[i]['url'] + "'>\
                            <i style='background-image: url(" + quick_list[i]['img'] + ");'></i>\
                            " + quick_list[i]['title'] + "\
                        </a>\
                     </li>";
        }
        $(".quick-ul").html(html);
    }

    //设置-快捷方式加载
    function setQuickInit() {

        var quick_list = getQuickList();
        var html = "";
        for (var i in quick_list) {
            tr = "<tr>\
                    <td>" + i + ".&nbsp;</td>\
                    <td>" + quick_list[i]['title'] + "</td>\
                    <td>\
                        <button class='edit_quick' value='" + i + "'><span class='iconfont iconbook-edit'></span></button>\
                        &nbsp;\
                        <button class='delete_quick' value='" + i + "'><span class='iconfont icondelete'></span></button>\
                    </td>\
                </tr>";
            html += tr;
        }
        $(".quick_list_table").html(html);
    }

    //设置-快捷方式添加
    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();
    });

    //设置-快捷方式保存
    $(".quick_add_save").click(function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            alert("顺序：" + key + " 不是正数数！");
            return;
        }

        var quick_list = getQuickList();

        if (quick_list[key]) {
            alert("顺序:" + key + " 已有数据，不可用");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
    });

    //设置-快捷方式关闭添加表单
    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();
    });

    //恢复预设快捷方式
    $(".set_quick_list_preinstall").click(function () {
        var r = confirm("现有设置和数据将被清空！");
        if (r) {
            setQuickList(quick_list_preinstall);
            setQuickInit();
        }
    });

    //快捷方式修改
    $(".quick_list").on("click", ".edit_quick", function () {

        var quick_list = getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        $(".quick_add_content").show();
    });

    //快捷方式删除
    $(".quick_list").on("click", ".delete_quick", function () {

        var key = $(this).val();

        var r = confirm("顺序 " + key + " 是否删除！");
        if (r) {
            var quick_list = getQuickList();
            delete quick_list[key];
            setQuickList(quick_list);
            setQuickInit();
        }
    });

    //我的数据导出
    $("#my_data_out").click(function () {
        var se = getSeList();
        var se_default = getSeDefault();
        var quick = getQuickList();

        var mydata = {"se": se, "se_default": se_default, "quick": quick};
        var json = JSON.stringify(mydata);

        download("back-up-" + $.now() + ".json", json);
    });

    //我的数据导入 点击触发文件选择
    $("#my_data_in").click(function () {
        $("#my_data_file").click();
    });

    // 选择文件后读取文件内容
    $("#my_data_file").change(function () {
        var selectedFile = document.getElementById('my_data_file').files[0];
        //var name = selectedFile.name;//读取选中文件的文件名
        //var size = selectedFile.size;//读取选中文件的大小
        //console.log("文件名:"+name+" 大小:"+size);

        var reader = new FileReader();//这是核心,读取操作就是由它完成.
        reader.readAsText(selectedFile);//读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
            //console.log(this.result);

            // 导入数据
            importData(this.result);
        }
    });

    /**
     * 导入备份
     * @param json
     */
    function importData(json) {
        //json 格式校验
        try {
            var mydata = JSON.parse(json);
        } catch (e) {
            alert("数据解析异常");
            return;
        }
        if (typeof mydata != 'object') {
            alert("数据格式错误");
            return;
        }

        if (confirm("当前数据将被覆盖！是否继续导入？")) {
            setSeList(mydata["se"]);
            if (mydata["se_default"]) {
                Cookies.set('se_default', mydata["se_default"], {expires: 36500});
            }
            setQuickList(mydata["quick"]);

            searchData();
            quickData();
            setSeInit();
            setQuickInit();

            alert("导入成功");
        }
    }

    /**
     * 下載文本为文件
     * @param filename 文件名
     * @param text     内容
     */
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
});

//关键词sug
$(function() {
    //当键盘键被松开时发送Ajax获取数据
    $('.wd').keyup(function() {
        var keywords = $(this).val();
        if (keywords == '') { $('#word').hide(); return };
        $.ajax({
            url: 'https://suggestion.baidu.com/su?wd=' + keywords,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend: function() {
               // $('#word').append('<li>正在加载。。。</li>');
            },
            success: function(data) {
                $('#word').empty().show();
                if (data.s == '') {
                    //$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
                    $('#word').hide();
                }
                $.each(data.s, function() {
                    $('#word').append('<li><svg class="icon" style=" width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' + this + '</li>');
                })
            },
            error: function() {
                $('#word').empty().show();
                //$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
                $('#word').hide();
            }
        })
    })
    //点击搜索数据复制给搜索框
    $(document).on('click', '#word li', function() {
        var word = $(this).text();
        $('.wd').val(word);
        $('#word').hide();
        $("form").submit();
        // $('#texe').trigger('click');触发搜索事件
    })

})