class TableBreakdown{

    constructor(tableId,jsonData){

        this.readData(jsonData);
        this.decodeData();
        this.tableHeaders();
        this.tableBody();
        this.fullTable();
        this.printTable(tableId);

    }

    readData(jsonData){

        this.data=JSON.parse(jsonData);
        this.superConceptos=["FACTOR HUMANO","GASTOS GENERALES"];

    }

    decodeData(){

        // headers, llaves de desglose y matriz de datos
        this.headers = [];
        this.cluster = [];
        this.keyCluster = [];
        this.size = this.data.length;

        // si el tamano es mayor a 0 parseamos los datos
        if(this.size>0){

            // creamos encabezados
            let line=this.data[0];
            this.headers = [];
            let mensualidades=line.Meses;
            let meses = [];

            // creamos los meses basados en su numero
            for(let i=0; i<mensualidades.length; i++){

                let mensualidad=mensualidades[i].Mes;
                let mes;

                // mes de numero a palabra
                switch (mensualidad) {

                    case "1": mes="Enero"; break;
                    case "2": mes="Febrero"; break;
                    case "3": mes="Marzo"; break;
                    case "4": mes="Abril"; break;
                    case "5": mes="Mayo"; break;
                    case "6": mes="Junio"; break;
                    case "7": mes="Julio"; break;
                    case "8": mes="Agosto"; break;
                    case "9": mes="Septiembre"; break;
                    case "10": mes="Octubre"; break;
                    case "11": mes="Noviembre"; break;
                    case "12": mes="Diciembre"; break;
                
                    default: break;
                }

                meses.push(mes);

            }

            //agregamos concepto al header
            this.headers.push("Concepto");

            //agregamos meses al header
            meses.forEach(mes => {

                this.headers.push(mes);

            });

            // iteramos superconceptos dados en parametros
            for (let i = 0; i < this.superConceptos.length; i++) {

                let superConcepto = this.superConceptos[i];

                //creamos matriz temporal e iteramos
                let matrix=[];
                let keyMatrix=[];

                this.data.forEach(line => {

                    //solo agregaremos datos a la matriz de coincidir el superconcepto
                    if(line.Super_Concepto == superConcepto){
                    
                        let row=[];
                        let keyRow=[];

                        row.push(line.Concepto);
                        keyRow.push('none');

                        let mensuales=line.Meses;

                        mensuales.forEach(mensual => {

                            let subtotal=mensual.Subtotal;
                            row.push(subtotal);
                            keyRow.push(mensual.Llave);

                        });

                        matrix.push(row);
                        keyMatrix.push(keyRow);

                    }
                    //acaba el condicional

                });
                //terminamos de leer matriz

                this.cluster.push(matrix);
                this.keyCluster.push(keyMatrix);

            }
            // fin de ciclo de superconceptos

        }
        // termina el condicional donde existen datos

    }

    tableHeaders(){

        this.head = '';
        this.head += '<thead>';
        this.head += '<tr>';

        this.headers.forEach(header => {
            
            this.head += '<th>';
            this.head += header;
            this.head += '</th>';

        });

        this.head+='</tr>';
        this.head+='</thead>';

    }

    tableBody(){

        this.body='';

        this.body+='<tbody>';

        for (let h = 0; h < this.cluster.length; h++) {

            this.body+='<tr>';

            this.body+='</tr>';
            this.body+='<tr>';
            this.body+='<th>';
            this.body+=this.superConceptos[h];
            this.body+='</th>';
            this.body+='</tr>';
            this.body+='<tr>';

            this.body+='</tr>';

            let matrix=this.cluster[h];

            for(let i=0; i<matrix.length; i++){

                let line=matrix[i];

                this.body+='<tr>';

                for(let j=0; j<line.length; j++){

                    if(j==0){

                        this.body+='<td>';
                        this.body+='<a class = "table-graph" id = "key-';
                        this.body+=h.toString();
                        this.body+='-';
                        this.body+=i.toString();                        
                        this.body+='">';
                        this.body+=this.cluster[h][i][j];
                        this.body+='</td>';

                    }

                    else{



                        this.body+='<td>';
                        this.body+='<a class = "table-breakdown" id = "';
                        this.body+=this.keyCluster[h][i][j];
                        this.body+='">';
                        this.body+=stdToEng(this.cluster[h][i][j]);
                        this.body+='</a>';
                        this.body+='</td>';

                    }

                }

                this.body+='</tr>';

            }
            
        }

        this.body+='</tbody>'

    }

    fullTable(){

        this.table='';
        this.table+=this.head;
        this.table+=this.body;

    }

    printTable(tableId){

        $(tableId).html(this.table);
        
    }

    getRow(indiceSuperconcepto,indiceCuenta){

        let values=[];

        let labels=[];

        let data={

            values:[],

            labels:[],

            label:''

        };

        this.cluster[indiceSuperconcepto][indiceCuenta].forEach(cell => {

            values.push(cell);
            
        });

        this.headers.forEach(cell => {

            labels.push(cell);
            
        });

        for (let i = 1; i < values.length; i++) {
            
            data.values.push(parseInt(values[i]));
            data.labels.push(labels[i]);

        }

        data.label=values[0];

        return data;

    }


}