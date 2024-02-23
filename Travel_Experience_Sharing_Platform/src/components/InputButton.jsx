import React from 'react';
 
function InputButton({
    className="",
    content,
    type='button',
    ...props

}){
 
    return (
        <button 
            className={`   ${className}`}
            type={type}
            {...props} 
           
        >
            {content}
        </button>
    )
}
export default InputButton;