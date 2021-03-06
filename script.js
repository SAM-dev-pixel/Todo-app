//click mode button light and dark
const container = document.querySelector('.container');
const htmlData = document.querySelector('html');
const themeMode =(button)=> {
  button.addEventListener('click', () => {
    button.classList.toggle('mode');
    if(button.classList.contains('mode')) {
      button.src = 'img/icon-moon.svg';
      container.classList.add('light');
      htmlData.dataset.themeMode = 'light';
    } else {
      button.src = 'img/icon-sun.svg';
      container.classList.remove('light');
      htmlData.dataset.themeMode = 'dark';
    };
  });
}
themeMode(document.querySelector('.button-mode'));
  


// ADDING TEXT TO DO IN LIST
const inputText = document.querySelector('.input-text');
const todoList = document.querySelector('.todo-list');
const todoListCont = document.querySelector('.todo-list-cont');

// function list active/check
const countUnactiveList = () => {
  const list = [...todoList.children];
  
  const listArr = list.filter(child => {
    return !child.classList.contains('check');
  });
  return document.querySelector('.count').innerHTML = listArr.length;
}


//click enter button
inputText.addEventListener('keyup', (e) => {
  if(e.keyCode === 13) {
    //create element li
    if(inputText.value === '') return;
    const li = document.createElement('li');
    //adding class
    li.classList.add('list');
    //insert all of elements to list
    li.innerHTML = `<div class="button-check">
                        <img src="img/icon-check.svg" alt="" class="icon-check">
                      </div>
                      <p class="text">${inputText.value}</p>
                      <div class='div-btn'><img src="img/icon-cross.svg" alt="" class="button-delete"></div>`;
                      
    todoList.prepend(li);
    inputText.value = '';
    //count active list
    countUnactiveList();
  }
});

// button cklik
const buttonCheck = document.querySelectorAll('.button-check');
todoListCont.addEventListener('click', e => {
  //button check click
  if(e.target.classList.contains('button-check') || e.target.classList.contains('text')) {
    e.target.parentElement.classList.toggle('check');
    //count active list
    countUnactiveList();
  } else if(e.target.classList.contains('div-btn')) {
    //button delete click
    e.target.parentElement.remove();
    //count active list
    countUnactiveList();
  }
});
//button clear click
const buttonClear = document.querySelector('.button-clear');
function deleteList(button) {
    button.addEventListener('click', () => {
    let list = buttonClear.parentElement.previousElementSibling.children;
    for(let i = list.length - 1; i >= 0; i--) {
    if(list[i].classList.contains('check')) {
     list[i].remove();
    };
  }
  //count active list
  countUnactiveList();
});
}
deleteList(buttonClear);



// FILTER
const filter = document.querySelector('.filter');
const filterButtons = document.querySelectorAll('.filter-btn')
filter.addEventListener('click', e => {
  if(e.target.classList.contains('button-all')) {
    //button all click
    let list = e.target.parentElement.previousElementSibling.children[0].children;
    for (let i = 0; i < list.length; i++) {
      if (list[i].classList.contains('check') === false || list[i].classList.contains('check') === true) {
        list[i].style.display = 'flex';
      }
    }
  } else if(e.target.classList.contains('button-active')) {
    //button active click
    //catch list completed
    let list = e.target.parentElement.previousElementSibling.children[0].children;
    for (let i = 0; i < list.length; i++) {
      if (list[i].classList.contains('check')) {
        list[i].style.display = 'none';
      } else {
        list[i].style.display = 'flex';
      };
    }
  } else if(e.target.classList.contains('button-completed')) {
    //button completed click
    let list = e.target.parentElement.previousElementSibling.children[0].children;
    for (let i = 0; i < list.length; i++) {
      if (list[i].classList.contains('check') === false) {
        list[i].style.display = 'none';
      } else {
        list[i].style.display = 'flex'
      };
    }
  }
  //filter button active
  filterButtons.forEach(btn => {
    if(btn.classList.contains('active')) {
      btn.classList.remove('active');
    }
  });
  if(e.target.classList.contains('filter-btn')) {
    e.target.classList.add('active');
  }
  
});


//drag and drop list items
Sortable.create(todoList, {ghostClass: "sortable-ghost", animation: 150, delay: 300});
