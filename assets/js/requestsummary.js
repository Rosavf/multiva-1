class RequestSummary{

    constructor(rootUrl,form,table){

        this.readResponse(rootUrl,form,table);

    }

    readResponse(rootUrl,form,table){

        this.form = form;
        this.form.readForm("#selectType","#selectMonth");
        let params = this.formgetParams();
        console.log(params);
        let reqUrl=rootUrl+"/"+"mensual"+"/"+"3"

        $("#btnSummary").click(function(){

            $(document).ready(function () {

                $.ajax({
            
                    url:reqUrl,
                    data:"",
                    method:"GET",
                    success:function(response){

                        console.log(response);
                        this.table = table;
                        let data = JSON.parse(response);
                        this.table.readData(data);
                        this.table.writeTable("#datatable");
            
                    }
            
                });
                
            });

        });
        
    }

}