import React from 'react'
import './Item.css'

const item = (props) =>(
        <li className="SingleItem" 
                style={{textDecoration:props.item.marked?"line-through":null}}
                onClick={()=>props.clicked(props.item)}>
                {props.item.todo}
        </li>
    )


export default item