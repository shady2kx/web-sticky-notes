class Notes {
    constructor(color, title, notes, author) {
        this.color = color;
        this.title = title;
        this.notes = notes;
        this.author = author;
    }
}

class Store {

    static getNotes() {

        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }
        return notes;
    }

    static displayNotes() {
        const notes = Store.getNotes();
        notes.forEach(function (note) {
            const card = document.querySelector('.notes-form');
            //  CREATE TR ELEMENT
            const singit = document.createElement('div');
            singit.setAttribute('class', 'col s12 m6 l4');
            //  Insert cols
            singit.innerHTML = `
                <div class="card small ${note.color}">
                    <div class="card-content black-text">
                        <span class="card-title">${note.title}</span>
                        <p>
                            <h4>${note.notes}</h4>
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="black-text"><i class="fa fa-trash-alt delete-item"></i></a>
                        <a href="#" class="secondary-content black-text right">${note.author}</a>
                    </div>
                </div>
            `;
            card.appendChild(singit);

        });
    }

    static addNotes(note) {

        const card = document.querySelector('.notes-form');
        //  CREATE TR ELEMENT
        const singit = document.createElement('div');
        singit.setAttribute('class', 'col s12 m6 l4');
        //  Insert cols
        singit.innerHTML = `
                <div class="card small ${note.color}">
                    <div class="card-content black-text">
                        <span class="card-title">${note.title}</span>
                        <p>
                            <h4>${note.notes}</h4>
                        </p>
                    </div>
                    <div class="card-action">
                        <a href="#" class="black-text delete-item"><i class="fa fa-trash-alt"></i></a>
                        <a href="#" class="secondary-content black-text right">${note.author}</a>
                    </div>
                </div>
            `;
        card.appendChild(singit);

    }
    static clearFields() {
        document.getElementById('notes').value = '';
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('color').value = '';


    }

    static storeNotes(note) {
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];
        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }

        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

    }

    static removeNotesStorage(notesItem) {

        let author = notesItem.parentElement.parentElement.textContent;
        console.log(author);
        let notes;
        if (localStorage.getItem('notes') === null) {
            notes = [];

        } else {
            notes = JSON.parse(localStorage.getItem('notes'));
        }
        notes.forEach(function (note, index) {
            if (author === note.author) {
                notes.splice(index, 1);
            }

        });
        localStorage.setItem('notes', JSON.stringify(notes));

    }

    static deleteNotes(target) {
        if (target.className === 'fa fa-trash-alt delete-item') {
            target.parentElement.parentElement.parentElement.parentElement.remove();
        }

    }

    static clearNotesLS() {
        localStorage.clear();

    }

}



// static showAlert(message, className) {
//     //   Create a div
//     const div = document.createElement('div');
//     //   Add class
//     div.className = `notif alert ${className}`;
//     div.appendChild(document.createTextNode(message));
//     //  Add text
//     //  Get Parent
//     const container = document.querySelector('.card-content');
//     //  Get form
//     const form = document.querySelector('#book-form');
//     //  insert alert
//     container.insertBefore(div, form);
//     //  TIME OUT of the alert
//     setTimeout(function () {
//         document.querySelector('.alert').remove();
//     }, 2000);
// }


document.addEventListener('DOMContentLoaded', (e) => {
    const note = new Notes(color, title, notes, author);
    Store.getNotes();
    Store.displayNotes(note);
    Store.deleteNotes(e.target);

});


//  EVENT LISTNERS
document.getElementById('form-notes').addEventListener('submit', (e) => {
    //   GET form values
    const notes = document.getElementById('notes').value,
        title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        x = document.getElementById('color');
    const color = x.options[x.selectedIndex].value;

    const note = new Notes(color, title, notes, author);
    //Instantiate UI if no input 
    if (title === '' || author === '' || notes === '' || color === '') {
        // Error alert
        // Store.showAlert("✖ Please fill all fields needed.", 'error');
        alert("Fil all fields needed.");

    } else {

        //  Add book

        Store.addNotes(note);
        Store.clearFields();
        Store.storeNotes(note);
        // Store.showAlert('✔ Book added successfully', 'success');
        // setTimeout(() => {
        //     location.reload();
        // }, 500);
    }
    e.preventDefault();
});

document.querySelector('.notes-form').addEventListener('click', (e) => {

    //  Delete notes
    Store.clearFields();
    Store.deleteNotes(e.target);
    Store.removeNotesStorage(e.target);
    //Show message
    // Store.showAlert('✔ Book removed successfully', 'success');
    // Store.displayCat();
    // setTimeout(() => {
    //     location.reload();
    // }, 200);
    e.preventDefault();


});

document.querySelector('.clear-notes').addEventListener('click', function (e) {
    const card = document.querySelector('.notes-form');
    if (confirm("Are you sure do you want to clear all notes? This can't be undo.")) {
        while (card.firstChild) {
            card.removeChild(card.firstChild);
            Store.clearNotesLS();
            Store.clearFields();
        }
    }

});



// document.querySelector('.switch').addEventListener('click', () => {



//     // if (light === light) {


//     //     const linkd = document.createElement('link');
//     //     linkd.href = 'css/darkmode.css';
//     //     linkd.rel = 'stylesheet';
//     //     linkd.id = 'dark';
//     //     const dddm = document.getElementsByTagName('head')[0].appendChild(linkd);
//     //     console.log(dddm);


//     // } else if (dark === dark) {
//     //     dark.remove();
//     //     const link = document.createElement('link');
//     //     link.href = 'css/style.css';
//     //     link.rel = 'stylesheet';
//     //     link.id = 'light';
//     //     const ddd = document.getElementsByTagName('head')[0].appendChild(link);
//     //     console.log(ddd);

//     // }


// });