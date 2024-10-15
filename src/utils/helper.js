// Validate email format
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};





export const getintials = (name) => {
    if (!name ) return "";
    const words = name.split(" ");
    let initials =""
    for (let i =0;i<Math.min(words.length,2);i++){
        initials+=words[i][0]
    }
    return initials.toUpperCase();
}
export const capitalizeFirstLetter = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  