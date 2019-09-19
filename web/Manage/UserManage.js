// 查找全部用户
function getAllUser() {
    var delete_btn="<a class=\"btn btn-primary\" onclick=\"deleteUser()\">删除</a>";
    $("#delete_btn").html(delete_btn);

    var search_btn="<button class=\"btn btn-primary\" type=\"button\" onclick=\"selectUserClick()\"><i class=\"fa fa-search\"></i></button>";
    $("#search_btn").html(search_btn);

    var tableTitle="            <table  class=\"table table-bordered \">\n" +
        "              <thead class=\"thead-dark\">\n" +
        "                <tr>\n" +
        "                  <th>#</th>\n" +
        "                  <th>用户id编号</th>\n" +
        "                  <th>姓名</th>\n" +
        "                  <th>性别</th>\n" +
        "                  <th>隐私设置</th>\n" +
        "                  <th>标签</th>\n" +
        "                  <th>粉丝数目</th>\n" +
        "                  <th>签到时间</th>\n" +
        "                  <th>积分</th>\n" +
        "                  <th>编辑</th>\n" +
        "                </tr>\n" +
        "              </thead>\n" +
        "\n" +
        "              <tbody id=\"tbody\">\n" +
        "\n" +
        "              </tbody>\n" +
        "            </table>";
    $("#tab").html(tableTitle);


    var tableData="<tr>";

    $.ajax({
        url: "http://localhost:8080/api/users/all",
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var unionid=data[i].unionid;
                var name=data[i].name;
                var sex=data[i].sex;
                var privacy=data[i].privacy;
                var tag=data[i].tag;
                var follow_num=data[i].follow_num;
                var punch_time=data[i].punch_time;
                var point=data[i].point;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+unionid+"></th>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+sex+"</td>";
                tableData+="<td>"+privacy+"</td>";
                tableData+="<td>"+tag+"</td>";
                tableData+="<td>"+follow_num+"</td>";
                tableData+="<td>"+punch_time+"</td>";
                tableData+="<td>"+point+"</td>";
                tableData+="<td><button onclick='setUsering("+unionid+")'>编辑</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function(data){
            alert("fail");
        }

    });
}

// 删除用户
function deleteUser() {
    for(var i=0;i<$("input[name='choose']").length;i++){
        if($("input[name='choose']")[i].checked){
            $.ajax({
                url: "http://localhost:8080/api/users/?unionid="+$("input[name='choose']")[i].value,
                type: 'delete',
                error: function (result) {
                    alert("fail");
                }
            });
        }
        }



}

