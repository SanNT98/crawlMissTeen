

$.ajax({
    type:"POST",
    url: "http://localhost:3000/", 
    contentType:"json",
    success:function(result){ 
        result.forEach(item => {
            $("#table").append(`
            <tr>
                <td>${item.sbd}</td>
                <td>${item.ten}</td>
                <td>${item.tuoi}</td>
                <td>${item.chieuCao}</td>
                <td>${item.que}</td>
            </tr>
            `)
        })
            
        
    }
})

$("#button1").click(function(){
    var data={
        data:$("#timKiem").val()
    }
    $.ajax({
        type:"POST",
        url:"http://localhost:3000/timkiem",
        contentType:"application/json",
        data:JSON.stringify(data),
        success:function(result){
            console.log(result);
        }
    })
})