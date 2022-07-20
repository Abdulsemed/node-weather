const weatherForm=document.querySelector('form');
const search = document.querySelector('input');
const loc=document.querySelector('.location')
const forecast=document.querySelector('.forecast')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address = search.value;
    fetch("http://localhost:3000/weather?address="+encodeURIComponent(address)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           loc.textContent=data.error;
           forecast.textContent='';
        }else{
            loc.textContent=data.location;
            forecast.textContent=data.forecast;
        }   
        
    });
})
})
