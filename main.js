const loadData=async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    displayBtn(data.data)
    // console.log(data.data);
}
const displayBtn = (allBtn) =>{
    allBtn.forEach(button =>{
        // console.log(button);

        const btnContainer = document.getElementById('dynamic-btn')
        const btn = document.createElement('button');
        btn.innerHTML=`
        <button onclick="getCardData('${button.category_id}')" class="text-lg font-semibold px-5 py-1 bg-gray-200 rounded-md">${button.category}</button>
        `
        btnContainer.appendChild(btn)
        
    })
}
let newData = [];

const getCardData =async (id = 1000) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    displayData(data.data)
}
const sortByView =()=>{
    console.log(newData);
    newData.sort(function(a,b){
        console.log(a,b);
        const viewA = parseFloat(a.others.views)
        const viewB = parseFloat(b.others.views)
        return viewB - viewA;
    })
    displayData(newData)
}
const displayData = (cardData) =>{
    newData =cardData
    // console.log(cardData);

    
    // const sortByView =()=>{
    //     newData.sort(function(){
    //         console.log(newData);
    //         // const viewA = 
    //     })
    // }






    const noDataField = document.getElementById('no-data-field')
    if(cardData.length === 0){
        noDataField.classList.remove('hidden')
    }else{
        noDataField.classList.add('hidden')
    }

    const cardContainer = document.getElementById('dynamic-card-container')
    cardContainer.textContent =""
    newData.forEach(card =>{
        const viewAmount = parseFloat(card.others.views)
        // const totalView = Math.floor(viewAmount * 1000)
        // console.log(viewAmount);


        // console.log(card.others.views);
        const totalTime = parseFloat(card.others.posted_date);
        const totalMinit = Math.floor(totalTime/60)
        const totalHours = Math.floor(totalMinit/60)
        const leftMinit = totalMinit % totalHours;


        const cardBody = document.createElement('div')
        cardBody.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-3 lg:p-0">
                <figure class="">
                    <div class="">
                        <img src="${card.thumbnail}" alt="Shoes" class="rounded-xl h-48 w-full" />
                        <button class="${!card.others.posted_date?'hidden':'absolute text-xs font-normal rounded-lg top-36 left-28 bg-black px-2 py-1 text-white'}">${totalHours}hrs ${leftMinit} min ago</button>
                    </div>
                </figure>
                <div class="">
                    <div class="flex gap-2 mt-5">
                        <img class="w-10 h-10 rounded-full" src="${card.authors[0].profile_picture}" alt="">
                        <div class="h-32">
                            <h2 class="text-xl font-bold">${card.title}</h2>
                            <div class="flex gap-2 items-center">
                                <h4 class="text-base font-normal text-gray-600 my-2">${card.authors[0].profile_name}</h4>
                                <img src="${card.authors[0].verified?'icon/valide-user.svg':""}" alt="" class="" />
                            </div>
                            <h4 class="text-base font-normal text-gray-600">${card.others.views} views</h4>
                        </div>
                    </div>
                </div>
            </div>
        `
        cardContainer.appendChild(cardBody)
        // console.log(card);
    })
}

loadData()
function goBlog(){
    window.location.href ='blog.html'
}
function goHome(){
    window.location.href ='index.html'
}

