function getAllCou() {

    var delete_btn="<a class=\"btn btn-primary\" onclick=\"deleteCou()\">删除</a>";
    $("#delete_btn").html(delete_btn);

    var search_btn="<button class=\"btn btn-primary\" type=\"button\" onclick=\"selectCouClick()\"><i class=\"fa fa-search\"></i></button>";
    $("#search_btn").html(search_btn);

    var tableTitle=" <table class=\"table table-bordered \">\n" +
        "                        <thead class=\"thead-dark\">\n" +
        "                        <tr>\n" +
        "                            <th>#</th>\n" +
        "                            <th>课程编号</th>\n" +
        "                            <th>用户编号</th>\n" +
        "                            <th>课程名</th>\n" +
        "                            <th>图片链接</th>\n" +
        "                            <th>简介</th>\n" +
        "                            <th>地址</th>\n" +
        "                            <th>标签1</th>\n" +
        "                            <th>标签2</th>\n" +
        "                            <th>标签3</th>\n" +
        "                            <th>播放次数</th>\n" +
        "                            <th>收藏次数</th>\n" +
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
        url: "http://101.200.61.185:8080/api/courses/all",
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var course_id=data[i].course_id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var image_url=data[i].image_url;
                var introduction=data[i].introduction;
                var url=data[i].url;
                var tag1=data[i].tag1;
                var tag2=data[i].tag2;
                var tag3=data[i].tag3;
                var play_num=data[i].play_num;
                var bookmark_num=data[i].bookmark_num;
                var visible=data[i].visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='setings("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function(data){
            alert("fail");
        }

    });
}

