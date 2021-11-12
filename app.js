
const VIDEO_LENGTH = document.querySelector('.video_length'),
VIDEO_SPEED = document.querySelector('.video_speed'),
TOTAL_DURATION = document.querySelector('.total_duration'),
CALCULATED_DURATION = document.querySelector('.calculated_duration')
SAVED_TIME = document.querySelector('.saved_time')

const ADD_BUTTON = document.querySelector('.add'),
VIDEO_LIST = document.querySelector('.list')

let video_length = 1
video_speed = 1

let video_list = [

]

VIDEO_LENGTH.addEventListener('input', (e) => {
  video_length = e.target.value
  updateUi(e)
})

VIDEO_SPEED.addEventListener('input', (e) => {
  video_speed = e.target.value
  console.log(e.target.value)
  updateUi(e)
})

ADD_BUTTON.addEventListener('click', () => {
  addToList(video_length, video_speed)
  
  const li = document.createElement('li')

  li.innerHTML = `
      <h2>Aproximated duration at (1x): ${video_length/video_speed}</h2>
      <p>Original duration: ${video_length}</p>
      <p>Time saved: ${video_length-video_length/video_speed}</p>
  `
  li.addEventListener('click', (e) => {
    // e.target.parentNode.removeChild(e.target)
    e.target.closest('li').remove()
  })
  
  VIDEO_LIST.appendChild(li)

  // document.querySelectorAll('.tittle').forEach(item => {
  //   item.addEventListener('click', (e) => {
  //     // e.target.parentNode.removeChild(e.target)
  //     e.target.closest('li').remove()
  //   })
  // })

})



function updateUi(e) {
  TOTAL_DURATION.textContent = `Total duration: ${video_length}`
  // console.log(e)
  CALCULATED_DURATION.textContent =   `Aproximated duration at (${video_speed}x): ${video_length/video_speed}`
  SAVED_TIME.textContent = `Time saved: ${video_length-video_length/video_speed}`
}

function updateVideoList() {
  video_list.map((vid) => {
    const li = document.createElement("li");
    li.textContent = `${vid.length}`
    VIDEO_LIST.appendChild(li)
  })

}

function addToList(video_length, video_speed) {
  const data = [{
    length: parseFloat(video_length),
    speed: parseFloat(video_speed)
  }]

  video_list = video_list.concat(data)
}

(function() {
  console.log('the script started')
  VIDEO_LENGTH.value = 1
  VIDEO_SPEED.value = 1
  updateUi()
}) ()