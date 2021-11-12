
const VIDEO_LENGTH = document.querySelector('.video_length'),
VIDEO_SPEED = document.querySelector('.video_speed'),
VIDEO_SPEED_INDICATOR = document.querySelector('.speed_indicator')
TOTAL_DURATION = document.querySelector('.total_duration'),
CALCULATED_DURATION = document.querySelector('.calculated_duration')
SAVED_TIME = document.querySelector('.saved_time')

const ADD_BUTTON = document.querySelector('.add'),
VIDEO_LIST = document.querySelector('.list')

const DURATION_SUM = document.querySelector('.duration_sum')
const APROXIMATED_SUM = document.querySelector('.aproximated_sum')
const SAVED_SUM = document.querySelector('.saved_sum')

let video_length = 1,
video_speed = 1

let video_list = [

]

VIDEO_LENGTH.addEventListener('input', (e) => {
  video_length = e.target.value
  updateUi(e)
})

VIDEO_SPEED.addEventListener('input', (e) => {
  video_speed = e.target.value
  VIDEO_SPEED_INDICATOR.innerHTML = `${video_speed}x`
  console.log(e.target.value)
  updateUi(e)
})

ADD_BUTTON.addEventListener('click', () => {
  const random_num = Math.random()

  addToList(video_length, video_speed, random_num)
  
  const li = document.createElement('li')
  const deleteCard = document.createElement('div')

  deleteCard.setAttribute('class', 'delete-card')
  deleteCard.innerHTML=`del`
  
  let saved_time = video_length-video_length/video_speed
  let calculated_duration = video_length/video_speed
  
  li.innerHTML = `
  <div class='content-card'>
    <h2>Aproximated duration at (${video_speed}x): ${calculated_duration.toFixed(2)} mins.</h2>
    <p>Original duration: ${parseFloat(video_length).toFixed(2)}</p>
    <p>Time saved: ${saved_time.toFixed(2)}</p>
  </div>
  `

  li.appendChild(deleteCard)
  li.setAttribute('id', random_num)

  deleteCard.addEventListener('click', (e) => {
    // e.target.parentNode.removeChild(e.target)
    e.target.closest('li').remove()

    video_list = video_list.filter((v, i, arr) => {
      return v['id'] !== random_num
    })

    calculateTotalDuration()
    calculateTotalAproximated()
    calculateTotalSavedTime()
 
  })

  calculateTotalDuration()
  calculateTotalAproximated()
  calculateTotalSavedTime()
 
  VIDEO_LIST.appendChild(li)

})

function calculateTotalDuration() {

  DURATION_SUM.innerHTML = 'Dur. Total: ' + video_list
  .map((i) => {
    return i.length
  })
  .reduce((prev, next) =>prev+next, 0)
  .toFixed(2)
  + ' minutes'  
}

function calculateTotalAproximated() {
   
  APROXIMATED_SUM.innerHTML = 'Aprox. Total: ' + video_list
  .map((i) => {
    return i.calculatedDuration
  })
  .reduce((prev, next) =>prev+next, 0)
  .toFixed(2)
  + ' minutes'

}

function calculateTotalSavedTime() {

  SAVED_SUM.innerHTML = 'Saved Total: ' + video_list
  .map((i) => {
    return i.savedTime
  })
  .reduce((prev, next) =>prev+next, 0)
  .toFixed(2)
  + ' minutes'
}


function updateUi(e) {
  let saved_time = video_length-video_length/video_speed,
  calculated_duration = video_length/video_speed

  TOTAL_DURATION.textContent = `Total duration: ${parseFloat(video_length).toFixed(2)} minutes`
  // console.log(e)
  CALCULATED_DURATION.textContent =   `Aproximated duration at (${video_speed}x): ${calculated_duration.toFixed(2)} minutes`
  SAVED_TIME.textContent = `Time saved: ${saved_time.toFixed(2)} minutes`
}

function updateVideoList() {
  video_list.map((vid) => {
    const li = document.createElement("li");
    li.textContent = `${vid.length}`
    VIDEO_LIST.appendChild(li)
  })

}

function addToList(video_length, video_speed, id) {
  video_length = parseFloat(video_length)
  video_speed = parseFloat(video_speed)
  calculated_duration = video_length/video_speed
  saved_time = video_length-calculated_duration

  const data = [{
    id: id,
    length: video_length,
    speed: video_speed,
    savedTime: saved_time,
    calculatedDuration: calculated_duration
  }]

  video_list = video_list.concat(data)

}

// function that runs on the start of the program
(function() {
  console.log('the script started')
  VIDEO_LENGTH.value = 1
  VIDEO_SPEED.value = 1
  VIDEO_SPEED_INDICATOR.innerHTML = `${video_speed}x`
  updateUi()
}) ()