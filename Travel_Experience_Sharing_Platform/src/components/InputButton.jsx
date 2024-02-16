import React from 'react';
 
function InputButton({
    className="",
    content,
    type='button',
    ...props

}){
 
    return (
        <button 
            className={`px-2 py-2 m-2 font-semibold text-center text-lg text-white  rounded-sm   ${className}`}
            type={type}
            {...props} 
           
        >
            {content}
        </button>
    )
}
export default InputButton;