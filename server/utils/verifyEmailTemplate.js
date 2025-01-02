const verifyEmailTemplate = ({name, url})=>{
    return`
    <p>Dear, ${name}</p>
    <p>Thank you for Register in Betar Bazar</p>
    <a href=${url} style="color:white; background:#071263; margin-top:10px; padding:20px">
        verify Email
    </a>
    `
}

console.log(emailContent);


export default verifyEmailTemplate
