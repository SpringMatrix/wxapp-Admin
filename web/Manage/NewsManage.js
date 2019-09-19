function getAllNews() {

    var delete_btn="<a class=\"btn btn-primary\" onclick=\"deleteByIdNews()\">删除</a>";
    $("#delete_btn").html(delete_btn);



    var tableTitle="<table class=\"table table-bordered \">\n" +
        "                        <thead class=\"thead-dark\">\n" +
        "                        <tr>\n" +
        "                            <th>#</th>\n" +
        "                            <th>动态编号</th>\n" +
        "                            <th>用户id</th>\n" +
        "                            <th>姓名</th>\n" +
        "                            <th>头像链接</th>\n" +
        "                            <th>内容</th>\n" +
        "                            <th>时间</th>\n" +
        "                            <th>审核状态</th>\n" +
        "                            <th>编辑</th>\n" +
        "                            <th>审核</th>\n" +
        "                        </tr>\n" +
        "                        </thead>\n" +
        "\n" +
        "                        <tbody id=\"tbody\">\n" +
        "\n" +
        "                        </tbody>\n" +
        "                    </table>";
    $("#tab").html(tableTitle);
    var tableData="<tr>";

    $.ajax({
        url: "http://localhost:8080/api/news/all",
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var id=data[i].id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var avatar=data[i].avatar;
                var content=data[i].content;
                var time=data[i].time;
                var visible=data[i].visible;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+id+"></th>";
                tableData+="<td>"+id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+avatar+"</td>";
                tableData+="<td>"+content+"</td>";
                tableData+="<td>"+time+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function(data){
            alert("fail");
        }

    });
}

function deleteByIdNews() {
    for(var i=0;i<$("input[name='choose']").length;i++){
        if($("input[name='choose']")[i].checked){
            $.ajax({
                url: "http://localhost:8080/api/news/?id="+$("input[name='choose']")[i].value,
                type: 'delete',
                error: function (result) {
                    alert("fail");
                }
            });
        }
    }
}
function updateNews() {
    var id=$("#id").val();
    var unionid=$("#unionid").val();
    var name=$("#name").val();
    var avatar=$("#avatar").val();
    var content=$("#content").val();
    var time=$("#time").val();
    var visible=$("#visible").val();
    var data={
        "id":id,
        "unionid":unionid,
        "name":name,
        "avatar":avatar,
        "content":content,
        "time":time,
        "visible":visible,

    }
    $.ajax({
        url: "http://localhost:8080/api/news/",
        type: 'put',
        data:JSON.stringify(data),
        cache: false,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success:function (result) {
            if (result){
                window.location.href="admin.html";
            }else{
                alert("更改失败");
            }
        },
        error: function (result) {
            alert("fail");
        }
    });
}
function selectByIdNews(id) {
    var tableData="<tr>";
        $.ajax({
        url: "http://localhost:8080/api/news/id?id="+id,
        dataType: 'json',
        type:'get',
            success:function(data){
                    if(data.id!=null) {


                        var id = data.id;
                        var unionid = data.unionid;
                        var name = data.name;
                        var avatar = data.avatar;
                        var content = data.content;
                        var time = data.time;
                        var visible = data.visible;
                        tableData += "<th>" + "<input type=\"checkbox\" name=\"choose\" value=" + id + "></th>";
                        tableData += "<td>" + id + "</td>";
                        tableData += "<td>" + unionid + "</td>";
                        tableData += "<td>" + name + "</td>";
                        tableData += "<td>" + avatar + "</td>";
                        tableData += "<td>" + content + "</td>";
                        tableData += "<td>" + time + "</td>";
                        tableData += "<td>" + visible + "</td>";
                        tableData += "<td><button onclick='seting(" + id + ")'>编辑</button></td>";
                        tableData += "<td><button onclick='check(" + id + ")'>审核</button></td>";
                        tableData += "</tr>";

                        $("#tbody").html(tableData);
                    }
        },
        error:function (result) {
            alert("fail")
        }
    });
}
function selectByUnionidNews(unionid) {
    var tableData="<tr>";
    $.ajax({
        url: "http://localhost:8080/api/news/unionid?unionid="+unionid,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var id=data[i].id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var avatar=data[i].avatar;
                var content=data[i].content;
                var time=data[i].time;
                var visible=data[i].visible;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+id+"></th>";
                tableData+="<td>"+id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+avatar+"</td>";
                tableData+="<td>"+content+"</td>";
                tableData+="<td>"+time+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });
}

function seting(id) {

    sessionStorage.setItem('updatenew_num', id);
    window.location.href="updatenew.html";
}
function updateTable() {


    var num = sessionStorage.getItem('updatenew_num');
    console.log(num);
    $.ajax({
        url: "http://localhost:8080/api/news/id?id="+num,
        dataType: 'json',
        type:'get',
        success:function(data){
            console.log(data);
            var tableData="<tr>";
            var id=data.id;
            var unionid=data.unionid;
            var name=data.name;
            var avatar=data.avatar;
            var content=data.content;
            var time=data.time;
            var visible=data.visible;
            tableData+="<td><input type='text' id='id' value='"+id+"'></td>";
            tableData+="<td><input type='text' id='unionid' value='"+unionid+"'></td>";
            tableData+="<td><input type='text' id='name' value='"+name+"'></td>";
            tableData+="<td><input type='text' id='avatar' value='"+avatar+"'></td>";
            tableData+="<td><input type='text' id='content' value='"+content+"'></td>";
            tableData+="<td><input type='text' id='time' value='"+time+"'></td>";
            tableData+="<td><input type='text' id='visible' value='"+visible+"'></td>";
            tableData+="</tr>";
            $("#tbody_updatenew").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function check(id) {
    $.ajax({
        url: "http://localhost:8080/api/news/id?id="+id,
        dataType: 'json',
        type:'get',
        success:function(data){
            if(data.visible==true){
                $.ajax({
                    url: "http://localhost:8080/api/news/check-no?id="+id,
                    type: 'put',
                    cache: false,
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    success:function (result) {
                        if (result){
                            window.location.href="news.html";
                        }else{
                            alert("更改失败");
                        }
                    },
                    error: function (result) {
                        alert("fail");
                    }
                });
            }else {
                $.ajax({
                    url: "http://localhost:8080/api/news/check-ok?id="+id,
                    type: 'put',
                    cache: false,
                    dataType: "json",
                    contentType: "application/json;charset=UTF-8",
                    success:function (result) {
                        if (result){
                            window.location.href="news.html";
                        }else{
                            alert("更改失败");
                        }
                    },
                    error: function (result) {
                        alert("fail");
                    }
                });
            }

        },
        error:function (result) {
            alert("fail")
        }
    });

}

function selectItemb() {
    var dropitem=" <a class=\"dropdown-item\" onclick='selectItem1()'>动态id</a>";
    dropitem +=" <a class=\"dropdown-item\" onclick='selectItem2()'>用户id</a>"
    $("#drop").html(dropitem);
}

function selectItem1() {
    sessionStorage.setItem('dropitem', 1);
}
function selectItem2() {
    sessionStorage.setItem('dropitem', 2);
}
function selectClick() {
    var num = sessionStorage.getItem('dropitem');
    var input=$("#inlineFormInputGroup").val();
    console.log(num);
    console.log(input);
    if(num==1){
        selectByIdNews(input )
    }else if(num==2){
        selectByUnionidNews(input)
    }else {
        alert("fail");
    }

}



















