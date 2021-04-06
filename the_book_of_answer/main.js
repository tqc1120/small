// create the answers pool
const the_answers_pool = ["You'be happy you did", "Shift your focus", "Get a clearer view", "It may already be a done deal", "Do not overdo it", "Do not waste your time", "You are too close to see", "Enjoy it", "The situatuion is unclear", "You are sure to have support", " If you do as you're told", "Trust yourself", "Now you can", "You don't really care"] 
// ask question and get answer
function get_answer() {
    const index_of_answer = Math.floor(Math.random() * the_answers_pool.length)
    return the_answers_pool[index_of_answer]
}

console.log(get_answer())