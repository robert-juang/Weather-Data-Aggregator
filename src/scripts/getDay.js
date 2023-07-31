export default function getDay(date) {

    const info = date.split("-") 

    const dt = new Date(`${info[0]} ${info[1]}, ${info[2]} 00:00:00`);

    const num = dt.getDay(); 

    switch(num){
        case 0: 
            return "Sun"
        case 1: 
            return "Mon" 
        case 2: 
            return "Tues" 
        case 3: 
            return "Wed"
        case 4: 
            return "Thurs"
        case 5: 
            return "Fri"
        case 6: 
            return "Sat"
        default: 
            return "N/A"
    }
}
