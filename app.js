document.querySelector('#search').addEventListener('click', () =>{
    let entry = document.querySelector('input').value;
    console.log('search clicked for' + entry);
});

document.querySelector('#clear').addEventListener('click', () =>{
    document.querySelector('main').innerHTML = '';
});