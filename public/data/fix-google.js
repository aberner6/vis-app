const fs = require('fs')
const gc = require('./google_census.json')

const out = {}
const gender = []


for(var i = 0; i < gc.length; i++){
  var a = gc[i]
  if(gender.indexOf(a.gender) < 0){
    gender.push(a.gender)
  }
  if(a.ethnicity === 'African American'){
    a.ethnicity = 'Black or african american'
  }
  if(a.gender === 'Non-binary'){
    a.gender = 'Non Binary'
  }

  out[`google_census_${i}`] = a


}
fs.writeFile('google_census_ok.json',JSON.stringify(out), console.log)