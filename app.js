const fs=require('fs')
const path = require('path')
const storePath=path.join(__dirname,'./store.json')
const  express=require('express')
const app=express()

const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))






const readFile=()=>{
    const cosmeticItems=JSON.parse(fs.readFileSync(storePath))
    return cosmeticItems
}

const writeFile=(rest)=>{
    fs.writeFileSync(storePath,JSON.stringify(rest),'utf8')
}


app.post('/product',(req,res)=>{
    const rest=readFile()
    console.log(req)
    console.log(req.body.rest.name)
    if(Object.keys(req.body.rest).length>7)
    {
        console.log("parameter should not exceed 7");
       res.json({
        Error: "osppja"
       })
    }

    if(req.body.rest.name>=0 && req.body.rest.name<=9){
       console.log(req.body.rest.name)
       res.json({
        Error:"kindly Enter the  vaild Input"
         
       })
    
    }
    

    rest.cosmeticItems.push({id: Math.floor(Math.random()*10),...req.body.rest})
    writeFile(rest)
    res.json('product is successfully Created')
})

app.get('/products',(req,res)=>{
    const show=readFile()
    res.json({
              messsage:'whole data',
              data:show.cosmeticItems 
        } )
        
})


app.put('/udpate/:id',(req,res)=>{
      const {cosmeticItems}= readFile()
      const updatedData=cosmeticItems.map((rest)=>{
        if(req.params.id == rest.id){
            return {id: rest.id,...req.body.rest}
            
        }
        return rest
        
      })
      console.log(updatedData)
      console.log(req.body.cosmeticItems)
      writeFile({cosmeticItems:updatedData})
      res.json({
        message:"data updated successfully",
        rest:{
            ...req.body.rest
        }
      })
})

app.delete("/datadelete/:id",(req,res)=>{
    const {cosmeticItems} =readFile()
    const deletedata=cosmeticItems.filter(rest =>{
        return req.params.id !=rest.id
    })
    writeFile({cosmeticItems:deletedata})
    res.json({
        message:"your data deleted successfully"
    })
})





app.listen(3000,()=>{
    console.log(`Server was Worked`)
})

