//*************************************************************************** 
//-------- GET THIS POST -------- 
//*************************************************************************** 
//const $createPost = document.querySelector('#create-post');
const $form = document.querySelector('#get-form');
const $title = document.querySelector('.card-title');
const $postContent = document.querySelector('.post-content');
const $date = document.querySelector('.date');

const BASE_URL = '/api/post'

let queryString = location.search;
let urlParams = new URLSearchParams(queryString);
let postId = urlParams.get('id');
getThisPost();  
  
async function getThisPost() {

    try {
        console.log('Get this post function');       
        const res = await fetch(`${BASE_URL}/${postId}`, {
            method: 'get'
        })
        const data = await res.json();  
        $title.textContent = data.post.title;
        $postContent.textContent = data.post.text;
        $date.textContent = new Date(data.post.date).toLocaleDateString();
        }
    catch (error) {
        console.log(error);
    }
}