const API_KEY = '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';
const submitButton = document.querySelector('#submit');
const output=document.querySelector('#output');
const input=document.querySelector('input');
const history=document.querySelector('.history');
const newchat=document.querySelector('#newchat');

const allmessages=[{'role':"system",'content':"you are a assistant,but you need to answer like a drunkard"}]

function changeInput(value){
    const input=document.querySelector('input');
    input.value=value; 
}
async function getMessage() {
    console.log('clicked')
    allmessages.push({role: "user", content: input.value})
    // console.log(allmessages)
    const options={
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages:allmessages,
            max_tokens: 100
          })
          
    }
    try {
        const response=await fetch('https://api.openai.com/v1/chat/completions',options)
        const data=await response.json()
        console.log(data)
        output.textContent=data.choices[0].message.content;
        allmessages.push({role: "system", content: data.choices[0].message.content});
        if(data.choices[0].message.content && input.value){
            const li=document.createElement('li');
            li.textContent=input.value;
            li.addEventListener('click',changeInput(li.textContent))
            history.appendChild(li);
        }
    }catch (error) {
        console.error(error)

    }
}
submitButton.addEventListener('click', getMessage);

newchat.addEventListener('click',()=>{
    input.value='';
    // history.textContent='';
})