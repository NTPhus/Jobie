export const generateToken = () => {
   var rand = Math.random().toString(36).substr(2);;
   return rand + rand;
}