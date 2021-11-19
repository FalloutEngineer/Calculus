const passwordValidation = (
    function(){
        const username = document.querySelector('#username')
        const password = document.querySelector('#password');

        const submit = document.querySelector('.registration__submit');

        submit.addEventListener('click', e => {
            e.preventDefault()

            if(username.value === '' || password.value === ''){
                popup.open('error', {
                    error: 'Empty fields'
                })
            }else{
                sendData();
            }

            
        })

        function sendData(){
            //ToDo
        }

        function serverError(error){
            popup.open('error', {
                error: `${error}`
            })
        }
    }
)(document)