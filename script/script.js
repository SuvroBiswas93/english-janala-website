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
        console.log(lesson)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
              <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book"></i>Lesson - ${lesson.level_no}</button>
        `
        // forurth step: Append it to the container
        levelContainer.appendChild(btnDiv);
    }



}
loadLessons();