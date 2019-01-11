class FilterForm{

    readForm(){

        this.filters = {

            anualidad : $("#selectAnualidad").val(),
            meses : $("#selectMeses").val(),
            modulos:["CASA","BANCO","OPERADORA","SAVELLA","GRUPO","SERVICIOS"]

        };

    }

    getRequest(){

        return this.filters;

    }

}