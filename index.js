const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json =>  displayLesson(json.data))
}

const loadLevelword = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayWords(json.data))
}


const displayWords = (words) => {
   const wordContainer = document.getElementById("word-container")
   wordContainer.innerHTML = ""
   for(let word of words){

    const card = document.createElement("div")
    card.innerHTML = ` 
       <div class="bg-white rounded-xl py-10 px-5 text-center shadow-sm space-y-4">
          <h2 class="text-2xl font-bold">${word.word}</h2>
          <p>Meaning /Pronounciation</p>
          <h2 class="text-2xl font-semibold bangla text-[#18181B]">${word.meaning} - ${word.pronunciation}</h2>

          <div class="flex justify-between items-center px-5">
            <button class=" bg-sky-100 hover:bg-slate-300 md:hover:bg-slate-300 p-2 rounded-sm"><i class="fa-solid fa-circle-info"></i></button>
            <button class=" bg-sky-100 hover:bg-slate-300 md:hover:bg-slate-300 p-2 rounded-sm "><i class="fa-solid fa-volume-high"></i></button>
          </div>
      </div>
    ` 
   wordContainer.append(card)
   }
}
      




const displayLesson = (lessons) => {
//    1. get the container and empty
const levelContanir = document.getElementById("level-container")
levelContanir.innerHTML = ""
//    2. get into every Lesson
for(let lesson of lessons ){
    // 3. creat element
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
        <button onclick="loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> lesson-${lesson.level_no} </button>
    `
    // 4. append into container
    levelContanir.append(btnDiv)
}
}
loadLesson()
