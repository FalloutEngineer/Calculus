(
    function(){

        const createButton = document.querySelector('.dashboard-item__create-new');

        const container = document.querySelector('.dashboard');

        let calculators = [];

        const socket = io();


        createButton.addEventListener('click', () => {
            createCalculator();
        })


        function createCalculator(){
            const newCalculator = document.createElement('div');
            newCalculator.classList.add('dashboard__item');
            newCalculator.classList.add('dashboard-item');

            const heading = document.createElement('h3');

            heading.classList.add('dashboard-item__heading');
            heading.innerHTML = `Calc ${calculators.length}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('dashboard-item__delete');
            deleteBtn.innerHTML = 'x';

            deleteBtn.addEventListener('click', e => {
                let calculatorId = parseInt(deleteBtn.parentElement.querySelector('.dashboard-item__heading').innerHTML.split(' ')[1], 10);
                socket.emit('delete-calculator', {id: calculatorId})
                calculators = calculators.filter(function(value, index, arr){
                    return value != deleteBtn.parentElement;
                })
                console.log(calculators);
                deleteBtn.parentElement.parentElement.removeChild(deleteBtn.parentElement);
            })

            newCalculator.append(heading, deleteBtn);
            


            calculators.push(newCalculator);

            container.prepend(newCalculator);

            socket.emit('create-calculator', {id: calculators.length - 1})
        }







        function updateCalculators(){

        }
    }
)(document);