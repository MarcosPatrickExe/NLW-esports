
export function convertHourStringToMinutes (hourString: string) :number{

    const [hours, minutes] = hourString.split(':').map(Number);// retorna [18, 43]

    return ((hours*60) + minutes);
}