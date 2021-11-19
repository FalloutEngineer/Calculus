(
    function(){

        const createButton = document.querySelector('.dashboard-item__create-new');

        const container = document.querySelector('.dashboard');

        let calculators = [];

        let elem = document.createElement('div');

        elem.innerHTML = 'Люблю украину'

        container.appendChild(elem);

        console.log(container);

        console.log('aaaaaaaaaaaaaaaaaaa');


        createButton.addEventListener('click', () => {
            createCalculator();
        })



        function createCalculator(){
            const newCalculator = document.createElement('div');
            newCalculator.classList.add('.dashboard__item');
            newCalculator.classList.add('.dashboard-item');
            
            newCalculator.prepend(document.createElement('h2').innerHTML = '5')
        }






        function setDeleteListeners(){

        }

        function deleteCalculator(calculator){

        }

        function updateCalculators(){

        }
    }
)(document);