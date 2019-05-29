//地址
var searchurl = "/module/search/search.php";
var loginurl = "/login.htm";
var regurl = "/reg.htm";
var readurl = "/read_1.htm";
var collurl = "/coll_1.htm";
var atturl = "/user.htm";
var uppsw = "/uppsw.htm";

//登陆判断
var islogin = $.cookie("user_account") != undefined;

//常规变量
var style = "text-danger",
    glyphicon = "glyphicon glyphicon-remove-sign",
    title = "失败提示",
    btn1 = "<a class=\"btn btn-danger\" onclick=\"window.location.reload()\">确定<\/a>",
    btn2 = "",
    btn3 = "",
    url = "",
    navhtml = "";

//登陆注册
function aurl() {
    $("a#reg").attr("href", regurl);
    $("a#login").attr("href", loginurl);
}

//内页导航
function nav() {
    if(islogin) {
        navhtml = "<li><a href=\"" + readurl +
            "\">阅读记录<\/a><\/li><li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript:void(0);\">用户中心<span class=\"caret\"><\/span><\/a><ul class=\"dropdown-menu\"><li><a href=\"" +
            collurl +
            "\"><i class=\"glyphicon glyphicon-tasks\"><\/i> 我的收藏<\/a><\/li><li class=\"divider\"></li><li><a href=\"" + atturl + "\"><i class=\"glyphicon glyphicon-user\"><\/i> 用户属性<\/a><\/li><li class=\"divider\"></li><li><a href=\"" + uppsw + "\"><i class=\"glyphicon glyphicon-edit\"><\/i> 修改密码<\/a><\/li><li class=\"divider\"></li><li><a href=\"javascript:void(0);\" onclick=\"msgajax('exit');\"><i class=\"glyphicon glyphicon-off\"><\/i> 退出<\/a><\/li><\/ul><\/li>"
    } else {
        navhtml = "<li><a href=\"javascript:void(0);\" onclick=\"msgloginno();\">阅读记录<\/a><\/li><li><a href=\"" +
            loginurl + "\">登陆</a></li><li><a href=\"" + regurl + "\">注册</a></li>";
    }
    $("ul#nav").html(navhtml);

}

// 搜索框
function search() {
    $("div#search").html(
        "<form class=\"navbar-form navbar-left\" role=\"search\" action=\"" + searchurl +
        "\" name=\"searchForm\" method=\"post\"><div class=\"input-group\"><input type=\"hidden\" name=\"module\" value=\"novel\"><input type=\"hidden\" name=\"type\" value=\"0\"><input type=\"text\" class=\"form-control\" placeholder=\"请输入您需要搜索的关键字\" id=\"bdcsMain\" name=\"key\" autocomplete=\"off\"><span class=\"input-group-btn\"><button type=\"submit\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"><\/span><\/button><\/i><\/div><\/form>"
    );
}

//处理ajax返回的消息
function msgshow(msg) {
    var content = msg["msg"];
    if(typeof(content) == "object") {
        content = msg["msg"]["info"];
    }
    if(msg["code"] == 200) {
        switch(content) {
            case "恭喜您登录成功！":
                btn1 = "<a class=\"btn btn-success\" href=\"" + readurl + "\">阅读记录<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">返回首页<\/a>";
                break;
            case "注册成功，请牢记您的账号密码！":
                btn1 = "<a class=\"btn btn-success\" href=\"" + readurl + "\">阅读记录<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">返回首页<\/a>";
                break;
            case "恭喜您密码修改成功！":
                btn1 = "<a class=\"btn btn-success\" href=\"" + loginurl + "\">重新登陆<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">返回首页<\/a>";
                break;
            case "恭喜您，删除成功！":
                btn1 = "<a class=\"btn btn-success\" onclick=\"window.location.reload()\">确定<\/a>";
                break;
            default:
                btn1 = "<a class=\"btn btn-success\" data-dismiss=\"modal\">确定<\/a>";
        }
        style = "text-success";
        glyphicon = "glyphicon glyphicon-ok-sign";
        title = "成功提示";
        $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
        $("#Modal").modal("show");
        return true;
    } else {
        if(content == "您已经成功退出登录，3秒后跳转到首页！") {
            style = "text-success";
            glyphicon = "glyphicon glyphicon-ok-sign";
            title = "成功提示";
            btn1 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">返回首页<\/a>";
            btn2 = "<script>window.setTimeout(\"location.href='//'+window.location.host;\", 3000);</script>";
        }
        $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
        $("#Modal").modal("show");
        return false;
    }
}

//阅读设置
function setup() {
    style = "text-warning";
    glyphicon = "glyphicon glyphicon-cog";
    title = "阅读设置";
    content = $("div#top").html();
    btn1 = "<a class=\"btn btn-default\" data-dismiss=\"modal\">关闭<\/a>";
    $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
    $("#Modal").modal("show");
}

