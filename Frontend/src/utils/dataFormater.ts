export const dataFormater = (data:string | undefined | null) =>{
    if(data === undefined || data === null) return undefined;
    if(data.indexOf("-") !== -1 ) return data.slice(8, 10) + "/" + data.slice(5, 7) + "/" + data.slice(0, 4);
    if(data.indexOf("/") !== -1 ) return data.slice(6, 10) + '-' + data.slice(3, 5) + '-' + data.slice(0, 2);
} 