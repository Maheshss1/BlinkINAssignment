import React from 'react'
//import Item from '../../component/Item/Item'

class Todo extends React.Component{

    state = {
        todoList : JSON.parse(localStorage.getItem("todoList")) || [],
        inputValue : '',
        sorted:false
    }

    changeInput = (event) => {
        this.setState({
            inputValue:event.target.value
        })
    }

    handleForm = (e) => {
        e.preventDefault();
        const todoList = [...this.state.todoList]
        todoList.push({
            key:Date.now(),
            todo:this.state.inputValue,
            marked: false    
        })
        localStorage.setItem("todoList",JSON.stringify(todoList))
        this.setState({
            todoList:todoList,
            inputValue:''
        })
    }

    markCompleted = (todo) => {
        const newList = [...this.state.todoList];
        const list = newList.map((t)=>{
            if(todo.key===t.key){
                t.marked = true
            }
            return t;
        })
        localStorage.setItem("todoList",JSON.stringify(list))

        this.setState({
            todoList:list
        })
    }

    sortTodoList = () => {

        const sorted = this.state.sorted;
        let newList = [...this.state.todoList];
        if(sorted){
           newList = newList.sort((a,b)=>{
               if(a.todo<b.todo)
                return -1
               return 0
           })
        }else{
            newList = newList.sort((a,b)=>{
                if(a.todo>b.todo)
                return -1
                return 0
            })
        }
        localStorage.setItem("todoList",JSON.stringify(newList))

        this.setState((prevState)=>{
            return {
                sorted:!prevState.sorted,
                todoList:newList
            }
        })
    }

    render(){

        const list = this.state.todoList.map((todo)=>{
            return <li key={todo.key} style={{cursor:"pointer",listStyle:"none",textDecoration:todo.marked?"line-through":null}} 
                    onClick={()=>this.markCompleted(todo)}>
                        {todo.todo} 
                    </li>
            
        })

        console.log(this.state.todoList)

        return (
            <div>
                <form onSubmit={(e)=>this.handleForm(e)}>
                    <input type="text" value={this.state.inputValue} onChange={(e)=>{this.changeInput(e)}} />
                    <input type="submit" />
                    
                </form>
                <button onClick={this.sortTodoList}>{this.state.sorted?"Asc":"Desc"}</button>
                <ul>
                    {list}
                </ul>
            </div>

        )
    }
}

export default Todo