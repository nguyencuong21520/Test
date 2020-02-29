const controller = {
    signUp: async/*câu lệnh bất đồng bộ,kiểu tất cả các lệnh chạy cùng 1 lúc */ function(signUpInfo){
        // console.log('sign up',signUpInfo)
        let email = signUpInfo.email
        let password = signUpInfo.password
        let firstname = signUpInfo.firstname
        let lastname = signUpInfo.lastname
        view.setText('#sign-up-success','')
        view.setText('#sign-up-error','')
        view.disable('#form-sign-up-btn')
        try{
        await firebase.auth().createUserWithEmailAndPassword(email,password)/*await là để câu lệnh chạy xong rồi với đến câu lệnh khác */
        await firebase.auth().currentUser.updateProfile({
            displayName: firstname + " " + lastname
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('#sign-up-success','An email verification has been sent to your email')
        }
        catch (error){
            let message =  error.message
            view.setText('#sign-up-error',message)
        }
        view.enable('#form-sign-up-btn')
    }
}
