import brcypt from 'bcrypt';
export const hashPass=async(pass:string)=>{
return brcypt.hash(pass,10)
}
export  const verifyPass=(pass:string,hashedPass:string)=>{
return brcypt.compare(pass,hashedPass)
}