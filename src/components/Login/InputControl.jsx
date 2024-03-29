import styles from './InputControl.module.css'
import { IconEyeOff, IconEye } from '@tabler/icons-react'

function InputControl(props) {

  if(props.label === "Password") {
    return (
      <div className={styles.container}>
          {props.label && <label> 
            {props.label} 
            <span 
              style={{margin: "5px"}}
              onClick={props.handleEyeToggle}
            >
              {props.EyeOff ? <IconEyeOff style={{position: 'absolute'}} size={18}/> : <IconEye style={{position: 'absolute'}} size={18} />}
            </span> 
          </label>}
          <input maxLength={20} {...props} />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        {props.label && <label> {props.label} </label>}
        <input maxLength={20} {...props} />
      </div>
    )
  }
}

export default InputControl