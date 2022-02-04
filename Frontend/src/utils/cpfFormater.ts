export const cpfFormater = (cpf:string | undefined | null) => {
    if(cpf === undefined || cpf === null) return "";
     cpf = cpf.slice(0, 3) + "." + cpf.slice(3);
     cpf = cpf.slice(0, 7) + "." + cpf.slice(7);
    return cpf = cpf.slice(0, 11) + "-" + cpf.slice(11);
     
}