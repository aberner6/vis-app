import { select, selectAll } from 'd3-selection'

export function renderSound(data) {
    console.log(data)
    console.log("HELLO")
  return new Promise((resolve, reject) => {

    const svg = select(document.querySelector('#sounds'))

    const dataArray = [
      data.Q1,
      data.Q2,
      data.Q3,
      data.Q4,
      data.Q5,
      data.Q6,
      data.Q7,
      data.Q8,
      data.Q9,
      data.Q10
    ]

    // const sounds = g.selectAll('audio')
    //   .data(dataArray)

  })
}
