(
    function(){

        const createButton = document.querySelector('.dashboard-item__create-new');

        const container = document.querySelector('.dashboard');

        let calculators = [];


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
                deleteBtn.parentElement.parentElement.removeChild(deleteBtn.parentElement);
            })

            newCalculator.append(heading, deleteBtn);
            


            calculators.push(newCalculator);

            container.prepend(newCalculator);
        }






        function setDeleteListeners(){

        }

        function updateCalculators(){

        }
    }
)(document);