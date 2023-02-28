import { useState } from "react";
const Notification = ({ message }) => {
    
    const [ isAlertVisible, setIsAlertVisible ] = useState(true);

    setTimeout(() => {
        setIsAlertVisible(false);
                }, 3000);

    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        { message}
      </div>
    )
  }
  
  export default Notification