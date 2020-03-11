//Hash Map implementation using array
class HashMap{

    constructor(capacity = 3){
        this.buckets = new Array(capacity);
        this.collisions = 0;
    }
  
    set(key, value){
        const bucketIndex = this.getIndex(key);
        if(this.buckets[bucketIndex]) {
            this.buckets[bucketIndex].push({key, value});
            if(this.buckets[bucketIndex].length > 1){ 
                this.collisions++;
            }
        } else {
            this.buckets[bucketIndex] = [{key, value}];
        }
      return this;
    }
  
    get(key){
        const bucketIndex = this.getIndex(key);
        for (let arrayIndex = 0; arrayIndex < this.buckets[bucketIndex].length; arrayIndex++){
            const entry = this.buckets[bucketIndex][arrayIndex];
            if(entry.key === key) {
                return entry.value
            }
        }
    }

    delete(key){
        const bucketIndex = this.getIndex(key);
        for (let arrayIndex = 0; arrayIndex < this.buckets[bucketIndex].length; arrayIndex++){
            const entry = this.buckets[bucketIndex][arrayIndex];
            if(entry.key === key) {
                //this.buckets[bucketIndex][arrayIndex]=undefined;
                this.buckets[bucketIndex].splice(arrayIndex, 1);
            }
        }
    }
  
    hash(key){
        let hashValue = 0;
        const stringTypeKey = `${key}${typeof key}`;
  
        for (let index = 0; index < stringTypeKey.length; index++){
            const charCode = stringTypeKey.charCodeAt(index);
            hashValue += charCode << (index * 8);
        }
  
        return hashValue;
    }
  
    getIndex(key){
        const indexHash = this.hash(key);
        const index = indexHash % this.buckets.length;
        return index;
    }
}

//TEST
const hashMap = new HashMap();

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('Command: ');
readline.on('line', (input) => {
    const space = ' ';
    input = input.split(space, 3);
    switch(input[0]){

        case 'set':
            hashMap.set(input[1], input[2]);
            console.log(`key ${(input[1])} with value ${(input[2])} is set`)
            break;
            
        case 'get':
            console.log(`value of ${(input[1])} :`,hashMap.get(input[1]));
            break;

        case 'del':
            hashMap.delete(input[1]);
            console.log(`pair with key ${(input[1])} deleted`,);
            break;

        case 'show':
            console.log('collisions counter: ', hashMap.collisions);
            console.log('hashMap.buckets\n', hashMap.buckets);
            break;

        default:
            console.log('Incorrect input');
            return process.kill(process.pid);
    }
    console.log('Command: ');
})