var title = document.getElementById('title');
var price = document.getElementById('price');
var taxes = document.getElementById('taxes');
var ads = document.getElementById('ads');
var discount = document.getElementById('discount');
var total = document.getElementById('total');
var count = document.getElementById('count');
var category = document.getElementById("category");
var submit = document.getElementById('submit');
var tmp;


var mood = 'create';


function gettotal(){
    if(price.value != ''){
        var result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = '#040';

    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02';

    }
}
/////////create products/////////////
var datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro =[];
}

submit.onclick = function(){
    var newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if(title.value !='' && price.value != '' && newpro.count < 100 ){
        if(mood === 'create'){
            if(newpro.count >1 ){
                for( var i = 0; i<newpro.count; i++ ){
                    datapro.push(newpro);
                }
            }
                    
                else{
        
                    datapro.push(newpro);
            }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata();
    
    }
    


  

    localStorage.setItem('product', JSON.stringify(datapro) )
    console.log(datapro)
   
    showdata();

}
//////clear inputs//////////////
function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value='';

}
///////////////read data//////////////
function showdata(){
    gettotal()
  var table = '';
    for(var i = 0; i < datapro.length;i++){

        table += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button id="update" onclick="updatedata(${i})">update</button></td>
    <td><button id="delete" onclick="deletedata( ${i})">delete</button></td>
</tr>


    
    
    
    `
    }
    document.getElementById('tbody').innerHTML = table;
    var btndelete = document.getElementById('deleteall');
    if ( datapro.length > 0){
        btndelete.innerHTML = `

        <button onclick="deleteAll()" >Delete All(${datapro.length})</button>
        `
    }else{
        btndelete.innerHTML = '';
    }


}
///////delete element/////////////
function deletedata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}
 function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
 }



 ////////////////update///////////////
 function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    gettotal();
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
    
 }


 ////////////search/////////////////
 var searchmood = 'title';
 function getsearchmood(id){
    var search = document.getElementById('search');

    if(id == 'searhtitle'){
        searchmood = 'title';
        search.placeholder = 'search by title';
    }else{
        searchmood = 'category';
        search.placeholder = 'search by category';
        

    }
search.focus()

 }
 function searchdata(value){
    var table ='';
    if (searchmood == 'title'){

        for(var i = 0; i < datapro.length;i++){
            if(datapro[i].title.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="update" onclick="updatedata(${i})">update</button></td>
                <td><button id="delete" onclick="deletedata( ${i})">delete</button></td>
            </tr>
            
            
                
                
                
                `;
            }
        }




    }
   
    else{

        for(var i = 0; i < datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button id="update" onclick="updatedata(${i})">update</button></td>
                <td><button id="delete" onclick="deletedata( ${i})">delete</button></td>
            </tr>
            
            
                
                
                
                `;
            }
        }


    }
    document.getElementById('tbody').innerHTML = table;


 }



showdata();


