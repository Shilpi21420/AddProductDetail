document.addEventListener('DOMContentLoaded', reload)
function reload(event){
    axios.get("https://crudcrud.com/api/0129f7f7cea14d8a8b192ed72cc78ce5/Ecommercewebsite")
    .then(displayData =>{
            for(let i=0; i<displayData.data.length; i++) {
                showOutput(displayData.data[i])
            }
        })
}
let getCallBtn = document.getElementById('submitButton')
getCallBtn.addEventListener('click', postUserData)
function postUserData(event01){   
    console.log('Button is working')
    let amount = document.getElementById('amount').value
    let description = document.getElementById('description').value              
    
    let userObj = {"Amount": amount, "Description":description}
    function addUserToCrudCrud(){
        axios.post("https://crudcrud.com/api/0129f7f7cea14d8a8b192ed72cc78ce5/Ecommercewebsite", userObj)
    }
    addUserToCrudCrud()
    showOutput(userObj)
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
    
    delBtn.addEventListener('click',()=>{
        if(confirm('Do you want to delete the Product?')){
                axios.get('https://crudcrud.com/api/0129f7f7cea14d8a8b192ed72cc78ce5/Ecommercewebsite')
                .then(deleteObj =>{
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
                        let delUrl = `https://crudcrud.com/api/0129f7f7cea14d8a8b192ed72cc78ce5/Ecommercewebsite/${delId}`
                        console.log(delUrl)
                        axios.delete(delUrl)
                    })
                mainClass.removeChild(childClass)
            }
             })
    totalSum.addEventListener('click', ()=>{   

        axios.get('https://crudcrud.com/api/0129f7f7cea14d8a8b192ed72cc78ce5/Ecommercewebsite')
        let sum = 0
        alert(sum)
        
    })
} 
