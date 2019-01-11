class Breakdown{

    decodeData(response){

        this.data = JSON.parse(response);
        this.keyMatrix=[];
        this.valueMatrix=[];
        this.breakdownMatrix=[];
        this.table='';
        
        this.data.forEach(line => {

            let keyLine=[];
            let valueLine=[];

            for (let key in line) {

                if (line.hasOwnProperty(key)) {
    
                    keyLine.push(key);
                    
                    valueLine.push(line[key]);

                }
    
            }

            this.valueMatrix.push(valueLine);
            this.keyMatrix.push(keyLine);
            
        });

        //

        for (let i = 0; i < this.valueMatrix.length; i++) {

            let line = this.valueMatrix[i];

            let breakdownLine = [];
            for (let j = 0; j < line.length; j++) {

                let value = this.keyMatrix[i][j] + " : " + this.valueMatrix[i][j];

                breakdownLine.push(value);
                
            }

            this.breakdownMatrix.push(breakdownLine);

        }
        
    }

    breakdownTable(divId){

        this.table+='<table class="breakdown-table">'

        this.breakdownMatrix.forEach(row => {

            this.table+='<tr>'

            row.forEach(cell => {
                
                this.table+='<td class="breakdown-cell">'
                this.table+=cell;
                this.table+='</td>'
                
            });

            this.table+='</tr>'

        });

        this.table+='</table>'

        $(divId).html(this.table);

    }

    end(divId){

        $(divId).html("");
        this.table=[];
        this.breakdownMatrix=[];

    }


}