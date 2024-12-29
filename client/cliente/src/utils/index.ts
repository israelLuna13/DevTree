//the function join class separate for space white
//return the text with the join class
// function classNames(...classes: string[]) {
//     return classes.filter(Boolean).join(' ')
// }

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function isValidUrl(url:string)
{
    try {
        new URL(url)
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}


