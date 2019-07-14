const boxes = document.querySelectorAll('.box')
const peoples = [
    {
        id: 1,
        name: 'Brigitte',
        avatar: 'https://i.pravatar.cc/150?img=15'
    },
    {
        id: 2,
        name: 'Marcel',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        id: 3,
        name: 'Bernadette',
        avatar: 'https://i.pravatar.cc/150?img=22'
    },
    {
        id: 4,
        name: 'Ernest',
        avatar: 'https://i.pravatar.cc/150?img=18'
    }
]
const submit = document.getElementById('submit')
const listContainer = document.getElementById('list--container')


submit.addEventListener('click', e => {
    e.preventDefault()
    const radioValue = getRadioChecked()
    const option = getOptionSelected()
    const content = getContent()

    const formData = new Data(content, radioValue, option)

    console.log(formData.valideData(), formData)
})


const getRadioChecked = () => {
    const radio = document.querySelector('input[name="type"]:checked')
    if(radio === undefined || radio === null){
        return false
    }

    return radio.value
}

const getOptionSelected = () => {
    const select = document.getElementById('person')
    const optionSelected = select.options[select.selectedIndex].value

    if(optionSelected === undefined || optionSelected === null || optionSelected === ''){
        return false
    }

    return optionSelected
}

const getContent = () => {
    const content = document.getElementById('content').value

    if(content === ''){
        return false
    }

    return content
}

const createListItem = (id, type, content) => {
    const person = peoples.find(people => people.id === id)
    const span = createClose()
    let listItem = document.createElement('div')
    let avatar = document.createElement('img')
    let task = document.createElement('div')
    
    listItem.classList.add('list-item', content)
    avatar.src = person.avatar
    avatar.alt = 'People'
    task.innerHTML = `<p>${content}</p>`

    listItem.append(avatar)
    listItem.append(task)
    listItem.append(span)

    return listItem
}


const createClose = () => {
    let span = document.createElement('span')
    span.classList.add('list-close')
    span.innerHTML = `<i class="large" material-icons">close</i>`

    return span
}

const validateForm = data => {

}

function Data(content, type, person){
    this.content = content
    this.type = type
    this.person = person
    this.errors = []

    this.valideData = () => {
        if(!this.content){
            this.errors.push(new Error('Field is missing', 'content'))
        }

        if(!this.type){
            this.errors.push(new Error('Pick a type', 'form-radio'))
        }

        if(!this.person){
            this.errors.push(new Error('Pick a person', 'person'))
        }

        if(this.errors.lenght > 0){
            this.displayErrors()
        }

        return false
    }

    this.displayErrors = () => {
        console.log('tig')
        this.errors.foreach( error => {
            const getElement = document.getElementById(error.input)
            const errorContent = `<p>${error.content}</p>`
            getElement.insertAdjacentHTML('afterend', errorContent)
        })
    }
}

function Error(content, input){
    this.content = content
    this.input = input 
}
// const removeElement = (box) => {
//     console.log(box)
//     box.setAttribute('data-show', '')
//     setTimeout(() => {
//         box.remove()
//     }, 350);
// }


// boxes.forEach( box => {
//     box.addEventListener('click', removeElement.bind(this, box))
// })


