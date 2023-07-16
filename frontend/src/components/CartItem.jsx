import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import "../Styles/CartItem.scss"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart, deleteCartItem, updateCart } from '../utils/utils';
import { useLocation } from 'react-router-dom';
import "../Styles/Cart.scss"
import { Button, notification, Space } from 'antd';
import { Select } from 'antd';

const CartItem = (props) => {
    const product = props.state.product;
    const baseImgUrl = `http://localhost:5000/images/`
    const image = baseImgUrl + `${product.images[0]}`
    const [quan, setQuan] = useState(props.state.quantity);
    const [onLoad, setLoad] = useState(false);
    const location = useLocation().pathname;

    let nq = quan;
    ////////////////////notification
    const [api, contextHolder] = notification.useNotification();
    let msg = useState("");
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: msg,
        });
    };
    //////////////////////////


    const handleAdd = async() => {
        if (quan < 10) {
            nq = quan+1
            setQuan(nq);
        }
    }

    const handleSub = async() => {
        if (quan > 1) {
            nq = quan - 1
            setQuan(nq);
        }
    }

//////////////////// delete
    const handleDelete = async () => {
        try {
            const del = await deleteCartItem(props.state.id);

            msg = "Item Deleted!"
            openNotificationWithIcon('success')

            props.st.setClick(prev => {
                return !prev;
            })

        } catch (error) {
            console.log(error);
        }
    }
//////////////////////////

    useEffect(() => {
        if (onLoad) {
            const setData = setTimeout(async () => {
                try {
                    const updated = await updateCart(props.state._id, { quantity: quan });
                } catch (error) {
                    console.log(error);
                }
            },500)

            return () => clearTimeout(setData)
        }

        setLoad(true);
    }, [quan])
 



    return (
        <>
            <div className="cartItem">
                {contextHolder}
                <div className="left">
                    <img src={image} alt="" />
                </div>
                <div className="right">
                    <div className="header">
                        <div className="leftInfo">
                            <h1>{product?.name}</h1>
                            <span>Price:{product?.price}</span>
                        </div>
                        {
                            location == "/cart" && <div className="delete" onClick={handleDelete}>
                                <DeleteIcon />
                            </div>
                        }
                    </div>
                    <div className="main">
                        <span>Description: {product?.description}</span>
                        {
                            location == "/orders" && <span>{props.state.orderStatus}</span>
                        }
                    </div>

                    {
                        location == "/cart" && <div className="footer">
                            <div className="add">
                                <RemoveIcon onClick={handleSub} className='icon' />
                            </div>
                            <h1>{quan}</h1>
                            <div className="add">

                                <AddIcon onClick={handleAdd} className='icon' />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CartItem