let bookcover = document.getElementById("cover");
let next = document.getElementById("nextq");
let review = document.getElementById("answerbutton");
let answer = document.getElementById("theanswercontent");


// create the answers pool
let answerpool = ["A Substantial Effort Will Be Required", "Don't Hesitate", "Investigate And Then Enjoy It", "Mishaps Are Highly Probable", "The Outcome Will Be Positive"]

// ask question and get answer
let newanswer = function() {
    let index = Math.floor(Math.random() * answerpool.length)
    let rand = answerpool[index]
    return rand
}


let openbook = function() {
    bookcover.style.display = "none";
    next.style.display = "block";
    review.style.display = "none";
    answer.innerHTML = newanswer();
    answer.style.display = "block";

}

let closebook = function() {
    bookcover.style.display = "block";
    next.style.display = "none";
    review.style.display = "block";
    answer.style.display = "none";
}

review.onclick = openbook;
next.onclick = closebook;







