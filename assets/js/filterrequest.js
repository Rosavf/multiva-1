class FilterRequest{

    constructor (dep){

        this.form=dep;
        this.form.readForm();
        let filters=this.form.getRequest();
        this.setRequestPack(filters);
        this.createUrlPack("http://35.243.156.112/servicio/balanza","/limpiar/limpiador","/importar/mensual/","/importar/acumulado/","/importar/desglose/");
        this.requestNormalize();
        this.requestCascade();

    }

    setRequestPack(requestData){

        this.requestData=requestData;

        console.log(this.requestData);

    }

    createUrlPack(urlRoot,urlLimpiador,urlMensual,urlAcumulado,urlDesgloses){

        //
        this.urlPack = {

            limpiador:"",
            mensual:[],
            acumulado:[],
            desgloses:[]

        };

        //

        console.log(this.requestData.modulos);

        this.requestData.modulos.forEach(modulo => {

            let params = "";
            params+= this.requestData.anualidad;
            params+="-";
            params+= this.requestData.meses;
            params+="-";
            params+= modulo;

            let mensual="";
            mensual+=urlRoot;
            mensual+=urlMensual;
            mensual+=params;

            let acumulado="";
            acumulado+=urlRoot;
            acumulado+=urlAcumulado;
            acumulado+=params;
            
            let desgloses="";
            desgloses+=urlRoot;
            desgloses+=urlDesgloses;
            desgloses+=params;  


            this.urlPack.desgloses.push(desgloses);
            this.urlPack.acumulado.push(acumulado);
            this.urlPack.mensual.push(mensual);
   
        });

        this.urlPack.limpiador+=urlRoot;
        this.urlPack.limpiador+=urlLimpiador;

    }

    //
    requestNormalize(){

        this.requestUrls=[];

        this.requestUrls.push(this.urlPack.limpiador);

        this.urlPack.mensual.forEach(url => {this.requestUrls.push(url);});
        this.urlPack.acumulado.forEach(url => {this.requestUrls.push(url);});
        this.urlPack.desgloses.forEach(url => {this.requestUrls.push(url);});

        console.log(this.requestUrls);

    }

    //
    requestCascade(){

        let index=0;

        this.requestUrls.forEach(url => {

            $.ajax({

                method:"GET",
    
                url:url,
    
                data:"",

                success:function(response){

                    console.log("OK");

                },
                timeout: 500000
    
            });

            
        });

    }

    //
    
}