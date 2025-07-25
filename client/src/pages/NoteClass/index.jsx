import { useEffect } from 'react'
import axios from '../../api/index.js'
import styles from './index.module.less'

export default function NoteClass() {

  useEffect(() => {
    axios.get('/user/test').then(res => {
      console.log(res.data);
    })
  }, [])

  return (
    <div className={styles['note-class']}>
      <div className={styles['note-class-header']}>
        <h1>笔记分类</h1>
      </div>
    </div>
  )
}
