let divUsersBoard = document.querySelector( '.users-msg' );
let divScreenChat = document.querySelector( '.screen-chat' );
let btnAddUser = document.querySelector( '.add-user' );
let inputsForm = document.querySelectorAll( '.form > form > input' );
let btnSub = document.querySelector( '#btn-sub' );
let userNamePopUp = document.querySelector( '#my-user' );
let infoPopUpMsg = document.querySelector( '#own-msg' );
let myPopUp = document.querySelector( '.pop-up' );
let myList = document.querySelector( 'ul.list-users' ); 
let users = getLocalStorage() || [];
let myForm = document.forms[0];
//  Start Function Responsive
// localStorage.clear();
function myAnimation () {
    let myLis = document.querySelectorAll( 'ul.list-users > li' );
    let btnGoToBack = document.querySelector( '.go-back' );
    myLis.forEach((li) => {
        li.addEventListener('click', _ => {
            divUsersBoard.classList.add( 'transform-left' );
            divScreenChat.classList.add( 'transform-right' );
        })
    } );
    btnGoToBack.addEventListener('click', _ => {
        divUsersBoard.classList.remove( 'transform-left' );
        divScreenChat.classList.remove('transform-right')
    } );
}
myAnimation();
//  End Function Responsive
btnAddUser.addEventListener('click', _ => {
    btnAddUser.classList.toggle( 'fa-times' );
    btnAddUser.classList.toggle('fa-user-plus')
    myPopUp.classList.add( 'show-pop-up' );
    inputsForm.forEach((input) => input.value = '');
});
// For Validition Form ===> 3lshan my3mlsh add le emtpy li 
validitionForm();
function validitionForm() {
    myForm.addEventListener('submit', (e) => {
        if (userNamePopUp.value === '' && infoPopUpMsg.value === '') {
            e.preventDefault();
        } else {
            // hena fayda 3lshan my3mlsh reload b3d ama ados submit
            e.preventDefault();
            // Hena Mohema Awi Awi 3lshan my3mlsh kza element w mkan hena mohem
            myList.innerHTML = '';
            myPopUp.classList.remove( 'show-pop-up' );
            addElements();
            console.log( foundName );
        }
    })
}
// Close Form 
closeForm();
function closeForm() {
    let closeForm = document.querySelector( 'i.close-form' );
        closeForm.addEventListener('click', _ => {
            myPopUp.classList.remove( 'show-pop-up' );
        });
    // let myOverlay = document.querySelector( '.pop-up > .overlay' );
    //     myOverlay.addEventListener('click', _ => {
    //         myPopUp.classList.remove( 'show-pop-up' );
    //     });
}

// Notes ==> CallBack addElements Inside function validitionForm()
function addElements() {
    let today = new Date();
    let myHours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
    let myMins = today.getMinutes() < 10 ? `0${ today.getMinutes() }` : today.getMinutes();
    let myObj = {
        id: Math.floor(Math.random() * 1000000),
        name: userNamePopUp.value,
        info: infoPopUpMsg.value,
        hours: myHours,
        min: myMins,
        messages: [],
    };
        users.unshift( myObj );
        setLocalStorage(users);
        displayContent();
}

scrollMsgBottom();
function scrollMsgBottom() {
    let myInfoMsg = document.querySelector( '.new-msg' );
    myInfoMsg.addEventListener('click', _ => {
        myInfoMsg.scrollTo( {
            top: myInfoMsg.scrollHeight,
        });
    });
}

function setLocalStorage(item) {
    localStorage.setItem( 'messages', JSON.stringify(item));
}

function getLocalStorage() {
   return JSON.parse(localStorage.getItem( 'messages' ));
}
let foundName = '';
function displayContent() {
    users.forEach((user) => {
        let li = document.createElement( 'li' );
        li.setAttribute( 'data-id', user.id );
        li.className = 'new-li';
        li.innerHTML = `
        <img src="Images/One.jpg" alt="user">
        <div class="list-info-users">
            <h4 class="username">${user.name}</h4>
            <span class="user-message">${user.info}</span>
        </div>
        <div class="date">
        <span class='my-date'>${user.hours}:${user.min}</span>
        <span>pm</span>
        </div>
        `;
        myList.appendChild( li );
        let lis = document.querySelectorAll( 'li' );
        lis.forEach((li) => {
            li.addEventListener('click', (e) => {
                let currentLi = Number(e.target.closest( '.new-li' ).dataset.id);
                foundName = users.find( ( el ) => el.id === currentLi );
                // console.log(foundName)
                document.querySelector( '.title-user' ).textContent = foundName.name;
            })
        })
        // Event hena 3la new li created with js not old li created by html
        li.addEventListener( 'click', myAnimation() );
    } );
}
displayContent();

document.querySelector( '#chating' ).addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        foundName.messages.push( e.target.value );
        e.target.value = '';
        sendMessages( foundName.messages );
    }
})

function sendMessages(messages) {
    let screenChat = document.querySelector( '.info-msg' );
    screenChat.innerHTML = '';
    messages.forEach((mes) => {
        let myP = document.createElement( 'p' );
        myP.textContent = mes;
        myP.className = 'msg-right';
        screenChat.appendChild( myP );
        console.log( foundName);
    });
}