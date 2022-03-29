// EMAIL VALIDATOR
// Ex. ryan.fandy@gmail.com / ryan@gmail.com / ryan@yahoo.co.id
// 1. Terdapat 2 buah string di sebelum dan sesuah @
// 2. Sesudah @ harus ada string, setelah string harus ada .
// 3. Setelah ., harus ada string lagi

function EmailValidator(inputUser){
    // Email dipisah berdasarkan @
    let emailSplit = inputUser.split('@') // [ryan, gmail.com]

    // Apabila hasil dari email split, .length !== 2 -> false 
    if(emailSplit.length !== 2) return false 

    // Apabila hasil dari emailSplit.length === 2, tetap dua2 nya itu '' -> false
    if(emailSplit[0] === '' || emailSplit[1] === '') return false

    let emailName = emailSplit[0] // ryan 
    let hostingName = emailSplit[1] // gmail.com

    // Hostingname dipisah berdasarkan .
    let hostingNameSplit = hostingName.split('.') // [gmail, com]
    console.log(hostingNameSplit)

    if(hostingNameSplit.length < 2 && hostingNameSplit.legth > 3) return false 

    return true
}

export default EmailValidator