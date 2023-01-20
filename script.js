document.addEventListener('DOMContentLoaded', reload)
async function reload(event){
    await axios.get("https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite")
    .then(displayData =>{
            for(let i=0; i<displayData.data.length; i++) {
                showOutput(displayData.data[i])
            }
        })
        
    showTotal();
}

let getCallBtn = document.getElementById('submitButton')
getCallBtn.addEventListener('click', postUserData)

async function  postUserData(event01){   
    console.log('Button is working')
    let amount = document.getElementById('amount').value
    let description = document.getElementById('description').value              
    
    let userObj = {"Amount": amount, "Description":description}
    
    await axios.post("https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite", userObj)
    
    showOutput(userObj)
    showTotal();
}

function showOutput(obj){
    let mainClass = document.getElementById('mainList')
    let childClass = document.createElement('li')
    childClass.textContent = `${obj.Amount}  -  ${obj.Description}`
    mainClass.append(childClass)
    let totalSum = document.createElement('button')
    totalSum.textContent = 'Total Product Value'
    totalSum.style.borderBlockColor = 'green'
    childClass.appendChild(totalSum)
    let delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.style.borderBlockColor = 'red'
    childClass.appendChild(delBtn)
    
    delBtn.addEventListener('click',async()=>{
        if(confirm('Do you want to delete the Product?')){
                await axios.get('https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite')
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
                        let delUrl = `https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite/${delId}`
                        console.log(delUrl)
                        await axios.delete(delUrl)
                    
                    })
                mainClass.removeChild(childClass)
                showTotal();
                
            }

            
     })


    totalSum.addEventListener('click', async()=>{   
 
        let total=0;

       await axios.get('https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite')
        .then(result =>{
                result.data.forEach(element => {
                let temp = element.Amount;
                total = total + parseInt(temp);
            });
            alert(total)
            
        })
     })
}
    
   
async function showTotal() {
      await axios.get('https://crudcrud.com/api/5fabbf83b26b4c8b9218bf1d3e0de6cb/Ecommercewebsite')
        .then(result =>{
                
           let total =0;
              result.data.forEach(element => {
                let temp = element.Amount;
                total = total + parseInt(temp);
            });
            let mainClass = document.getElementById('totalvalue')
            mainClass.innerText = `${total}`
        })
 }