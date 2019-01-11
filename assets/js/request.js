class  Request{

    constructor(urlTable,urlBreakdown,type){

        this.tableRequest(urlTable,urlBreakdown,type);

    }

    tableRequest(urlTable,urlBreakdown,type) {

        $.ajax({
    
            url:urlTable,
            method:"GET",
            data:"",
    
            success: function(response){
                
                //comienzan las funciones
                if(type==0){

                    let show=false;
                    var myChart;
                    myChart= new MyChart();

                    var tableBreakdown = new TableBreakdown("#datatable",response);
                    var breakdown = new Breakdown();

                    //funcion de desgloses
                    $(".table-breakdown").click(function(){

                        //
                        let value = $(this).attr('id');
                        let url = urlBreakdown+"/"+value;

                        console.log(url);

                        $.ajax({
                    
                            //
                            url:url,
                            method:"GET",
                            data:"",
                    
                            success:function(response){

                                //
                                $("#desglose").show();
                                breakdown.decodeData(response);
                                breakdown.breakdownTable("#modalTable");

                            }
                    
                        });


                    });

                    $(".breakdown-close").click(function(){

                        $('.modal').hide("#desglose");
                        breakdown.end("#modalTable");

                    });

                    //funcion de graficas
                    $(".table-graph").click(function(){

                        if(show==false){

                            let key=$(this).attr('id');
                            let params=key.split("-",3);

                            let indexSuperconcepto=parseInt(params[1]);
                            let indexConcepto=parseInt(params[2]);
                            let row = tableBreakdown.getRow(indexSuperconcepto,indexConcepto);

                            console.log(row);
                            $('#chartDiv').show();
                            myChart.begin(row.label,'bar',row.labels,row.values);
                            show=true;

                        } else {

                        }

                    });

                    //funcion para cerrar graficas
                    $(".table-close").click(function(){

                        $('#chartDiv').hide();

                        if(show==true){

                            myChart.end();
                            show=false;

                        } else {  }

                    });



                }
                //termina tabla animada

                else if(type==1){

                    var tableSingle = new TableSingle("#datatable",response);

                }

                else if(type==2){

                    var tableReport = new TableReport("#datatable",response);

                }

                else{
                       

                        
                }
    
            }
    
        });
    
    }

}


