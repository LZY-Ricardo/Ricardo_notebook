import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { ArrowLeft } from '@react-vant/icons';
import { useNavigate, useSearchParams } from 'react-router';
import axios from '@/api';
import { createFromIconfontCN } from '@react-vant/icons'
import { toast } from 'react-hot-toast';

const IconFont = createFromIconfontCN(
  'https://at.alicdn.com/t/c/font_4985740_pqnpstaisc.js'
)

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

  const onLike = async () => {
    if (noteDetail?.love === 0) {
      await axios.post('/likeNote', {
        id: noteDetail?.id
      })
      toast.success('收藏成功')
      setNoteDetail({
        ...noteDetail,
        love: 1
      })
    } else {
      await axios.post('/unlikeNote', {
        id: noteDetail?.id
      })
      toast.success('取消收藏')
      setNoteDetail({
        ...noteDetail,
        love: 0
      })
    }
  }

  return (
    <div className={styles['note-detail']}>
      <div className={styles['back']} onClick={() => navigate(-1)}>
        <ArrowLeft fontSize={24} />
      </div>
      <div
        className={noteDetail?.love === 0 ? styles['not-collect'] : styles['collect']}
        onClick={onLike}
      >
        <IconFont name='icon-a-shoucang-yishoucang' />
      </div>

      <div className={styles['note-img']}>
        {noteDetail?.note_img ? <img src={noteDetail.note_img} alt="" /> : null}
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