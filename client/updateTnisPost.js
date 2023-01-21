//*************************************************************************** 
//-------- UPDATE THIS POST ----- 
//*************************************************************************** 
const $form = document.querySelector('#update-form');
const title = document.getElementById('title');
const text = document.getElementById('text');

const BASE_URL = '/api/post'

let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let postId = urlParams.get('id');
updateThisPost(); 


async function updateThisPost() {  
    console.log('Update this post function'); 
    try
    {
   
        let res = await fetch(`${BASE_URL}/${postId}`, 
        {
            method: 'get'
        })

        const data = await res.json();  
        title.value = data.post.title;
        text.value = data.post.text;

        $form.addEventListener('submit', async (event)=>
        {
            event.preventDefault();

            let updatedPost = 
            {   _id: postId,
                title: title.value,
                text: text.value
            }

            try
            {
                res = await fetch(`${BASE_URL}/${postId}`, 
                {
                    method: 'put',
                    body: JSON.stringify(updatedPost),
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
                })
            }
            catch (error) 
            {
                console.log(error);
            }
            location.replace("index.html");
        });
    }
    catch (error) 
    {
        console.log(error);
    } 
}
  
   //-------- UPDATE THIS POST ----- end
  