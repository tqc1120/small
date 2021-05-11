// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
  
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}

const pAequorFactory = (num, dna_arr) => {
    return {
        // object properties
        specimenNum : num,
        dna : dna_arr,
        
        mutate() {
            // from the DNA array(length = 15), find a random postion to mutate
            const mutatepositoin = Math.floor(Math.random() * 15)
            // the whole DNA pool
            const mutatepool = ["A", "T", "C", "G"]
            // remove the same DNA
            const index = mutatepool.indexOf(this.dna[mutatepositoin])
            mutatepool.splice(index, 1)
            // mutate
            const randomchange = Math.floor(Math.random() * 3)
            this.dna[mutatepositoin] = mutatepool[randomchange]
            return this.dna
        },

        compareDNA(current_pAequor) {
            // the counter of same dna
            let counter = 0
            // count the number of same dna 
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === current_pAequor.dna[i]) {
                    counter += 1
                }
            }
            same_dna = Math.floor(counter/15 * 100)
            console.log (`specimen pAequor and specimen current_pAequor have ${same_dna}% DNA in common`)
        },

        willLikelySurvive() {
            let CGcounter = 0
            // find how many 'C', 'G' are there in a dna
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === "c" || this.dna[i] === "G") {
                    CGcounter += 1
                }
            }
            // calculate if the ratio
            CGratio = Math.floor(CGcounter/15 * 100)
            if ( CGratio > 60 ) {
                return true
            } else {
                return false
            }
        },
        complementStrand() {
            complementary_dna = this.dna
            for (let i = 0; i <this.dna.length; i++) {
                if (this.dna[i] === "A") {
                    complementary_dna[i] = "T"
                } else if (this.dna[i] === "T") {
                    complementary_dna[i] = "A"
                } else if (this.dna[i] === "C") {
                    complementary_dna[i] = "G"
                } else if (this.dna[i] === "G") {
                    complementary_dna[i] = "C"
                }
            }
            return complementary_dna

        }
    }  
}
// test mutate func 
let ex1 = pAequorFactory(1, mockUpStrand())
console.log(ex1)
ex1.mutate()
console.log(ex1)

// test compare func
let ex2 = pAequorFactory(2, mockUpStrand())
let ex3 = pAequorFactory(3, mockUpStrand())
console.log(ex2)
console.log(ex3)
ex2.compareDNA(ex3)

// test Survive func
let ex4 = pAequorFactory(4, mockUpStrand())
console.log(ex4)
console.log(ex4.willLikelySurvive())

// create 30 instances of pAequor that can survive in their natural environment. 
let instances = []
let index = 1
while (instances.length < 30) {
    let curr = pAequorFactory(index, mockUpStrand());
    if (curr.willLikelySurvive() == true) {
        instances.push(curr);
        index += 1
    } 
}
console.log(instances)

// test complementStrand func
let ex5 = pAequorFactory(5, mockUpStrand())
console.log(ex5)
console.log(ex5.complementStrand())