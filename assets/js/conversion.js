function stdToEng(num){

    let float = parseFloat(num);
    let number = float.toFixed(2);
    let components=number.split(".",2);
    let int = components[0];
    let dec = components[1];
    let result = []

    for (let i = 0; i < int.length; i++) {

        const j = (int.length-i)-1;
        const k = i+1;
        const c = int.substr(j,1);

        if((k%3===0)&&(j!==0)&&(int.substr(0,1)!=="-")){

            result.push(c);
            result.push(",");

        }

        else{

            result.push(c);

        }

    }

    let numEng='';

    for (let i = 0; i < result.length; i++) {

        const j=(result.length-i)-1;
        const c=result[j];
        numEng+=c;

    }

    numEng+=".";
    numEng+=dec;

    return numEng;

}