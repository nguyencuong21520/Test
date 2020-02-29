const view = {
    showScreen: function (screenName) {
        let app = document.querySelector('#app')
        switch (screenName) {
            case 'signUp': {
                app.innerHTML = components.signUp
                let link = document.querySelector('#form-sign-up-link')
                link.onclick = function () {
                    view.showScreen('signIn')
                }
                let form = document.querySelector('.form-sign-up')
                // console.log(form.firstname)
                form.onsubmit = function (event) {
                    event.preventDefault()
                    //1.get data

                    let signUpInfo = {
                        firstname: form.firstname.value.trim(),
                        lastname: form.lastname.value.trim(),
                        email: form.email.value.trim().toLowerCase(),
                        password: form.password.value,
                        confirmPassword: form.confirmPassword.value
                    }

                    //2.validate data
                    // if (signUpInfo.firstname){
                    //     // document.querySelector('#firstname-error').innerHTML=''
                    //     view.setText('#firstname-error','')
                    // }
                    // else{
                    //     // document.querySelector('#firstname-error').innerHTML='Missing FirstName'
                    //     view.setText('#firstname-error','duc ngu')
                    // }
                    let validateResult = [

                        view.Validate(signUpInfo.firstname, '#firstname-error', 'Missing'),
                        view.Validate(signUpInfo.lastname, '#lasttname-error', 'Missing'),
                        view.Validate(signUpInfo.email, '#email-error', 'Missing'),
                        view.Validate(signUpInfo.password && signUpInfo.password.length >= 6, '#passWord1-error', 'invalid password'),
                        view.Validate(signUpInfo.password == signUpInfo.confirmPassword, '#passWord-error', 'PassWord Incorrect')
                    ]

                    //3. submit data (next season)
                    // console.log(validateResult)
                    if (view.allPassed(validateResult)) {
                        controller.signUp(signUpInfo)
                    }
                }
                break
            }
            case 'signIn': {
                app.innerHTML = components.signIn
                let link = document.querySelector('#form-sign-in-link')
                link.onclick = function () {
                    view.showScreen('signUp')
                }
                let form = document.querySelector('.form-sign-in')
                form.onsubmit = function (event) {
                    event.preventDefault()
                    let signInInfo = {
                        email: form.email.value.trim().toLowerCase(),
                        password: form.password.value
                    }
                    console.log(signInInfo)
                    view.Validate(signInInfo.email, '#email-error', 'Missing')
                    view.Validate(signInInfo.password && signInInfo.password.length >= 6, '#firstname-error', 'Invalid password')
                }

                break
            }
        }
    },
    setText(query, text) {
        document.querySelector(query).innerText = text
    },
    Validate(condition, queryErrorTag, messageError) {
        if (condition) {
            view.setText(queryErrorTag, '')
            return true
        } else {
            view.setText(queryErrorTag, messageError)
            return false
        }
    },
    allPassed(validateResult) {
        for (let result of validateResult){
            if (!result){
                return false
            }
        
        }
        return true
    },
    disable(query){
        document.querySelector(query).setAttribute('disabled',true)
    },
    enable(query){
        document.querySelector(query).removeAttribute('disabled')
    },
}