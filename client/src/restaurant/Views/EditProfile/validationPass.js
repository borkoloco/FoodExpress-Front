

const validationPass = ({ actualPass, newPass, repeatPass }) => {
    
    console.log(actualPass);
    let error = {
        actualPass: "",
        newPass: "",
        repeatPass: "",
        empty: true,
    }

    if (actualPass.length>0 || newPass.length>0 || repeatPass.length>0) {
        error.empty = false
    }

    if (actualPass.length < 6) {
        error.actualPass = "Password must be at least 6 characters long."
    }

    if (newPass.length < 6) {
        error.newPass = "Password must be at least 6 characters long."
    } if (newPass === actualPass) {
        error.newPass = "The new password must be different from the current one."
    }

    if (repeatPass.length < 6) {
        error.repeatPass = "Password must be at least 6 characters long."
    } if (repeatPass !== newPass) {
        error.repeatPass = "The passwords do not match."
    }

    return error

}

export default validationPass

