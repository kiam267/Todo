let Todo = document.querySelector('.todo__input'),
      Send = document.querySelector('.todo__submit'),
      ShowData = document.querySelector('.todo__show');

      function createNewElements(TextValu,id,date) {
      var Elemts = document.createElement("li");
   
      // create Elemts
      Elemts.id = id ;      

      Elemts.innerHTML = `
      <p class="text">${TextValu} </p>
      <p class="date">${date}</p>
      <button class="delete">Delete</button>
      `; 
      ShowData.appendChild(Elemts);
         
      let deleteTodo = Elemts.querySelector('.delete'); 
      
      deleteTodo.addEventListener('click',ClickDeleteAPP);
    
}


function connectWithlocalStorage() {
      let storage = localStorage.getItem("myTodo") ? JSON.parse(localStorage.getItem("myTodo")) : [];
      return storage;
}

function addTodoWithLocalStroage(id,value,date) {
      let local = connectWithlocalStorage();
      local.push({ id, value,date });
      localStorage.setItem("myTodo", JSON.stringify(local));
}

Send.addEventListener("click", function () {
      let id = Date.now();
      const date = new Date();
      let pussdate = `${date.getSeconds()} -${date.getDate()}- ${date.getMonth() + 1}- ${date.getFullYear()}`
      createNewElements(Todo.value, id, pussdate);
      addTodoWithLocalStroage(id, Todo.value, pussdate);
});


const ClickDeleteAPP = (events) => {
      const domDelete = events.target.parentElement;
      ShowData.removeChild(domDelete);
      let todos = connectWithlocalStorage();
      let id = Number(domDelete.id);
      todos = todos.filter((todo) => (todo.id !== id));
      localStorage.setItem("myTodo", JSON.stringify(todos));
      



}

const addLocalTodo = () => {
      let todo = connectWithlocalStorage();
      todo.map((todo) => createNewElements(todo.value, todo.id,todo.date) )
}
window.addEventListener('DOMContentLoaded', addLocalTodo)
