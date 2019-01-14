class TableSummary{

    readData(data){

        this.data=data;
        this.headers=["CUENTA","CONCEPTO",];
        this.dataset=[];

        if(this.data.length>0){

            let cube=[];

            this.data.forEach(cluster => {

                cluster.Super_Conceptos.forEach(matrix =>{
    
                    let square=[]
    
                    matrix.Cuentas.forEach(row=>{
        
                        let line=[];

                        line.push({value: row.Cuenta, key: row.Llave});

                        line.push({value: row.Concepto, key: row.Llave});
    
                        row.Modulos.forEach( modulo => {
    
                            line.push({value: modulo.Subtotal, key: modulo.Llave});
                            
                        });
                        
                    square.push(line);
                    
                    });
    
                    cube.push(square);
    
                });

                this.dataset.push(cube);
                
            });

        }

    }

    writeTable(divId){

        let table='';
        let body='';
        let head='';

        this.dataset.forEach(cluster => {

            cluster.forEach(matrix => {

                table+='<table>';

                matrix.forEach(row =>{

                    table+='<tr>';

                    for (let i = 0; i < row.length; i++) {

                        let cell=row[i];

                        console.log(cell);

                        table+='<td>';
                        table+=stdToEng(cell.value);
                        table+='</td>';
                        
                    }
                    
                    table+='</tr>';

                });

                table+='<table>';

            });
            
        });

        $(divId).html(table);

    }




}