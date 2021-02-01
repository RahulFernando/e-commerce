import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategories } from '../../actions/category'

const Menu = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    const renderCategories = (categories) => {
        let temp = [];
        for (let cat of categories) {
            temp.push(
                <li key={cat._id}><a href={cat.slud}>{cat.name}</a></li>
            )
        }
        return temp;
    }

    return (
        <div className="menuHeader">
            <ul>
              { category.categories.length > 0 ? renderCategories(category.categories) : null }
            </ul>
        </div>       
    )
}

export default Menu;
