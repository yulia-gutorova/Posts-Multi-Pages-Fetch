const $createPost = document.querySelector('#create-post');
const BASE_URL = '/api/post'


//*************************************************************************** 
//----- CREATE A NEW POST ------- 
//*************************************************************************** ;

    const $form = document.querySelector('#create-form');
    const input = document.getElementById('title');
    const text = document.getElementById('text');
  
    $form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      const newPost = {
        title: input.value,
        text: text.value
      }
      
      try{
        const res = await fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(newPost),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
      }catch(error) {
        console.log(error);
    }
    
      location.replace("index.html");  
    }) 
 
  
  //----- CREATE A NEW POST ------- end