(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('H2');
        appTitle.innerHTML = title;
        return appTitle;
    };
    function createTodoForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Ведите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary',);
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        if (!input.value) {
            button.classList.add('disabled')
        }

        input.oninput = function () {
            if (!input.value) {
                button.classList.add('disabled')
            } else {
                button.classList.remove('disabled')
            }
        }

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list  = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(name) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton, 
            deleteButton,
            name
        }
    }

    function createTodoApp(container, title = 'Список дел') {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoForm();
        let todoList = createTodoList();
        localKey = title
        // console.log(localKey)
        let todoArr = []
        
        container.append(todoAppTitle)
        container.append(todoItemForm.form)
        container.append(todoList)
        

        // restoredTodoArr.forEach(function(restoredObj){
        //     let restoredTodoItem = createTodoItem(restoredObj.name)
        //     if (restoredObj.done) {
        //         restoredTodoItem.item.classList.add('list-group-item-success');
        //     }
        //     restoredTodoItem.doneButton.addEventListener('click', function() {
        //         restoredTodoArr = JSON.parse(localStorage.getItem(localKey));
        //         restoredTodoItem.item.classList.toggle('list-group-item-success');
                
        //         let mappedArr = restoredTodoArr.map(obj => {
        //             let classArr = restoredTodoItem.item.classList.value.split(' ')
        //             if (classArr.includes('list-group-item-success') && obj.name == restoredTodoItem.name) 
        //             {
        //                 obj.done = true  
        //             } else if (obj.name == restoredTodoItem.name) {
        //                 obj.done = false
        //             }
        //             return obj
        //         })
                // localStorage.setItem(localKey, JSON.stringify(mappedArr))
                // let mappedArr = restoredTodoArr.map(obj => {

                //     let classArr = restoredTodoItem.item.classList.value.split(' ')
                //     if (classArr.includes('list-group-item-success' && obj.name == restoredTodoItem.name))
                //     {
                //         obj.done = true
                //     } else {
                //         obj.done = false
                //     }
                //     console.log(obj.name)
                //     return obj
                // })
                // localStorage.setItem(localKey, JSON.stringify(mappedArr))
            // });

            // restoredTodoItem.deleteButton.addEventListener('click', function() {
            //     restoredTodoArr = JSON.parse(localStorage.getItem(localKey));
            //     if (confirm('Вы уверены?')) {
            //         restoredTodoItem.item.remove();
            //     }
            //     let filteredTodoArr = restoredTodoArr.filter(toDelete => {
            //         if (toDelete.name != restoredTodoItem.name) {
            //             return true
            //         }
            //     })
            //     // console.log(filteredTodoArr)
            //     // localStorage.setItem(localKey, JSON.stringify(filteredTodoArr))
            // });
            // todoList.append(restoredTodoItem.item);
        // })

        
        todoItemForm.form.addEventListener('submit', async e => {
            e.preventDefault();
            // todoArr = JSON.parse(localStorage.getItem(localKey)) || [];
            // let storageObj = {}
            
            if (!todoItemForm.input.value) {
                return;
            }

            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                body: JSON.stringify({
                    name: todoItemForm.input.value.trim(),
                    owner: 'Тимофей',
                }),
                headers: { 
                    'Content-Type': 'application/json' ,
                },
            })

            const todoItem = await response.json();
            
            const todoItemElement = createTodoItem(todoItem.name);
            // storageObj.name = todoItemElement.name
            // storageObj.done = false
 
            // todoArr.push(storageObj)
 
            // localStorage.setItem(localKey, JSON.stringify(todoArr))
            
            todoItemElement.doneButton.addEventListener('click', function() {
                // todoArr = JSON.parse(localStorage.getItem(localKey));
                todoItemElement.item.classList.toggle('list-group-item-success');
                
            //     let mappedArr = todoArr.map(obj => {
            //         let classArr = todoItemElement.item.classList.value.split(' ')
            //         if (classArr.includes('list-group-item-success') && obj.name == todoItemElement.name) 
            //         {
            //             obj.done = true  
            //         } else if (obj.name == todoItemElement.name) {
            //             obj.done = false
            //         }
            //         return obj
            //     })
            //     localStorage.setItem(localKey, JSON.stringify(mappedArr))
            });

            todoItemElement.deleteButton.addEventListener('click', function() {
                // restoredTodoArr = JSON.parse(localStorage.getItem(localKey));
                if (confirm('Вы уверены?')) {
                    todoItemElement.item.remove();
                }
                // let filteredTodoArr = restoredTodoArr.filter(toDelete => {
                //     if (toDelete.name != todoItemElement.name) {
                //         return true
                //     }
                // })
                // console.log(filteredTodoArr)
                // localStorage.setItem(localKey, JSON.stringify(filteredTodoArr))
            });
            
            todoList.append(todoItemElement.item);
            
            todoItemForm.input.value = '';
            if (!todoItemForm.input.value) {
                todoItemForm.button.classList.add('disabled')
            }
        });
    }

    window.createTodoApp = createTodoApp;
})();