function deleteCou() {
    for(var i=0;i<$("input[name='choose']").length;i++){
        if($("input[name='choose']")[i].checked){
            $.ajax({
                url: "http://101.200.61.185:8080/api/courses/?course_id="+$("input[name='choose']")[i].value,
                type: 'delete',
                error: function (result) {
                    alert("fail");
                }
            });
        }
    }
}
function selectByIdCou(course_id ) {
    var tableData="<tr>";
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/id?course_id="+course_id,
        dataType: 'json',
        type:'get',
        success:function(data){

                var course_id=data.course_id;
                var unionid=data.unionid;
                var name=data.name;
                var image_url=data.image_url;
                var introduction=data.introduction;
                var url=data.url;
                var tag1=data.tag1;
                var tag2=data.tag2;
                var tag3=data.tag3;
                var play_num=data.play_num;
                var bookmark_num=data.bookmark_num;
                var visible=data.visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='setings("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";

            $("#tbody").html(tableData);
        },
        error:function (result) {
            alert("fail")
        }
    });
}
function updateCou() {
    var course_id=$("#course_id").val();
    var unionid=$("#unionid").val();
    var name=$("#name").val();
    var image_url=$("#image_url").val();
    var introduction=$("#introduction").val();
    var url=$("#url").val();
    var tag1=$("#tag1").val();
    var tag2=$("#tag2").val();
    var tag3=$("#tag3").val();
    var play_num=$("#play_num").val();
    var bookmark_num=$("#bookmark_num").val();
    var visible=$("#visible").val();
    var data={
        "course_id":course_id,
        "unionid":unionid,
        "name":name,
        "image_url":image_url,
        "introduction":introduction,
        "url":url,
        "tag1":tag1,
        "tag2":tag2,
        "tag3":tag3,
        "play_num":play_num,
        "bookmark_num":bookmark_num,
        "visible":visible

    }
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/",
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

// 界面跳转
function setings(course_id) {

    sessionStorage.setItem('updateCou_num', course_id);
    window.location.href="updateCou.html";
}


// 更新并初始化编辑界面表格
function updateTable() {


    var num = sessionStorage.getItem('updateCou_num');
    console.log(num);
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/id?course_id="+num,
        dataType: 'json',
        type:'get',
        success:function(data){
            console.log(data);
            var tableData="<tr>";
            var course_id=data.course_id;
            var unionid=data.unionid;
            var name=data.name;
            var image_url=data.image_url;
            var introduction=data.introduction;
            var url=data.url;
            var tag1=data.tag1;
            var tag2=data.tag2;
            var tag3=data.tag3;
            var play_num=data.play_num;
            var bookmark_num=data.bookmark_num;
            var visible=data.visible;

            tableData+="<td><input type='text' id='course_id' value='"+course_id+"'></td>";
            tableData+="<td><input type='text' id='unionid' value='"+unionid+"'></td>";
            tableData+="<td><input type='text' id='name' value='"+name+"'></td>";
            tableData+="<td><input type='text' id='image_url' value='"+image_url+"'></td>";
            tableData+="<td><input type='text' id='introduction' value='"+introduction+"'></td>";
            tableData+="<td><input type='text' id='url' value='"+url+"'></td>";
            tableData+="<td><input type='text' id='tag1' value='"+tag1+"'></td>";
            tableData+="<td><input type='text' id='tag2' value='"+tag2+"'></td>";
            tableData+="<td><input type='text' id='tag3' value='"+tag3+"'></td>";
            tableData+="<td><input type='text' id='play_num' value='"+play_num+"'></td>";
            tableData+="<td><input type='text' id='bookmark_num' value='"+bookmark_num+"'></td>";
            tableData+="<td><input type='text' id='visible' value='"+visible+"'></td>";
            tableData+="</tr>";
            $("#tbody_updateCou").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function check(id) {
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/id?course_id="+id,
        dataType: 'json',
        type:'get',
        success:function(data){
            if(data.visible==true){
                $.ajax({
                    url: "http://101.200.61.185:8080/api/courses/check-no?id="+id,
                    type: 'put',
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
            }else {
                $.ajax({
                    url: "http://101.200.61.185:8080/api/courses/check-ok?id="+id,
                    type: 'put',
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

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function selectByIdUnionid(unionid) {
    var tableData="<tr>";
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/unionid?unionid="+unionid,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var course_id=data[i].course_id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var image_url=data[i].image_url;
                var introduction=data[i].introduction;
                var url=data[i].url;
                var tag1=data[i].tag1;
                var tag2=data[i].tag2;
                var tag3=data[i].tag3;
                var play_num=data[i].play_num;
                var bookmark_num=data[i].bookmark_num;
                var visible=data[i].visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function selectByTag1Course(tag1) {
    var tableData="<tr>";
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/tag1?tag1="+tag1,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var course_id=data[i].course_id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var image_url=data[i].image_url;
                var introduction=data[i].introduction;
                var url=data[i].url;
                var tag1=data[i].tag1;
                var tag2=data[i].tag2;
                var tag3=data[i].tag3;
                var play_num=data[i].play_num;
                var bookmark_num=data[i].bookmark_num;
                var visible=data[i].visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function selectByTag2Course(tag2) {
    var tableData="<tr>";
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/tag2?tag2="+tag2,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var course_id=data[i].course_id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var image_url=data[i].image_url;
                var introduction=data[i].introduction;
                var url=data[i].url;
                var tag1=data[i].tag1;
                var tag2=data[i].tag2;
                var tag3=data[i].tag3;
                var play_num=data[i].play_num;
                var bookmark_num=data[i].bookmark_num;
                var visible=data[i].visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function selectByTag3Course(tag3) {
    var tableData="<tr>";
    $.ajax({
        url: "http://101.200.61.185:8080/api/courses/tag3?tag3="+tag3,
        dataType: 'json',
        type:'get',
        success:function(data){
            for(var i=0;i<data.length;i++){
                var course_id=data[i].course_id;
                var unionid=data[i].unionid;
                var name=data[i].name;
                var image_url=data[i].image_url;
                var introduction=data[i].introduction;
                var url=data[i].url;
                var tag1=data[i].tag1;
                var tag2=data[i].tag2;
                var tag3=data[i].tag3;
                var play_num=data[i].play_num;
                var bookmark_num=data[i].bookmark_num;
                var visible=data[i].visible;

                tableData+="<th>"+"<input type='checkbox' name=\"choose\" value="+course_id+"></th>";
                tableData+="<td>"+course_id+"</td>";
                tableData+="<td>"+unionid+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+image_url+"</td>";
                tableData+="<td>"+introduction+"</td>";
                tableData+="<td>"+url+"</td>";
                tableData+="<td>"+tag1+"</td>";
                tableData+="<td>"+tag2+"</td>";
                tableData+="<td>"+tag3+"</td>";
                tableData+="<td>"+play_num+"</td>";
                tableData+="<td>"+bookmark_num+"</td>";
                tableData+="<td>"+visible+"</td>";
                tableData+="<td><button onclick='seting("+course_id+")'>编辑</button></td>";
                tableData+="<td><button onclick='check("+course_id+")'>审核</button></td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function (result) {
            alert("fail")
        }
    });

}
function selectItema() {

    var dropitem=" <a class=\"dropdown-item\" id='item_unionid' onclick='selectItem1()'>上传用户id</a>";
    dropitem+=" <a class=\"dropdown-item\" onclick='selectItem2()'>课程id</a>"
    dropitem +=" <a class=\"dropdown-item\" id='item_tag1' onclick='selectItem3()'>标签1</a>"
    dropitem +=" <a class=\"dropdown-item\" id='item_tag2' onclick='selectItem4()'>标签2</a>"
    dropitem +=" <a class=\"dropdown-item\" id='item_tag3' onclick='selectItem5()'>标签3</a>"
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
function selectItem4() {
    sessionStorage.setItem('dropitem', 4);
}
function selectItem5() {
    sessionStorage.setItem('dropitem', 5);
}
function selectCouClick() {
    var num = sessionStorage.getItem('dropitem');
    var input=$("#inlineFormInputGroup").val();
    console.log(num);
    if(num==1){
        selectByIdUnionid(input )
    }else if(num==2){
        selectByIdCou(input)
    }else if(num==3){
        selectByTag1Course(input)
    }else if(num==4){
        selectByTag2Course(input)
    }else if (num==5) {
        selectByTag3Course(input)
    }
    else{
            alert("fail");
        }

}

