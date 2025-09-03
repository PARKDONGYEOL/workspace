import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({size='100px', height='60px', ...props}) => {
  return (
    <textarea 
      className={styles.textarea}
      style={{width : size, height : height}}
      {...props}
    ></textarea>
  )
}

export default Textarea