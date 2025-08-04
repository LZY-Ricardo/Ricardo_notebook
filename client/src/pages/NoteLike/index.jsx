import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import axios from '@/api'
import { useNavigate } from 'react-router'
import { formateDate } from '@/utiles'
import { ArrowLeft } from '@react-vant/icons';

export default function NoteLike() {
    const navigate = useNavigate()
    const [likeNoteList, setLikeNoteList] = useState([])
    useEffect(() => {
        axios.get('/noteLike').then(res => {
            // console.log(res);
            setLikeNoteList(res.data)
        })
    }, [])
    return (
        <div className={styles['note-like-wrapper']}>
            <div className={styles['back']} onClick={() => navigate(-1)}>
                <ArrowLeft />
            </div>
            <header className={styles['note-like-header']}>
                我的收藏
            </header>
            <div className={styles['note-like-body']}>
                {
                    likeNoteList.map(item => (
                        <div className={styles['note-card']} key={item.id} onClick={() => navigate(`/noteDetail?id=${item.id}`)}>
                            <div className={styles['title']}>{item?.note_title}</div>
                            <div className={styles['type']}>{item?.note_type}</div>
                            <div className={styles['content']} dangerouslySetInnerHTML={{ __html: item?.note_content }}></div>
                            <div className={styles['time']}>{item?.create_time ? formateDate(item?.create_time) : ''}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
