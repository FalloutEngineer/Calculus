(
    function(){
        const field = document.querySelector('.calculator__field');

        const buttons = document.querySelectorAll('.calculator__button');

        const numberButtons = getNumberButtons(buttons);

        const clearButton = document.querySelector('.calculator__clear');
        const eraseButton = document.querySelector('.calculator__erase');


        const divideButton = document.querySelector('.calculator__divide');
        const multiplyButton = document.querySelector('.calculator__multiply');
        const minusButton = document.querySelector('.calculator__minus');
        const plusButton = document.querySelector('.calculator__plus');

        const rootButton = document.querySelector('.calculator__root');
        const powButton = document.querySelector('.calculator__pow');
        
        const equalsButton = document.querySelector('.calculator__equals');
        const commaButton = document.querySelector('.calculator__comma');

        const openBracketButton = document.querySelector('.calculator__open-bracket');
        const closeBracketButton = document.querySelector('.calculator__close-bracket');

        const history = document.querySelector('.history');

        let calcString = '';
        
        setNumberListeners(numberButtons);
        setSpecialListeners();
        setOperatorListeners();

        function getNumberButtons(buttons){
            const numberButtons = [];

            buttons.forEach(button => {
                if(!isNaN(+button.innerHTML)){
                    numberButtons.push(button)
                }
            })

            return numberButtons
        }

        function setNumberListeners(buttons){
            buttons.forEach(button => {
                button.addEventListener('click', e => {
                    calcString = calcString + button.innerHTML;
                    updateField(calcString)
                })
            })
        }

        function setOperatorListeners(){
            divideButton.addEventListener('click', e => {
                calcString += '/'
                updateField();
            })
            multiplyButton.addEventListener('click', e => {
                calcString += '*'
                updateField();
            })
            minusButton.addEventListener('click', e => {
                calcString += '-'
                updateField();
            })
            plusButton.addEventListener('click', e => {
                calcString += '+'
                updateField();
            })
            rootButton.addEventListener('click', e => {
                calcString += '^0.5'
                updateField();
            })
            powButton.addEventListener('click', e => {
                calcString += '^'
                updateField();
            })
            commaButton.addEventListener('click', e => {
                calcString += ','
                updateField();
            })
            openBracketButton.addEventListener('click', e => {
                calcString += '('
                updateField();
            })
            closeBracketButton.addEventListener('click', e => {
                calcString += ')'
                updateField();
            })
        }

        function setSpecialListeners(){
            clearButton.addEventListener('click', e => {
                clearField();
            })
            eraseButton.addEventListener('click', e => {
                calcString = calcString.substring(0, calcString.length - 1);
                updateField();
            })
            equalsButton.addEventListener('click', e => {
                calcString = math.evaluate(calcString);
                updateField();
                appendResult();
            })
        }

        function clearField(){
            calcString = '';
            updateField();
        }

        function updateField(){
            field.value = calcString;
        }

        function appendResult(){
            let item = document.createElement('li');

            item.classList.add('history__item')

            item.innerHTML = calcString;

            history.appendChild(item)
        }

        function saveState(){
            // ToDo
        }
    }
)(document,math)