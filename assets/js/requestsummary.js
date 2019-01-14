class RequestSummary{

    constructor(rootUrl,form,table){

        this.readResponse(rootUrl,form,table);

    }

    readResponse(rootUrl,form,table){

        this.form = form;
        this.form.readForm("#selectType","#selectMonth");
        let params = this.form.getParams();

        let reqUrl=rootUrl+"/"+params.type+"/"+params.month;

        console.log(reqUrl);

        $("#btnSummary").click(function(){


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

        
    }

}