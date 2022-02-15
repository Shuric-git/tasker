(function () {
    function createAppTitle(title) {
        let appTitle = document.createElement('H2');
        appTitle.innerHTML = title;
        return appTitle;
    };
    function createTodoItemForm() {
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

    function createTodoItemElement(todoItem, {onDone, onDelete}) {
        const doneClass = 'list-group-item-success';

        const item = document.createElement('li');
        const buttonGroup = document.createElement('div');
        const doneButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (todoItem.done) {
            item.classList.add(doneClass)
        }
        item.textContent = todoItem.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger')
        deleteButton.textContent = 'Удалить';

        doneButton.addEventListener('click', () => {
            onDone({todoItem, element: item});
            // todoArr = JSON.parse(localStorage.getItem(localKey));
            item.classList.toggle(doneClass, todoItem.done);
            
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

        deleteButton.addEventListener('click', () => {
            onDelete({todoItem, element: item});
            // restoredTodoArr = JSON.parse(localStorage.getItem(localKey));

            // let filteredTodoArr = restoredTodoArr.filter(toDelete => {
            //     if (toDelete.name != todoItemElement.name) {
            //         return true
            //     }
            // })
            // console.log(filteredTodoArr)
            // localStorage.setItem(localKey, JSON.stringify(filteredTodoArr))
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return item;
    }

    async function createTodoApp(container, title, owner) {
        const todoAppTitle = createAppTitle(title);
        const todoItemForm = createTodoItemForm();
        const todoList = createTodoList();
        const handlers = {
            onDone({ todoItem }){
                todoItem.done = !todoItem.done;
                fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({done: todoItem.done}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            },
            onDelete({todoItem, element}){
                if (!confirm('Вы уверены?')) {
                    return
                }
                element.remove()
                fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
                    method: 'DELETE',
                });
            },
        }
        // localKey = title
        // console.log(localKey)
        // let todoArr = []
        
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
        const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
        const todoItemList = await response.json();

        todoItemList.forEach(todoItem => {
            const todoItemElement = createTodoItemElement(todoItem, handlers)
            todoList.append(todoItemElement);
        });
        
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
                    owner,
                }),
                headers: { 
                    'Content-Type': 'application/json' ,
                },
            })

            const todoItem = await response.json();
            
            const todoItemElement = createTodoItemElement(todoItem, handlers);
            // storageObj.name = todoItemElement.name
            // storageObj.done = false
 
            // todoArr.push(storageObj)
 
            // localStorage.setItem(localKey, JSON.stringify(todoArr))
            
            todoList.append(todoItemElement);
            
            todoItemForm.input.value = '';
            if (!todoItemForm.input.value) {
                todoItemForm.button.classList.add('disabled')
            }
        });
    }

    window.createTodoApp = createTodoApp;
})();

