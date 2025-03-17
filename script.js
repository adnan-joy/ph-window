// Task-1


fetch('https://openapi.programming-hero.com/api/levels/all')
.then(res=>res.json())
.then(data=>{
    displayLessons(data.data)
})

const displayLessons= (lessons)=>{
    const lessonContent= document.getElementById('lessons-container');
    for(const lesson of lessons){
        const lessonElement= document.createElement('div');
        lessonElement.innerHTML= 
        `<span class="fa-solid fa-book-open"></span> Lesson-${lesson.level_no}`;

        lessonElement.classList.add('lesson','font-english', 'flex', 'items-center', 'gap-2', 'font-semibold', 'border', 'border-primary', 'rounded', 'px-4', 'py-2', 'text-primary', 'hover:bg-primary', 'transition-[background_text]', 'hover:text-[#E0E7FF]','cursor-pointer');
        lessonContent.appendChild(lessonElement);
    }
}

// Task-2

document.getElementById('lessons-container').addEventListener("click",function(event){
    if (event.target.classList.contains('lesson'))
        {
            // Deactivating previously activated Lesson Boxes
            const lessons = document.querySelectorAll('#lessons-container div');
            lessons.forEach(lesson => {
                lesson.classList.replace('text-[#E0E7FF]', 'text-primary');
                lesson.classList.remove('bg-primary');
            })
            // Activating the Clicked Lesson Box
            event.target.classList.replace('text-primary', 'text-[#E0E7FF]');
            event.target.classList.add('bg-primary');

        fetch(`https://openapi.programming-hero.com/api/level/${event.target.innerText.charAt(7)}`)
        .then(res=>res.json())
        .then(data=>{
            if(data.data.length===0)
                noWordError();
            else
                displayWords(data.data);
            })
        }
})


const displayWords=(words)=>{
    const wordsContainer=document.getElementById('words-container');
    wordsContainer.innerHTML="";
    wordsContainer.classList.add("grid","grid-cols-3","gap-8","p-8");

    for (const word of words){
        const wordName=word.word;
        const wordMeaning=word.meaning;
        const wordPro=word.pronunciation;
        const wordBox=document.createElement('div');
        wordBox.classList.add('word-box',"h-full","bg-[#EEF]","rounded-xl","pt-16","pb-10","px-8","space-y-5");


        const wordsName= document.createElement('h4');
        wordsName.innerText = wordName;
        wordsName.classList.add('font-english','text-3xl', 'font-bold', 'text-center' );

        const meanPro= document.createElement('p');
        meanPro.innerText = "Meaning / Pronunciation";
        meanPro.classList.add('font-english','text-lg', 'font-medium', 'text-center');
        const wordMP = document.createElement('h3');
        wordMP.classList.add('font-bangla','text-2xl', 'font-semibold', 'text-center');
        if (!wordMeaning)
            wordMP.innerText = `"অর্থ নেই / ${wordPro}"`;
        else
            wordMP.innerText = `"${wordMeaning} / ${wordPro}"`;

        
        

        const wordIcons = document.createElement('div');
        wordIcons.classList.add('flex', 'justify-between');
        wordIcons.innerHTML = `
                <h4 class="fas fa-circle-info text-slate-700 bg-blue-200 rounded-lg p-3 mt-4 text-xl
                hover:text-primary active:text-indigo-600"></h4>
                <h4 class="fas fa-volume-high text-slate-700 bg-blue-200 rounded-lg p-3 mt-4 text-xl
                hover:text-primary active:text-indigo-600"></h4>
                `;


        wordBox.append(wordsName, meanPro, wordMP,wordIcons);
        wordsContainer.appendChild(wordBox);
        
    }

}

// Task-3

const noWordError = () => {
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.classList.replace('space-y-3', 'space-y-4');
    wordsContainer.classList.remove('grid', 'grid-cols-3', 'gap-8')
    wordsContainer.innerHTML = `
    <img src="./assets/alert-error.png" alt="Error" class="mx-auto" />
    <p class="font-bangla text-[#79716B]" title="No Vocabulary has been added to this Lesson yet">এই Lesson এ 
    এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-4xl font-semibold font-bangla" title="Go to the next lesson">নেক্সট Lesson এ যান</h2>
    `;
}

// Task-4





// Task-5

document.querySelector('#log-form button').addEventListener('click', function(event){
    event.preventDefault();
    const username = event.target.parentNode.querySelector('input[type="text"]').value;
    const password = event.target.parentNode.querySelector('input[type="password"]').value;
    LoginUser(username, password);
    event.target.parentNode.querySelector('input[type="text"]').value = '';
    event.target.parentNode.querySelector('input[type="password"]').value = '';
})

const LoginUser = (username, password) => {
    console.log(username, password);
    
    if (username === '')
        window.alert("Please enter the Username.");
    else if (password !== "123456")
        window.alert("Please enter the correct password.");
    else
    {
        document.getElementsByTagName('header')[0].classList.remove('hidden');
        document.getElementById('banner').classList.add('hidden');
        document.getElementById('vocab').classList.remove('hidden');
        document.getElementById('faq').classList.remove('hidden');
        window.alert("Successfully logged in :D");
    }
}

document.querySelector('#nav-btn a:last-child').addEventListener('click', function(){
    LogoutUser();
});

const LogoutUser = () => {
    document.getElementsByTagName('header')[0].classList.add('hidden');
    document.getElementById('banner').classList.remove('hidden');
    document.getElementById('vocab').classList.add('hidden');
    document.getElementById('faq').classList.add('hidden');
}