// 更新用户信息
function updateUser() {
    var unionid=$("#unionid").val();
    var name=$("#name").val();
    var sex=$("#sex").val();
    var privacy=$("#privacy").val();
    var tag=$("#tag").val();
    var follow_num=$("#follow_num").val();
    var punch_time=$("#punch_time").val();
    var point=$("#point").val();
    var data={
        "unionid":unionid,
        "name":name,
        "sex":sex,
        "privacy":privacy,
        "tag":tag,
        "follow_num":follow_num,
        "punch_time":punch_time,
        "point":point

    }
            $.ajax({
                url: "http://localhost:8080/api/users/",
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
// 查找指定id用户
function selectById(unionid ) {
    $.ajax({
        url: "http://localhost:8080/api/users/unionid?unionid="+unionid,
        dataType: 'json',
        type:'get',
        success:function(data){
            var tableData="<tr>";
            var unionid=data.unionid;
            var name=data.name;
            var sex=data.sex;
            var privacy=data.privacy;
            var tag=data.tag;
            var follow_num=data.follow_num;
            var punch_time=data.punch_time;
            var point=data.point;
            tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+unionid+"></th>";
            tableData+="<td>"+unionid+"</td>";
            tableData+="<td>"+name+"</td>";
            tableData+="<td>"+sex+"</td>";
            tableData+="<td>"+privacy+"</td>";
            tableData+="<td>"+tag+"</td>";
            tableData+="<td>"+follow_num+"</td>";
            tableData+="<td>"+punch_time+"</td>";
            tableData+="<td>"+point+"</td>";
            tableData+="<td><button onclick='setUsering("+unionid+")'>编辑</button></td>";
            tableData+="</tr>";
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("查无此人")
        }
    });
}
// 界面跳转
function setUsering(unionid) {

    sessionStorage.setItem('updateUser_num', unionid);
    window.location.href="updateUser.html";
}

// 更新并初始化编辑界面表格
function updateTable() {


    var num = sessionStorage.getItem('updateUser_num');
    console.log(num);
    $.ajax({
        url: "http://localhost:8080/api/users/unionid?unionid="+num,
        dataType: 'json',
        type:'get',
        success:function(data){
            console.log(data);
            var tableData="<tr>";
            var unionid=data.unionid;
            var name=data.name;
            var sex=data.sex;
            var privacy=data.privacy;
            var tag=data.tag;
            var follow_num=data.follow_num;
            var punch_time=data.punch_time;
            var point=data.point;
            tableData+="<td><input type='text' id='unionid' value='"+unionid+"'></td>";
            tableData+="<td><input type='text' id='name' value='"+name+"'></td>";
            tableData+="<td><input type='text' id='sex' value='"+sex+"'></td>";
            tableData+="<td><input type='text' id='privacy' value='"+privacy+"'></td>";
            tableData+="<td><input type='text' id='tag' value='"+tag+"'></td>";
            tableData+="<td><input type='text' id='follow_num' value='"+follow_num+"'></td>";
            tableData+="<td><input type='text' id='punch_time' value='"+punch_time+"'></td>";
            tableData+="<td><input type='text' id='point' value='"+point+"'></td>";
            tableData+="</tr>";
            $("#tbody_updateUser").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}

function selectByName(name) {
    var tableData="<tr>";
    $.ajax({
        url: "http://localhost:8080/api/users/name?name="+name,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var unionid=data[i].unionid;
                var name=data[i].name;
                var sex=data[i].sex;
                var privacy=data[i].privacy;
                var tag=data[i].tag;
                var follow_num=data[i].follow_num;
                var punch_time=data[i].punch_time;
                var point=data[i].point;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+unionid+"></th>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+sex+"</td>";
                tableData+="<td>"+privacy+"</td>";
                tableData+="<td>"+tag+"</td>";
                tableData+="<td>"+follow_num+"</td>";
                tableData+="<td>"+punch_time+"</td>";
                tableData+="<td>"+point+"</td>";
                tableData+="<td><button onclick='setUsering("+unionid+")'>编辑</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("查无此人")
        }
    });

}

function selectByNameLike(name) {
    var tableData="<tr>";
    $.ajax({
        url: "http://localhost:8080/api/users/namelike?name="+name,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var unionid=data[i].unionid;
                var name=data[i].name;
                var sex=data[i].sex;
                var privacy=data[i].privacy;
                var tag=data[i].tag;
                var follow_num=data[i].follow_num;
                var punch_time=data[i].punch_time;
                var point=data[i].point;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+unionid+"></th>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+sex+"</td>";
                tableData+="<td>"+privacy+"</td>";
                tableData+="<td>"+tag+"</td>";
                tableData+="<td>"+follow_num+"</td>";
                tableData+="<td>"+punch_time+"</td>";
                tableData+="<td>"+point+"</td>";
                tableData+="<td><button onclick='setUsering("+unionid+")'>编辑</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("查无此人")
        }
    });

}
function selectItem() {
    var dropitem=" <a class=\"dropdown-item\" id='item_unionid' onclick='selectItem1()'>用户id</a>";
    dropitem +=" <a class=\"dropdown-item\" id='item_name' onclick='selectItem2()'>用户姓名</a>"
    dropitem +=" <div class=\"dropdown-divider\"></div>"
    dropitem +=" <a class=\"dropdown-item\" id='item_namelike' onclick='selectItem3()'>用户姓名模糊查询</a>"
    $("#drop").html(dropitem);
}

function selectItem1() {
    sessionStorage.setItem('dropitem', 1);
}
function selectItem2() {
    sessionStorage.setItem('dropitem', 2);
}
function selectItem3() {
    sessionStorage.setItem('dropitem', 3);
}
function selectUserClick() {
    var num = sessionStorage.getItem('dropitem');
    var input=$("#inlineFormInputGroup").val();
    console.log(num);
    if(num==1){
        selectById(input )
    }else if(num==2){
        selectByName(input)
    }else if(num==3){
        selectByNameLike(input)
    }else {
        alert("fail");
    }

}

