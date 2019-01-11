class FormResumen{

    readForm(){

        this.mes = $("#selectMes").val();

    }


    getUrl(rootUrl){

        let url=rootUrl+"/"+this.mes;

        return url;

    }

}