import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { ArrowLeft } from '@react-vant/icons';
import { useNavigate, useSearchParams } from 'react-router';
import axios from '@/api';


export default function NoteDetail() {
  //    get /findNoteDetailById
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const navigate = useNavigate();
  const [noteDetail, setNoteDetail] = useState(null)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    axios.get(`/findNoteDetailById?id=${id}`).then(res => {
      // console.log(res);
      // console.log(userInfo);
      const author = userInfo.nickname
      let data = {
        ...res.data,
        author: author
      }
      // console.log(data);
      setNoteDetail(data) 
    })
  }, [])
  
  return (
    <div className={styles['note-detail']}>
      <div className={styles['back']} onClick={() => navigate(-1)}>
        <ArrowLeft fontSize={24} />
      </div>

      <div className={styles['note-img']}>
        <img src={noteDetail?.note_img} alt="" />
      </div>
      <div className={styles['note-content']}>
        <div className={styles['tab']}>
          <span className={styles['note_type']}>{noteDetail?.note_type}</span>
          <span className={styles['author']}>{noteDetail?.author}</span>
        </div>
        <p className={styles['title']}>{noteDetail?.note_title}</p>
        <div className={styles['content']} dangerouslySetInnerHTML={{ __html: noteDetail?.note_content }}></div>
      </div>
    </div>
  )
}