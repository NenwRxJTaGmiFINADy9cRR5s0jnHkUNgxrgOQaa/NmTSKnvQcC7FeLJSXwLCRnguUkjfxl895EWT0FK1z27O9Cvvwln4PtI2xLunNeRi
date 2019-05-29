//��ַ
var searchurl = "/module/search/search.php";
var loginurl = "/login.htm";
var regurl = "/reg.htm";
var readurl = "/read_1.htm";
var collurl = "/coll_1.htm";
var atturl = "/user.htm";
var uppsw = "/uppsw.htm";

//��½�ж�
var islogin = $.cookie("user_account") != undefined;

//�������
var style = "text-danger",
    glyphicon = "glyphicon glyphicon-remove-sign",
    title = "ʧ����ʾ",
    btn1 = "<a class=\"btn btn-danger\" onclick=\"window.location.reload()\">ȷ��<\/a>",
    btn2 = "",
    btn3 = "",
    url = "",
    navhtml = "";

//��½ע��
function aurl() {
    $("a#reg").attr("href", regurl);
    $("a#login").attr("href", loginurl);
}

//��ҳ����
function nav() {
    if(islogin) {
        navhtml = "<li><a href=\"" + readurl +
            "\">�Ķ���¼<\/a><\/li><li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript:void(0);\">�û�����<span class=\"caret\"><\/span><\/a><ul class=\"dropdown-menu\"><li><a href=\"" +
            collurl +
            "\"><i class=\"glyphicon glyphicon-tasks\"><\/i> �ҵ��ղ�<\/a><\/li><li class=\"divider\"></li><li><a href=\"" + atturl + "\"><i class=\"glyphicon glyphicon-user\"><\/i> �û�����<\/a><\/li><li class=\"divider\"></li><li><a href=\"" + uppsw + "\"><i class=\"glyphicon glyphicon-edit\"><\/i> �޸�����<\/a><\/li><li class=\"divider\"></li><li><a href=\"javascript:void(0);\" onclick=\"msgajax('exit');\"><i class=\"glyphicon glyphicon-off\"><\/i> �˳�<\/a><\/li><\/ul><\/li>"
    } else {
        navhtml = "<li><a href=\"javascript:void(0);\" onclick=\"msgloginno();\">�Ķ���¼<\/a><\/li><li><a href=\"" +
            loginurl + "\">��½</a></li><li><a href=\"" + regurl + "\">ע��</a></li>";
    }
    $("ul#nav").html(navhtml);

}

// ������
function search() {
    $("div#search").html(
        "<form class=\"navbar-form navbar-left\" role=\"search\" action=\"" + searchurl +
        "\" name=\"searchForm\" method=\"post\"><div class=\"input-group\"><input type=\"hidden\" name=\"module\" value=\"novel\"><input type=\"hidden\" name=\"type\" value=\"0\"><input type=\"text\" class=\"form-control\" placeholder=\"����������Ҫ�����Ĺؼ���\" id=\"bdcsMain\" name=\"key\" autocomplete=\"off\"><span class=\"input-group-btn\"><button type=\"submit\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-search\"><\/span><\/button><\/i><\/div><\/form>"
    );
}

//����ajax���ص���Ϣ
function msgshow(msg) {
    var content = msg["msg"];
    if(typeof(content) == "object") {
        content = msg["msg"]["info"];
    }
    if(msg["code"] == 200) {
        switch(content) {
            case "��ϲ����¼�ɹ���":
                btn1 = "<a class=\"btn btn-success\" href=\"" + readurl + "\">�Ķ���¼<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">������ҳ<\/a>";
                break;
            case "ע��ɹ������μ������˺����룡":
                btn1 = "<a class=\"btn btn-success\" href=\"" + readurl + "\">�Ķ���¼<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">������ҳ<\/a>";
                break;
            case "��ϲ�������޸ĳɹ���":
                btn1 = "<a class=\"btn btn-success\" href=\"" + loginurl + "\">���µ�½<\/a>";
                btn2 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">������ҳ<\/a>";
                break;
            case "��ϲ����ɾ���ɹ���":
                btn1 = "<a class=\"btn btn-success\" onclick=\"window.location.reload()\">ȷ��<\/a>";
                break;
            default:
                btn1 = "<a class=\"btn btn-success\" data-dismiss=\"modal\">ȷ��<\/a>";
        }
        style = "text-success";
        glyphicon = "glyphicon glyphicon-ok-sign";
        title = "�ɹ���ʾ";
        $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
        $("#Modal").modal("show");
        return true;
    } else {
        if(content == "���Ѿ��ɹ��˳���¼��3�����ת����ҳ��") {
            style = "text-success";
            glyphicon = "glyphicon glyphicon-ok-sign";
            title = "�ɹ���ʾ";
            btn1 = "<a class=\"btn btn-default\" onclick=\"window.location.href = '//'+window.location.host;\">������ҳ<\/a>";
            btn2 = "<script>window.setTimeout(\"location.href='//'+window.location.host;\", 3000);</script>";
        }
        $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
        $("#Modal").modal("show");
        return false;
    }
}

//�Ķ�����
function setup() {
    style = "text-warning";
    glyphicon = "glyphicon glyphicon-cog";
    title = "�Ķ�����";
    content = $("div#top").html();
    btn1 = "<a class=\"btn btn-default\" data-dismiss=\"modal\">�ر�<\/a>";
    $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
    $("#Modal").modal("show");
}

//δ��¼��ʾ
function msgloginno() {
    style = "text-warning";
    glyphicon = "glyphicon glyphicon-exclamation-sign";
    title = "δ��¼��ʾ";
    content = "�Բ�����Ҫ��¼����ʹ�ã�";
    btn1 = "<a class=\"btn btn-primary\" href=\"" + loginurl + "\">��¼<\/a>";
    btn2 = "<a class=\"btn btn-default\" href=\"" + regurl + "\">ע��<\/a>";
    btn3 = "<a class=\"btn btn-default\" data-dismiss=\"modal\">�ر�<\/a>";
    $("div#modal").html(msgt(style, glyphicon, title, content, btn1, btn2, btn3));
    $("#Modal").modal("show");
}

//��ʾģ��
function msgt(style, glyphicon, title, content, btn1, btn2, btn3) {
    var html =
        "<div class=\"modal fade\" id=\"Modal\" role=\"dialog\" aria-labelledby=\"ModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h4 class=\"modal-title " +
        style + "\" id=\"ModalLabel\"><i class=\"" + glyphicon + "\"><\/i> " + title +
        "<\/h4><\/div><div class=\"modal-body\">" + content + "<\/div><div class=\"modal-footer\">" + btn3 + btn2 + btn1 +
        "<\/div><\/div><\/div><\/div>"
    return html;
}

//��ʾget
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
                            $("button#coll").html("<i class=\"glyphicon glyphicon-star\"><\/i> �Ѿ��ղ�");
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

//�ֻ��ж�
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

//ĩβ
function foot() {
    if (!is_mobile()) {}
    $("div#foot").append("<p>��վ����С˵Ϊת����Ʒ�������½ھ��������ϴ���ת������վֻ��Ϊ�����������ø���������͡�</p>");
    //����
    $(function() {
        $("[data-toggle='popover']").popover();
    });
    search();
    nav();
  	//ͳ��
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