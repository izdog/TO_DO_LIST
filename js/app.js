const boxes = document.querySelectorAll('.box')
const submit = document.getElementById('submit')
const items = document.querySelectorAll('.list-item')


submit.addEventListener('click', e => {
    e.preventDefault()
    const type = getRadioChecked()
    const id = parseInt(getOptionSelected())
    const content = getContent()

    const task = new Task(content, type, id)

    task.valideData()

    if(task.errors.length > 0){
        task.errors.forEach( error => {
            error.displayError()
        })
    } else {
        task.displayItem()
        displayModal('La tâche a bien été ajoutée')
        resetForm()
    }

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

const eraseErrors = () => {
    const errors = document.querySelectorAll('.form-error')
    if(errors.length > 0){
        errors.forEach(error => error.remove())
    }
}

const displayModal = content => {
    const body = document.querySelector('body')
    let modal = document.createElement('div')
    let modalContent = document.createElement('div')

    modal.classList.add('modal')
    modalContent.classList.add('modal-content')

    modalContent.innerHTML = `<p>${content}</p>`

    modal.append(modalContent)
    body.append(modal)

    setTimeout(() => {
        modal.classList.add('show')
        setTimeout(() => {
            modal.classList.remove('show')
            setTimeout(() => {
                modal.remove()
            }, 2500)   
        }, 1500)
    })

}

function Task(content, type, id){
    this.persons = [
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
    this.content = content
    this.type = type
    this.id = id
    this.errors = []
    this.item

    this.valideData = () => {
        if(!this.content){
            this.errors.push(new Error('Content field is missing', 'content'))
        }

        if(!this.type){
            this.errors.push(new Error('You must pick a type', 'form-radio'))
        }

        if(!this.id){
            this.errors.push(new Error('You must pick a person', 'person'))
        }

        return false
    }

    this.displayItem = () => {
        const listContainer = document.getElementById('list--container')
        const listItem = this.createItem()
    
        listContainer.append(listItem)
    }

    this.createItem = () => {
        const person = this.persons.find(person => person.id === this.id)
        console.log(person)
        this.item = document.createElement('div')
        let avatar = document.createElement('img')
        let task = document.createElement('div')
        let span = document.createElement('span')

        span.classList.add('list-close')
        span.innerHTML = `<i class="large material-icons">close</i>`

        this.item.classList.add('list-item', this.type)

        avatar.src = person.avatar
        avatar.alt = 'People'

        task.innerHTML = `<p>${this.content}</p>`

        this.item.append(avatar)
        this.item.append(task)
        this.item.append(span)

        this.item.addEventListener('click', this.removeItem)

        return this.item
    }

    this.removeItem = () => {
        displayModal('La tâche a bien été supprimé')
        this.item.setAttribute('data-remove', 'remove')
        setTimeout(() => {
            this.item.remove()
        }, 350);
    }

}

function Error(content, input){
    this.content = content
    this.input = input

    this.displayError = () => {
        console.log('trigger')
        const getElement = document.getElementById(this.input)
        const errorContent = `<p class="form-error">${this.content}</p>`
        getElement.insertAdjacentHTML('afterend', errorContent)
    }
}

const removeItem = item => {
    displayModal('La tâche a bien été supprimée')
    item.setAttribute('data-remove', 'remove')
    setTimeout(() => {
        item.remove()
    }, 350);
}

const resetForm = () => {
    const select = document.getElementById('person')
    document.getElementById('content').value = ''
    document.querySelector('input[name="type"]:checked').removeAttribute('checked')
    select.options[select.selectedIndex].removeAttribute('selected')

}

items.forEach(item => {
    item.addEventListener('click', removeItem.bind(this, item))
})



