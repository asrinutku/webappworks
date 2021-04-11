const form = document.querySelector('.add-form');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

search.addEventListener('keyup',e=>{
    const ifade = search.value.trim().toLowerCase();
    filtre(ifade);
})

const filtre = (ifade) =>{
    Array.from(list.children).filter((todo)=>{
        console.log(todo.textContent.includes(ifade));
        return !todo.textContent.toLowerCase().includes(ifade);
    }).forEach((e)=>{
        e.classList.add('filtered');
    })

    Array.from(list.children).filter((todo)=>{
        console.log(todo.textContent.includes(ifade));
        return todo.textContent.toLowerCase().includes(ifade);
    }).forEach((e)=>{
        e.classList.remove('filtered');
    })
}

function templateOlustur(is,time){

    if(time){

    }else{
        time = getDate();
    }
   
    let html=`
    <li class="list-group-item d-flex justify-content-between align-items-center" >
				<span>${is}</span>
                <span class="badge badge-secondary badge-pill count-notif" style="font-size: 14px;">${time}</span>
				<i class="far fa-trash-alt delete" ></i>
	</li>
    `;

    list.innerHTML += html;

}

function getDate(){
    let a = new Date();
    let formata = dateFns.format(a,'MM/DD/YYYY h:mm');
    return formata;

}


form.addEventListener('submit',e=>{
    e.preventDefault();

    const content = form.add.value.trim().toLowerCase();

    if(content.length){
        templateOlustur(content);
        form.reset();
    }

    localStorage.setItem(content, getDate());
    
})

list.addEventListener('click',e=>{
    
    if(e.target.classList.contains('delete')){
        
        e.target.parentElement.remove();
        let key = e.target.previousElementSibling.previousElementSibling.innerHTML;
        localStorage.removeItem(key);

    }
})

if(JSON.stringify(localStorage)){
    
    for (let [key, value] of Object.entries(localStorage)) {

        templateOlustur(key,value);
    }
}





