
export function convertMinutesToHours (minutesAmount: number) :string{

    let hours :number = Math.floor( minutesAmount/60);
    let minutes :number = minutesAmount % 60;

    let hoursFormated = String(hours).padStart(2, '0'); 
// ADICIONA À FRENTE DO NUMERO DE HORAS UM '0' CASO O NÚMERO DE DÍGITOS DAS HORAS FOR MENOR QUE 2
    
    let minutesFormated = String(minutes).padStart(2, '0');
// ADICIONA À FRENTE DO NUMERO DE MINUTOS UM '0' CASO O NÚMERO DE DÍGITOS DOS MINUTOS FOR MENOR QUE 2
    return `${hoursFormated}:${minutesFormated}`;
}