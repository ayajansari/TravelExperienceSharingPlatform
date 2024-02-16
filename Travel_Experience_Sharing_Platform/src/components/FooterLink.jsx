import React from 'react';
 
function FooterLink({
    label
}
    
){
 
    return (
     
        <div className="p-1">
            <a href="https://www.google.com" className="hover:text-[#00a6fb] hover:underline hover:underline-offset-4">{label}</a>
        </div>
       
    )
}
export default FooterLink;