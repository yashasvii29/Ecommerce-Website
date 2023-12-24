console.log("connected");
const allLikeButton = document.querySelectorAll('.like-btn');
// jab like button pr click krenge toh click event perform hoga and we will send the ajax request to the server so like button ke liye api create krenge in productapi.js file in routes folder

async function likeButton(productId , btn){
    try{
        let response = await axios({
            method: 'post',
            url: `/product/${productId}/like`,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
        });
        
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas')
            btn.children[0].classList.add('far')
        } else{
            btn.children[0].classList.remove('far')
            btn.children[0].classList.add('fas')
        }
        // console.log(response);
    }
    catch (e) {
        // console.log(e);
        window.location.replace('/login'); //redirect
        // console.log(e.message)
    }
}


for(let btn of allLikeButton){
    btn.addEventListener('click' , ()=>{
        console.log(btn.getAttribute('product-id'));
        let productId = btn.getAttribute('product-id'); // isse uss product ki id aa jayegi jis product ko user ne like kiya hai
        likeButton(productId,btn);
    })
}