const user = 'Gaurav'
function sayHelloToRahul(){
    console.log('Hi Rahul')
}
function sayHelloToRohit(){
    console.log('Hi Rohit')
}
function sayHello(){
    console.log('Hi, How are you')
}

if(user === 'rohit') {
    sayHelloToRohit()
}
else{
    sayHello()
}

if(user === 'rahul'){
    sayHelloToRahul()
}
function calculateMyGrade(number){
    if(number>70){
        console.log("your grade is A")
    }else{
        console.log("your grade is B")
    }
}

calculateMyGrade(90)