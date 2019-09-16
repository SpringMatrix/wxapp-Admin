

function getAllUser() {
    var tableData="<tr>";

    $.ajax({
        url: "http://localhost:8080/api/users/all",
        dataType: 'json',
        type:'get',

        success:function(data){
            for(var i=0;i<data.length;i++){
                var uniond=data[i].unionid;
                var name=data[i].name;
                var sex=data[i].sex;
                var privacy=data[i].privacy;
                var tag=data[i].tag;
                var follow_num=data[i].follow_num;
                var punch_time=data[i].punch_time;
                var point=data[i].point;
                tableData+="<th>"+"<input type=\"checkbox\" name=\"choose\" value="+uniond+"></th>";
                tableData+="<td>"+uniond+"</td>";
                tableData+="<td>"+name+"</td>";
                tableData+="<td>"+sex+"</td>";
                tableData+="<td>"+privacy+"</td>";
                tableData+="<td>"+tag+"</td>";
                tableData+="<td>"+follow_num+"</td>";
                tableData+="<td>"+punch_time+"</td>";
                tableData+="<td>"+point+"</td>";
                tableData+="</tr>";
            }
            $("#tbody").html(tableData);

        },
        error:function(data){
            alert("fail");
        }

    });
}


function deleteUser() {

    alert($("input[name='choose']")[1].value)
    for(var i=0;i<$("input[name='choose']").length;i++){
        if($("input[name='choose']")[i].checked){
            var data={
                "unionid":$("input[name='choose']")[i].value
            };

            $.ajax({
                url: "http://localhost:8080/api/users/",
                dataType: 'json',
                type: 'delete',
                contentType: "application/json;charset=UTF-8",
                data:JSON.stringify(data),
                success: function (result) {
                    alert(result);
                },
                error: function (result) {
                    alert("fail");
                }
            });
        }
        }
    getAllUser();
}
