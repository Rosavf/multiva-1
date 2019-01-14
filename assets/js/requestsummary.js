class RequestSummary{

    constructor(rootUrl,form,table){

        this.readResponse(rootUrl,form,table);

    }

    readResponse(rootUrl,form,table){

        let form = form;
        let table = table;
        let reqUrl=rootUrl+"/"+"mensual"+"/"+"3"

        $("#btnSummary").click(function(){

            $(document).ready(function () {

                $.ajax({
            
                    url:reqUrl,
                    data:"",
                    method:"GET",
                    success:function(response){
            
                        let data = JSON.parse(response);
                        table.readData(data);
                        table.writeTable("#table");
            
                    }
            
                });
                
            });

        });
        
    }

}