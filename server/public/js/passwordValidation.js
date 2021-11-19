// const passwordValidation = (
//     function(){
//         const username = document.querySelector('#username')
//         const password = document.querySelector('#password');
//         const repeatPassword = document.querySelector('#repeatPassword');

//         const submit = document.querySelector('.registration__submit');

//         submit.addEventListener('click', e => {
//             e.preventDefault()

//             if(username.value === '' || password.value === '' || repeatPassword.value === ''){
//                 popup.open('error', {
//                     error: 'Empty fields'
//                 })
//             }else{
//                 if(password.value != repeatPassword.value){
//                     popup.open('error', {
//                         error: 'Password mismatch'
//                     });
//                 }else{
//                     sendData();
//                 }
//             }

            
//         })

//         function sendData(){
//             //ToDo
//         }

//         function serverError(error){
//             popup.open('error', {
//                 error: `${error}`
//             })
//         }
//     }
// )(document)