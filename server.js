const xml2js=require('xml2js')
const fs=require('fs')


const arr1=[]
const arr2=[]
const arr3=[]
const arr4=[]
const obj={}
fs.readFile(__dirname+'/model1.xml',(err,data)=>{
  if(err) throw new Error(err)

  const parser1=new xml2js.Parser()

  parser1.parseStringPromise(data)
      .then((res)=>{
          for(let i=0;i<6;i++){
              arr1.push(res.tutorials.tutorial[i])
          }
          console.log(arr1)
      }).catch((err)=>{
        console.log(err)
      })
})

fs.readFile(__dirname+'/model2.xml',(err,data)=>{
  if(err) throw new Error(err)

  const parser2=new xml2js.Parser()

  parser2.parseStringPromise(data)
      .then((res)=>{
        for(let i=0;i<6;i++){
          arr2.push(res.tutorials.tutorial[i])
      }
      console.log(arr2)
      }).catch((err)=>{
        console.log(err)
      })
      comp(arr1,arr2)
})

function comp(a1,a2){
    for(let i=0;i<a2.length;i++){
      let count=0
      for(let j=0;j<a1.length;j++){
          if(a2[i].title===a1[j].title){
              count =count+1
          }
      }
      if(count===1){
        a2[i].p="both"
         arr4.push(a2[i])
      }else{
        a2[i].p=2
        arr4.push(a2[i])
      }
    }
    console.log(arr4)
    for(let i=0;i<a1.length;i++){
      let count=0
      for(let j=0;j<a2.length;j++){
          if(a1[i].title===a2[j].title){
              count =count+1
          }
      }
      if(count===1){
         a1[i].p="both"
      }else{
        a1[i].p=1
        arr3.push(a1[i])
      }
    }
    console.log(arr3)
    const combArr=arr4.concat(arr3)

    for(let k=0;k<combArr.length;k++){
      obj[k]=combArr[k]
    }

    const builder=new xml2js.Builder()
    let xml=builder.buildObject(obj)
    console.log(xml)
}

