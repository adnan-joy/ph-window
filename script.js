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
        const wordId=word.id;
        const wordName=word.word;
        const wordMeaning=word.meaning;
        const wordPro=word.pronunciation;
        const wordBox=document.createElement('div');
        wordBox.classList.add('word-box',"h-full","bg-[#EEF]","rounded-xl","pt-16","pb-10","px-8","space-y-5");

        const wordsId = document.createElement('p');
        wordsId.innerText = wordId;
        wordsId.classList.add('hidden');

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


        wordBox.append(wordsId, wordsName, meanPro, wordMP,wordIcons);
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

document.getElementById('words-container').addEventListener('click', function(event){
    if (event.target.classList.contains('fa-circle-info'))
    {
        const wordId = event.target.parentNode.parentNode.firstChild;
        fetch(`https://openapi.programming-hero.com/api/word/${wordId.innerText}`)
        .then(response => response.json())
        .then(data => {
            showWordDetails(data.data);
        })
    }
})

const showWordDetails = (word) => {
    const synonymsContainer = document.createElement('div');
    synonymsContainer.classList.add('flex', 'gap-4');
    if (word.synonyms)
    {
        for (const synonym of word.synonyms)
        {
            const synonymEl = document.createElement('h6');
            synonymEl.innerText = synonym;
            synonymEl.classList.add('font-bangla', 'text-xl', 'bg-blue-100', 'px-5', 'py-2', 'rounded-lg', 'border', 'border-[#DDD]');
            synonymsContainer.appendChild(synonymEl);
        }
    }
    const modal = document.createElement('dialog');
    modal.classList.add('modal', 'bg-[#DDDDFF90]', 'p-6', 'rounded-xl', 'space-y-6', 'backdrop-blur');
    modal.innerHTML = `
    <div class="border-2 border-[#EEE7] rounded-xl p-6 transition-all space-y-8">
        <h2 class="text-4xl font-semibold font-english">${word.word} (<span class="font-bangla"><span class="fas fa-microphone-lines"></span> : ${word.pronunciation}</span>)</h2>
        <div class="space-y-3">
            <h4 class="text-2xl font-semibold font-english">Meaning</h4>
            <h4 class="text-2xl font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</h4>
        </div>
        <div class="space-y-3">
            <h4 class="text-2xl font-semibold font-english">Example</h4>
            <h4 class="text-2xl font-english">${word.sentence}</h4>
        </div>
        <div class="space-y-3" id="synonyms-container">
            <h4 class="text-2xl font-semibold font-bangla">সমার্থক শব্দ গুলো</h4>
        </div>
    </div>
    <form method="DIALOG" class="transition-all">
        <button type="submit" class="bg-primary text-[#E0E7FF] border border-primary hover:bg-inherit hover:text-primary outline-none font-english px-8 py-2 rounded-xl active:bg-indigo-200 text-2xl">Complete Learning</button>
    </form>
    `;
    modal.querySelector('#synonyms-container').appendChild(synonymsContainer);
    document.body.appendChild(modal);
    modal.showModal();
    modal.addEventListener('close', function(){
        delete document.body.removeChild(modal);
    })
}


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
    if (username === '')
        alert("Please enter the Username.");
    else if (password !== "123456")
        alert("Please enter the correct password.");
    else
    {
        document.getElementsByTagName('header')[0].classList.remove('hidden');
        document.getElementById('banner').classList.add('hidden');
        document.getElementById('vocab').classList.remove('hidden');
        document.getElementById('faq').classList.remove('hidden');
        alert("Successfully logged in :D");
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
