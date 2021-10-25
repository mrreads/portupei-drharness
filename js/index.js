const popup = document.querySelector('.popup-wrapper');
popup.querySelector('.popup-close').addEventListener('click', () => {
    //hide popup
    document.body.style.overflowY = 'scroll';
    popup.classList.add('hide');
    popup.querySelector('.option').classList.add('hide');
});


popup.querySelector('.order').addEventListener('click', () => {
    //make order
    let order = {
        name: popup.querySelectorAll('input')[0].value,
        phone: popup.querySelectorAll('input')[1].value,
        size: popup.querySelectorAll('.select-value').textContent,
        title: popup.querySelector('.title').textContent
    }
    console.log(order);
});

const items = document.querySelectorAll('.item');
items.forEach(item => {
    let parent = item;

    let sizes = item.querySelector('.sizes');
    let colors = item.querySelectorAll('.colors .color');

    sizes.addEventListener('click', size => {
        if (size.target.classList.contains('size') && !size.target.classList.contains('disable'))
        {
            //when select size
            let sizeElement = size.target;

            sizes.querySelectorAll('.size').forEach(s => s.classList.remove('active'));
            sizeElement.classList.add('active');
            
            let sizeData = sizeElement.dataset.value;
            parent.dataset.size = sizeData;
        }
    });

    //render color
    colors.forEach(color => color.style.backgroundColor = color.dataset.value);

    item.querySelector('.order').addEventListener('click', () => 
    {
        //modal info render
        popup.querySelector('.title').textContent = parent.querySelector('.title').textContent;
        popup.querySelector('img').src = parent.querySelector('img').src;
        popup.querySelector('.price').innerHTML = parent.querySelector('.price').innerHTML;
        popup.querySelector('.select-value').textContent = parent.querySelector('.size.active')?.dataset.value.toUpperCase() ?? 'Выберите нужный размер'

        //dropdown show
        popup.querySelector('.select').addEventListener('click', () => {
            popup.querySelector('.option').classList.remove('hide');
        }, true);

        //dropdown options render
        popup.querySelector('.option').innerHTML = '';
        sizes.querySelectorAll('.size').forEach(s => {
            if (!s.classList.contains('disable'))
            {   
                let temp = document.createElement('p');
                temp.textContent = s.dataset.value;
                temp.addEventListener('click', () => {
                    //when clicl/select in dropdown
                    popup.querySelector('.option').classList.add('hide');
                    popup.querySelector('.select-value').textContent = temp.textContent.toUpperCase();
                });
                popup.querySelector('.option').appendChild(temp);
            }
        });

        //show popup
        document.body.style.overflowY = 'hidden';
        popup.classList.remove('hide');
    }, true);
});

const categories = document.querySelectorAll('.categories div');
categories.forEach(cat => {
    cat.addEventListener('click', c => {
        
        categories.forEach(e => e.classList.remove('active'));
        c.target.classList.add('active');

        let id = c.target.dataset.id;
        categorySort(id);
    });
});

//on load page select 1 cat
categories[0].click();

function categorySort(id)
{
    items.forEach(item => {
        if (item.dataset.category == id)
            item.classList.remove('hide');
        else
            item.classList.add('hide');
    });
}