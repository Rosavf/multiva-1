class RequestSummary{

    constructor(rootUrl,form,table){




    }

    readResponse(rootUrl,form,table){

        let reqUrl=rootUrl+"/"+"mensual"+"/"+"3"

        $("#btnSummary").click(function(){

            $(document).ready(function () {

                $.ajax({
            
                    url:requrl,
                    data:"",
                    method:"GET",
                    success:function(response){
            
                        let data = JSON.parse(response);
                        this.table.readData(data);
                        this.table.writeTable("#table");
            
                    }
            
                });
                
            });

        });
        
    }

}