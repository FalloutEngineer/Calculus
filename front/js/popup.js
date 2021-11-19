const popup = (
    function(){
        const popupBackgrounds = document.querySelectorAll('.popup__background');
        const popups = document.querySelectorAll('.popup');

        const popupSuccess = document.querySelector('.popup__success');
        const popupError = document.querySelector('.popup__error');
        const popupSure = document.querySelector('.popup__sure');

        const popupOks = document.querySelectorAll('.popup__ok-button');

        const popupSureYes = document.querySelector('.popup__sure-yes');
        const popupSureNo = document.querySelector('.popup__sure-no');

        const body = document.body;

        const active = '_active';
        const locked = '_locked';

        popupBackgrounds.forEach(background => {
            background.addEventListener('click', closePopUps)
        });

        popupOks.forEach(button => {
            button.addEventListener('click', closePopUps);
        });

        popupSureNo.addEventListener('click', sureNo);
        popupSureYes.addEventListener('click', sureYes);

        function closePopUps(){
            unlockBody()
            popups.forEach(popup => {
                popup.classList.remove(active);
            })
        };

        function sureYes(){
            // ToDo
            closePopUps();
        };

        function sureNo(){
            closePopUps()
        };

        function openPopup(name, params){
            lockBody()

            if(name === 'success'){
                popupSuccess.classList.add(active);
                if(params.success){
                    popupSuccess.querySelector('.popup__success-text').innerHTML = params.success;
                }
            }

            if(name === 'error'){
                popupError.classList.add(active);
                if(params.error){
                    popupError.querySelector('.popup__error-text').innerHTML = params.error;
                }
            }

            if(name === 'sure'){
                popupSure.classList.add(active);
            }
        }

        function lockBody(){
            body.classList.add(locked)
        }

        function unlockBody(){
            body.classList.remove(locked)
        }

        return {
            closePopUps: function(){
                popups.forEach(popup => {
                    popup.classList.remove(active);
                })
            },
            open: function(name, params){
                lockBody();
                if(name === 'success'){
                    popupSuccess.classList.add(active);
                    if(params.success){
                        popupSuccess.querySelector('.popup__success-text').innerHTML = params.success;
                    }
                }
    
                if(name === 'error'){
                    popupError.classList.add(active);
                    if(params.error){
                        popupError.querySelector('.popup__error-text').innerHTML = params.error;
                    }
                }
    
                if(name === 'sure'){
                    popupSure.classList.add(active);
                }
            }
        }
    }
)(document)