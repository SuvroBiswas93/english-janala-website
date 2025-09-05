const loadLessons = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
    .then(res => res.json())
    .then(json =>displayLesson(json.data))
}

const displayLesson = (lessons) =>{
    // first step: get the container and empty it

    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML =''

    //Second Step:get into every lesson

    for (const lesson of lessons) {
    // third step: create element
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
            <button id ="lesson-btn-${lesson.level_no}"
             onclick = "loadWord(${lesson.level_no})"
              class="btn btn-outline btn-primary lesson-btn">
              <i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}
              </button>
        `
    // forurth step: Append it to the container
        levelContainer.appendChild(btnDiv);
    }



}

const removeActiveColor = ()=>{
    const lessonBtns = document.querySelectorAll(".lesson-btn")

    lessonBtns.forEach(btn =>{
        btn.classList.remove('active')
    })
}


const loadWord =(id) =>{
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        removeActiveColor();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        
        clickBtn.classList.add("active");
        displayWord(json.data)
    })
}

const displayWord = (words) =>{
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ""

    if(words.length === 0){
        wordContainer.innerHTML = `
            <div class="space-y-4 text-center col-span-full font-bangla bg-sky-200 rounded-xl py-10">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="font-medium text-xl text-gray-600 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bold text-4xl ">নেক্সট Lesson এ যান</h2>
            </div>
        ` 
        
    }
        //     {
        //     "id": 84,
        //     "level": 1,
        //     "word": "Fish",
        //     "meaning": "মাছ",
        //     "pronunciation": "ফিশ"
        // }
    for (const word of words) {
        console.log(word)
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
             <div class="bg-white rounded-xl shadow-sm px-5 py-10 text-center">
           <div class=" space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning / Pronounciation</p>
                <p class="font-bold text-2xl text-gray-600 font-bangla">"${word.meaning ? word.meaning :"(অর্থ খুঁজে পাওয়া যায়নি)"} 
                / ${word.pronunciation ? word.pronunciation : "Pronunciation খুঁজে পাওয়া যায়নি"}"</p>
           </div>
            <div class="flex justify-between items-center mt-10">
                <button onclick ="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `
        wordContainer.append(cardDiv)
    }
}

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetail(details.data);
   
}

/**
 * {
    "word": "Eager",
    "meaning": "আগ্রহী",
    "pronunciation": "ইগার",
    "level": 1,
    "sentence": "The kids were eager to open their gifts.",
    "points": 1,
    "partsOfSpeech": "adjective",
    "synonyms": [
        "enthusiastic",
        "excited",
        "keen"
    ],
    "id": 5
}
 * 
 */

const displayWordDetail = (word) =>{
    console.log(word);
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `
            <div>
                <h2 class = "font-bold text-2xl">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
            </div>
            <div class = "space-y-2">
                <h2 class ="font-bold text-xl">Meaning</h2>
                <p class = "font-medium">${word.meaning}</p>
            </div>
            <div class = "space-y-2">
                <h2 class ="font-bold">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div class = "">
                <h2 class ="font-bold mb-2">সমার্থক শব্দ গুলো</h2>
                <span class="btn bg-sky-200">${word.synonyms[0]}</span>
                <span class="btn bg-sky-200">${word.synonyms[1]}</span>
                <span class="btn bg-sky-200">${word.synonyms[2]}</span>
            </div>
            <button class="btn btn-primary">Complete Learning</button>
        
    `
    document.getElementById("word_modal").showModal()

}

loadLessons();