//未登录提示
function msgloginno() {
    style = "text-warning";
    glyphicon = "glyphicon glyphicon-exclamation-sign";
    title = "未登录提示";
    content = "对不起，需要登录才能使用！";
    btn1 = "<a class=\"btn btn-primary\" href=\"" + loginurl + "\">登录<\/a>";
    btn2 = "<a class=\"btn btn-default\" href=\"" + regurl + "\">注册<\/a>";
    btn3 = "<a class=\"btn btn-default\" data-dismiss=\"modal\">关闭<\/a>";
    $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
    $("#Modal").modal("show");
}

//提示模板
function msgt(style, glyphicon, title, content, btn1, btn2, btn3) {
    var html =
        "<div class=\"modal fade\" id=\"Modal\" role=\"dialog\" aria-labelledby=\"ModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h4 class=\"modal-title " +
        style + "\" id=\"ModalLabel\"><i class=\"" + glyphicon + "\"><\/i> " + title +
        "<\/h4><\/div><div class=\"modal-body\">" + content + "<\/div><div class=\"modal-footer\">" + btn3 + btn2 + btn1 +
        "<\/div><\/div><\/div><\/div>"
    return html;
}

//提示get
function msgajax(type, string) {
    if(islogin) {
        switch(type) {
            case "add":
                $.ajax({
                    url: "/wmcms/action/index.php?action=coll.coll&module=novel&cid=" + string + "&ajax=yes",
                    dataType: "json",
                    cache: false,
                    success: function(coll) {
                        if(msgshow(coll)) {
                            $("button#coll").attr("disabled", "disabled");
                            $("button#coll").html("<i class=\"glyphicon glyphicon-star\"><\/i> 已经收藏");
                        }
                    }
                });
                break;
            case "vote":
                $.ajax({
                    url: "/wmcms/action/index.php?action=novel.ticket&number=1&type=rec&nid=" + string + "&ajax=yes",
                    dataType: "json",
                    cache: false,
                    success: function(ticket) {
                        msgshow(ticket);
                    }
                });
                break;
            case "del":
                $.ajax({
                    url: "/wmcms/action/index.php?action=user.delcoll&cid=" + string + "&ajax=yes",
                    dataType: "json",
                    cache: false,
                    success: function(delcoll) {
                        msgshow(delcoll);
                    }
                });
                break;
            case "message":
                url = window.location.href;
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/wmcms/action/index.php?action=message.add&ajax=yes",
                    data: {
                        type: "add",
                        content: url
                    },
                    cache: false,
                    success: function(err) {
                        msgshow(err);
                    }
                });
                break; //
            case "uppsw":
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/wmcms/action/index.php?action=user.uppsw&ajax=yes",
                    data: $("form#uppswlist").serialize(),
                    cache: false,
                    success: function(uppsw) {
                        msgshow(uppsw);
                    }
                });
                break;
            case "exit":
                $.ajax({
                    dataType: "JSON",
                    url: "/module/user/exit.php?ajax=yes",
                    cache: false,
                    success: function(exit) {
                        msgshow(exit);
                    }
                });
                break;
        }
    } else {
        switch(type) {
            case "login":
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/wmcms/action/index.php?action=user.login&ajax=yes",
                    data: $("form#loginlist").serialize(),
                    cache: false,
                    success: function(login) {
                        msgshow(login);
                    }
                });
                break;
            case "reg":
                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    url: "/wmcms/action/index.php?action=user.reg&ajax=yes",
                    data: $("form#reglist").serialize(),
                    cache: false,
                    success: function(reg) {
                        msgshow(reg);
                    }
                });
                break;
            default:
                msgloginno();
        }
    }
}

//手机判断
function is_mobile() {
    var regex_match =
        /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i;
    var u = navigator.userAgent;
    if(null == u) {
        return true;
    }
    var result = regex_match.exec(u);
    if(null == result) {
        return false
    } else {
        return true
    }
}

//末尾
function foot() {
    if (!is_mobile()) {}
    $("div#foot").append("<p>本站所有小说为转载作品，所有章节均由网友上传，转载至本站只是为了宣传本书让更多读者欣赏。</p>");
    //弹框
    $(function() {
        $("[data-toggle='popover']").popover();
    });
    search();
    nav();
  	//统计
    function ga() { !
        function(e, n, o) {
            var t = e.screen,
            a = encodeURIComponent,
            r = ["dt=" + a(n.title), "dr=" + a(n.referrer), "ul=" + (o.language || o.browserLanguage), "sd=" + t.colorDepth + "-bit", "sr=" + t.width + "x" + t.height, "vp=" + e.innerWidth + "x" + e.innerHeight, "z=" + +new Date],
            i = "?" + r.join("&");
            e.__beacon_img = new Image,
            e.__beacon_img.src = "/js/tj.php" + i
        } (window, document, navigator, location);
    }
    if (window.addEventListener) window.addEventListener("load", ga, false);
    else if (window.attachEvent) window.attachEvent("onload", ga);
    else window.onload = ga;
}
