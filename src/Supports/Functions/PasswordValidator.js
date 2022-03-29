// PASSWORD VALIDATOR
// 1. Minimum 8 digit
// 2. Harus memiliki angka dan huruf

function PasswordValidator(inputUser){
    if(inputUser.length >8){
        const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        let lowercaseExists = false,
            uppercaseExists = false,
            numbersExists = false
        for(let i=0; i<inputUser.length; i++){
            if(lowercase.includes(inputUser[i])) lowercaseExists = true
            if(uppercase.includes(inputUser[i])) uppercaseExists = true
            if(numbers.includes(inputUser[i])) numbersExists = true
        }
        if(!(lowercaseExists && uppercaseExists && numbersExists)){
            return 'Must include lowercase, uppercase, number'
        } else return true
    }
    else{
        return 'Password must contain at least 8 characters'
    }
    return true
}

export default PasswordValidator