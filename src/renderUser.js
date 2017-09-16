import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
import { interpolate as d3Interpolate } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

export function renderUser(data) {

  return new Promise((resolve, reject) => {

    const svg = select(document.querySelector('#lines-grid'))

    const dimensions = svg.node().parentNode.getBoundingClientRect()

    const w = dimensions.width;
    const h = 340; //dimensions.height;

    svg
      .style('height', h)
      .style('width', w)

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

    const g = svg.select('#grid-container').attr("transform", "translate(" + w/2 + "," + h/2 + ")"); 
    
    var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    var arcData = d3Arc()
    .innerRadius(function(d,i) {
      return 20 + i * 5 + 2
    })
    .outerRadius(function(d,i) {
      return 20 + (i+1)*(5)
    })
    .startAngle(0 * (Math.PI/180))
    .endAngle(function(d,i) {
      return d/100 * tau
    })

    function arc2Tween(d, indx) {
      var currentVal = (!this._current) ? 0 : this._current
      var interp = d3Interpolate(currentVal, d)
      this._current = d

      return function(t) {
        var tmp = interp(t)
        return arcData(tmp, indx)
      }
    }

    const arcs = g.selectAll('path')
      .data(dataArray)

    arcs.transition()
      .duration(300)
      .attrTween('d', arc2Tween)

    arcs.enter()
        .insert('path')
        .attr('class', 'arc-path')
        .style("fill", "#ddd")
        .attr("d", arcData)
        .merge(arcs)


    //hello matt, i am being evil and inserting audio
    //into your beautiful arcs
    //these elements are loaded in the index.html (public) file
    //seems to be the best / easiest way so far
    //if it's wrong, we find a different way
    //yes, i know it's complete hacky

    //have to find a way to make it so the active slider
    //is the one triggering audio?

    //and if slider is inactive, it goes down to pause
    //or to experiment with: a low murmur for example
    //like a.volume = 0.2
    //https://www.w3schools.com/jsref/dom_obj_audio.asp

    //could there be a way that we know that we are in the "values" zone
    //not sure where this is in the data :)
    //clearly i operate only on if statements
    var timeAdjust = scaleLinear()
      .domain([0, 100])
      .range([0, 200])
 
    var tracks = ["audio0","audio1","audio2","audio3","audio4","audio5"]
    //we get errors because it still evaluates that it should play the sliders that have input
    //but i dont feel like dealing with this
    function playPause(active, num){
      for (var j=0; j<tracks.length; j++){
        if(tracks[j]!=("audio"+active)){
          var pausedTrack = document.getElementById("audio"+j)
          pausedTrack.pause();
        }else{
          var activeTrack = document.getElementById("audio"+active)
          console.log(active)
          //maybe only play for 10 seconds?
          activeTrack.currentTime = num //timeAdjust(data.Q1)
          activeTrack.play()
        }
      }
    }
    if(data.Q7>0 && data.Q7<50){
      playPause(0, data.Q7)
    }
    if(data.Q7>50 && data.Q7<100){
      playPause(1, data.Q7)
    }   

    if(data.Q8>0 && data.Q8<50){
      playPause(2, data.Q8)
    }
    if(data.Q8>50 && data.Q8<100){
      playPause(3, data.Q8)
    }  

    if(data.Q9>0 && data.Q9<50){
      playPause(4, data.Q9)
    }  
    if(data.Q9>50 && data.Q9<100){
      playPause(5, data.Q9)
    }
    //i'd like to change this to - "if you are at the last section"
    //but not sure where that is formally recorded in the data 
    //as in, where is "next" activated
    if(data.Q10>0){
      playPause(6, 0)
    }  

  })
}
