const $posts = document.querySelector('#posts');

const btnHeaderCreate = document.getElementById('btn-header-create-new');
const btnHeaderDeleteAll = document.getElementById('btn-header-delete-all');

const BASE_URL = '/api/post'

//*************************************************************************** 
 //------------------- HTML ELEMENTS ---------------------- 
 //*************************************************************************** 

const card = function(post) { 
  return `  
  <div class="single-post-wrapper">
    <form class="single-post">
      <a href="" onClick="return false" id="card-title-link"><h2 class="card-title">${post.title}</h2></a>
      <div class="content" style="display: none;">        
        <p name='post-content' class='post-content'>${post.text}</p>         
      </div>
      <p>${new Date(post.date).toLocaleDateString()}</p>
      <hr>
      <div class="card-action">
        <a href="#"><button type="submit" class="show-content" data-id=${post._id}>Show content</button></a>
        <a href="getThisPost.html?id=${post._id}"><button type="button" class="get-this-post" data-id=${post._id}>Get only</button></a>       
        <a href="updateThisPost.html?id=${post._id}"><button type="button" class="update-this-post" data-id=${post._id}>Update</button></a>
        <a href="#"><button type="button" class="delete-this-post" data-id=${post._id}>Delete</button></a>          
      </div>
    </form>
  </div> 
  `
}


//  
const noPosts = function() { 
  return ` 
  <div class="content">
  <h3 class="card-title">No posts now</h3>
  </div>
  `
}
//---------- HTML ELEMENTS ------ end 

//*************************************************************************** 
//----- GET ALL POSTS ----------- 
//*************************************************************************** 

 
document.addEventListener("DOMContentLoaded", async function(event) {
  //event.preventDefault();
 try
 {
    const response = await fetch(BASE_URL);
    const data =await response.json();
    if (data.length == 0)
    {
      $posts.innerHTML = '';
      $posts.innerHTML = noPosts();
    }
    else
    {
      for (let d of data) 
      {    
        $posts.innerHTML += card(d);   //responce.map(post => card(post)).join(' ')           
      }

      //Listen to buttons
      const btnsDeleteThisPost = document.getElementsByClassName('delete-this-post');

      for (let button of btnsDeleteThisPost){
        button.addEventListener('click', deleteThisPost);
      } 

      const singleForms = document.getElementsByClassName('single-post');

      for (let form of singleForms){
        form.addEventListener('submit', showContent);
      }


/*     const btnsShowContent = document.getElementsByClassName('show-content');
       for (let button of btnsShowContent){
        button.addEventListener('click', showContent);
      }  */



    }
  }catch(error) 
  {
  console.log(error);
  }

}) 

//----- GET ALL POSTS ----------- end


//*************************************************************************** 
//------ DELETE ALL POSTS -------- 
//*************************************************************************** 
btnHeaderDeleteAll.addEventListener('click', async () =>{

  const decision = confirm('Are you sure?');

  if (decision) {
    try{    const res = await fetch(BASE_URL, {
      method: 'delete'
    })
  }catch(error) {
    console.log(error);
}

  }
}) 

//----- DELETE ALL POSTS  -------- end


//*************************************************************************** 
//------- DELETE THIS POST ----- 
//*************************************************************************** 

 async function deleteThisPost(event) {
    const id = event.target.dataset.id;
    const decision = confirm('Do you really want to delete this post?')
  
    if (decision) {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'delete'
      })
    }
     
  }
 
 //-------- DELETE THIS POST ---- end

//*************************************************************************** 
//------- SHOW CONTENT ANIMATION ----- 
//*************************************************************************** 
 async function showContent(event) {

  console.log("In show content fuction");
  event.preventDefault();
  let $form= $(this);
  let $jDivSibling = $form.children('.content');
  let $jCurrentButton = $form.children('.card-action').children('a').children('.show-content');

  if ($jDivSibling.is(":hidden")){
    $jDivSibling.show(2000);
    $jCurrentButton.html("Hide content");
  }

  else {
    $jDivSibling.fadeOut(2000);
    $jCurrentButton.html("Show content");
  }  
   
}
 //--- SHOW CONTENT ANIMATION --- end