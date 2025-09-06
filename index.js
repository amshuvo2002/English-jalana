const loadLesson = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json =>  displayLesson(json.data))
}

const removeActive = () => {
    const lessonsBtn = document.querySelectorAll(".lesson-btn")
    // console.log(lessonsBtn);
    lessonsBtn.forEach(btn => btn.classList.remove("active"))
}

const alldetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const dtls = await res.json()
    displayWorddtails(dtls.data)
}

const displayWorddtails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
    
             <div>
                   <h1 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
                 </div>

                    <div class="">
                   <h2 class="font-bold">Meaning</h2>
                   <p>${word.meaning}</p>
                  </div>
     
                  <div class="">
                 <h2>Example</h2>
                 <p>${word.sentence}</p>
                 </div>

                  <div class="">
                 <h2>সমার্থক শব্দ গুলো</h2>
                  <span class="btn">hi</span>
                  <span class="btn">hi</span>
                  <span class="btn">hi</span>
                 </div> 
                 
                 `
    document.getElementById("my_modal").showModal()
}

const loadLevelword = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => {
        removeActive()
        const clickbtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickbtn)
        clickbtn.classList.add("active")
        displayWords(json.data)
    })
}


const displayWords = (words) => {
   const wordContainer = document.getElementById("word-container")
   wordContainer.innerHTML = ""
   if(words.length === 0){
         wordContainer.innerHTML = `
            <div class="text-center col-span-full">
             <img class="mx-auto" src="assets/alert-error.png" alt="">
             <h1 class="text-gray-400 bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
             <h1 class="font-bold text-4xl bangla">নেক্সট Lesson এ যান</h1>
             </div>
         `
    return
   }

   for(let word of words){

    const card = document.createElement("div")
    card.innerHTML = ` 
       <div class="bg-white rounded-xl py-10 px-5 text-center shadow-sm space-y-4">
          <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p>Meaning /Pronounciation</p>
          <h2 class="text-2xl font-semibold bangla text-[#18181B]">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} - 
          ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h2>

          <div class="flex justify-between items-center px-5">
            <button onclick="alldetails(${word.id})" class=" bg-sky-100 hover:bg-slate-300 md:hover:bg-slate-300 p-2 rounded-sm"><i class="fa-solid fa-circle-info"></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> <i class="fa-solid fa-book-open"></i> lesson-${lesson.level_no} </button>
    `
    // 4. append into container
    levelContanir.append(btnDiv)
}
}
loadLesson()
