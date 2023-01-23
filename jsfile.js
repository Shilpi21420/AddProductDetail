document.addEventListener('DOMContentLoaded', reload)
async function reload(event){
    await axios.get("https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/Ecommercewebsite")
    .then(displayData =>{
            for(let i=0; i<displayData.data.length; i++) {
                showOutput(displayData.data[i])
            }
        })
        

    shows();
}

let getCallBtn = document.getElementById('submitButton')
getCallBtn.addEventListener('click', postUserData)

async function  postUserData(event01){   
    console.log('Button is working')
    let amount = document.getElementById('amount').value
    let description = document.getElementById('description').value              
    
    let userObj = {"Amount": amount, "Description":description}
    
    await axios.post("https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/Ecommercewebsite", userObj)
    
    showOutput(userObj)

}

function showOutput(obj){
    let mainClass = document.getElementById('mainList')
    let childClass = document.createElement('li')
    childClass.textContent = `${obj.Amount}  -  ${obj.Description}`
    mainClass.append(childClass)
    
    let delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.style.borderBlockColor = 'red'
    childClass.appendChild(delBtn)
    
    delBtn.addEventListener('click',async()=>{
        if(confirm('Do you want to delete the Product?')){
                await axios.get('https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/Ecommercewebsite')
                .then(async(deleteObj) => {
                        let results = [];
                        let toSearch = obj.Description;
                        for(var i=0; i<deleteObj.data.length; i++) {
                        for(key in deleteObj.data[i]) {
                            if(deleteObj.data[i][key].indexOf(toSearch)!=-1) {
                            results.push(deleteObj.data[i]);
                            }
                        }
                        }
                        let delId = results[0]._id
                        console.log(delId)
                        let delUrl = `https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/Ecommercewebsite/${delId}`
                        console.log(delUrl)
                        await axios.delete(delUrl)
                    
                    })
                mainClass.removeChild(childClass)
                
                
            }

            
     })


    
}
function shows(){
let mainC = document.getElementById('mainL')
let childC = document.createElement('li')
let totalSum = document.createElement('button')
totalSum.textContent = 'Total '
totalSum.style.borderBlockColor = 'green'
mainC.append(totalSum)
totalSum.addEventListener('click', async()=>{   
 
    let total=0;

   await axios.get('https://crudcrud.com/api/a3f94cfcaf2d4fa5b21248daba9072c6/Ecommercewebsite')
    .then(result =>{
            result.data.forEach(element => {
            let temp = element.Amount;
            total = total + parseInt(temp);
        });
        alert(total)
        
    })
 })
}
