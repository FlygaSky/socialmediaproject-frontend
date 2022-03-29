// PHONE VALIDATOR
// 1. Nomor harus diawali dengan 0
// 2. Nomor harus memiliki panjang karakter 9-12 digit

function PhoneValidator(inputUser){
    if(inputUser[0] !== '0') return 'Phone number must begin with 0'

    if(inputUser.length >= 9 && inputUser.length <= 12){
        for(let i=0; i < inputUser.length; i++){
            if(!(inputUser[i] >= 0)){
                return 'Phone number must contain numbers only'
            }else if(inputUser[i] === ' '){
                return 'Phone number without space'
            }
        }
    }else{
        return 'Phone number must be between 9-12 digits'
    }

    return true
}

export default PhoneValidator