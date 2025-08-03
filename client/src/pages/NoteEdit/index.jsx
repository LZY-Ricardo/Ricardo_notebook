import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import Editor from '@/components/Editor'
import { Cell, Input, hooks, Uploader, ActionSheet, Button, NavBar } from 'react-vant'
import { Arrow, ArrowLeft } from '@react-vant/icons';
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import axios from '@/api'
import styles from './index.module.less'

const actions = [
    { name: '美食' },
    { name: '旅行' },
    { name: '恋爱' },
    { name: '学习' },
    { name: '游戏' },
    { name: '工作' },
]

export default function NoteEdit() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [state, updateState] = useState({
        title: '',
    })
    const navigate = useNavigate()
    const [html, setHtml] = useState('') // 编辑器内容
    const [noteImg, setNoteImg] = useState('') // 图片
    const [visible, setVisible] = useState(false)
    const [category, setCategory] = useState('美食') // 类别
    const [url, setUrl] = useState('')

    // 动态构建demoData，确保url更新后能正确显示
    const demoData = url ? [{
        url,
        status: 'done',
        uid: '1'
    }] : []


    useEffect(() => {
        axios.get(`findNoteDetailById?id=${id}`).then(res => {
            // console.log(res.data);
            const imgUrl = res.data.note_img || '';
            console.log(imgUrl);
            setUrl(imgUrl)
            setHtml(res.data.note_content)
            setCategory(res.data.note_type)
            setNoteImg(imgUrl)
            updateState({
                title: res.data.note_title,
            })
        })
    }, [id])

    const onUpdate = () => {
        axios.post('/updateNote', {
            id,
            title: state.title,
            content: html,
            type: category,
            img: noteImg,
        }).then(res => {
            console.log(res);
            toast.success('更新成功')
            navigate(-1)
        })
    }

    const onSelect = (action) => {
    // console.log(action);
    setCategory(action.name)
    setVisible(false)
  }

    return (
        <div className={styles['note-public']}>
            <div className={styles['header']}>
                <NavBar
                    title='编辑日记'
                    leftText={<ArrowLeft />}
                    onClickLeft={() => { navigate(-1) }}
                />
            </div>
            <div className={styles['editor']}>
                <Editor html={html} setHtml={setHtml} />
            </div>
            <div className={styles['note-wrap']}>
                <div className={styles['note-cell']}>
                    <Cell>
                        <Input
                            prefix={'标题：'}
                            value={state.title}
                            onChange={title => updateState({ title })}
                            placeholder='请输入标题'
                            clearable
                        />
                    </Cell>
                </div>

                <div className={styles['note-cell']}>
                    <Cell>
                        <Uploader
                            key={url || 'empty'}
                            value={demoData}
                            uploadText='上传图片'
                            accept='image/*'
                            onChange={v => {
                                const newUrl = v[0]?.url || '';
                                setUrl(newUrl);
                                setNoteImg(newUrl);
                            }}
                            maxCount={1} // 限制上传一张图片
                        />
                    </Cell>
                </div>

                <div className={styles['note-cell']}>
                    <Cell>
                        <div className={styles['select']}>
                            <span>选择分类</span>
                            <span
                                className={styles['select-item']} onClick={() => setVisible(true)}>{category} <Arrow /> </span>
                        </div>
                    </Cell>

                    <ActionSheet
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        onSelect={onSelect}
                        actions={actions}
                    />
                </div>
            </div>

            <div className={styles['btn']} onClick={onUpdate}>
                <Cell>
                    <Button type='primary' block>更新日记</Button>
                </Cell>
            </div>
        </div>
    )
}
