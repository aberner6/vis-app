import { select, selectAll } from 'd3-selection'
// import { scaleBand } from 'd3-scale'
import { interpolate as d3Interpolate } from 'd3-interpolate'
// import { range } from 'd3-array'
import { arc as d3Arc } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

export function renderUser(data, viz = false) {

  return new Promise((resolve, reject) => {

    const svg = select(document.querySelector('#lines-grid'))

    const dimensions = svg.node().parentNode.getBoundingClientRect()

    const w = dimensions.width;
    const h = dimensions.height > 0 ? dimensions.height : 280 //dimensions.height;

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

    var arcMin = 15
    var arcWidth = 10
    var arcPad = 3

    if (viz) {
      arcMin = 40
      arcWidth = 30
      arcPad = 5
    }

    var arcData = d3Arc()
    .innerRadius(function (d, i) {
      return arcMin + i * arcWidth + arcPad
    })
    .outerRadius(function (d, i) {
      return arcMin + (i + 1) * (arcWidth)
    })
    .startAngle(0 * (Math.PI/180))
    .endAngle(function (d, i) {
      return d/100 * Math.PI
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

    const arcColorCode = [
      '#ee2a7b',
      '#f48ca8',
      '#fbd6dd',
      '#607aa5',
      '#9bc2e7',
      '#c7e4f7',
      '#c4c4c4',
      '#c4c4c4',
      '#c4c4c4',
      '#FFF',
    ]

    const arcsRight = g.selectAll('path.arcRight')
      .data(dataArray)

    arcsRight.transition()
      .duration(300)
      .style('opacity', function(d){
        var op = (d == 50) ? '0.25' : '1'
        return op
      })
      .attrTween('d', arc2Tween)

    arcsRight.enter()
      .insert('path')
      .attr('class', 'arcRight')
      .style("fill", function(d, i) {
        return arcColorCode[i]
      })
      .style('opacity', '0')
      .attr("d", arcData)
      .merge(arcsRight)

    const arcsLeft = g.selectAll('path.arcLeft')
      .data(function() {
        const dataInverse = []
        for (var i = 0; i < dataArray.length; i++) {
          dataInverse[i] = 100 - dataArray[i]
        }
        return dataInverse
      })

    arcsLeft.exit().remove()

    arcsLeft.transition()
      .duration(300)
      .style('opacity', function(d){
        var op = (d == 50) ? '0.25' : '1'
        return op
      })
      .attrTween('d', arc2Tween)

    arcsLeft.enter()
      .insert('path')
      .attr('class', 'arcLeft')
      .style("fill", function(d, i) {
        return arcColorCode[i]
      })
      .attr("d", arcData)
      .style('opacity', '0')
      .attr('transform', 'rotate(180)')
      .merge(arcsLeft)

    const circs = g.selectAll('circle')
      .data(dataArray)
      .enter()
      .insert('circle')
      .attr('class','circ')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', function(d,i){
        return arcMin + (i + 1) * (arcWidth)
      })
      .style("fill","none")
      .style("stroke","#6d6e71")
      .style("stroke-width",function() {
        return (viz) ? 2 : 1
      })
      .style('opacity', '0.25')







    // //hello matt, i am being evil and inserting audio
    // //into your beautiful arcs
    // //these elements are loaded in the index.html (public) file
    // //seems to be the best / easiest way so far
    // //if it's wrong, we find a different way
    // //yes, i know it's complete hacky

    // //have to find a way to make it so the active slider
    // //is the one triggering audio?

    // //and if slider is inactive, it goes down to pause
    // //or to experiment with: a low murmur for example
    // //like a.volume = 0.2
    // //https://www.w3schools.com/jsref/dom_obj_audio.asp

    // //could there be a way that we know that we are in the "values" zone
    // //not sure where this is in the data :)
    // //clearly i operate only on if statements

    var tracks = ["audio0","audio1","audio2","audio3","audio4","audio5"]
    //we get errors because it still evaluates that it should play the sliders that have input
    //but i dont feel like dealing with this
    function playPause(active, num){
      console.log(active)
      var active = active;
      for (var j=0; j<tracks.length; j++){
        if(tracks[j]!=("audio"+active)){
          var pausedTrack = document.getElementById("audio"+j)
          pausedTrack.pause();
        }
        else{
          if(active!=6){
            var activeTrack = document.getElementById("audio"+active)
            //console.log(active)
            //maybe only play for 10 seconds?
            activeTrack.currentTime = num //timeAdjust(data.Q1)
            activeTrack.play()
            console.log(active)
                setTimeout(function(){
                    activeTrack.pause();
                    // active = true;
                }, 8000);
          }
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
    // if(data.Q10<50 || data.Q10>50){
    //   playPause(6, 0)
    // }

  })
}
