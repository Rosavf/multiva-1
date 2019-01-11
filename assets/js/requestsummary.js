class RequestSummary{

    constructor(form,table){

        
        
    }

    readResponse(rootUrl,params){

        $(document).ready(function () {

            $.ajax({
        
                url:"back.php",
                data:"",
                method:"GET",
                success:function(response){
        
                    let data = JSON.parse(response);
                    this.table.readData(data);
                    this.table.writeTable("#table");
        
                }
        
            });
            
        });

    }

    

}