export const getIntials = (name) =>{
    if(!name) return "";
    const words= name.split(" ");
    let intials="";
    for(let i=0;i<Math.min(words.length,2);i++)
    {
        intials +=words[i][0];
    }
    return intials.toUpperCase();
}




