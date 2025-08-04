import Editor from '@/components/Editor'
import { Cell, Input, hooks, Uploader, ActionSheet, Button, NavBar } from 'react-vant'
import { Arrow, ArrowLeft } from '@react-vant/icons';
import styles from './index.module.less'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import  toast  from 'react-hot-toast'
import axios from '@/api'

const actions = [
  { name: '美食'},
  { name: '旅行'},
  { name: '恋爱'},
  { name: '学习'},
  { name: '游戏'},
  { name: '工作'},
]

export default function NotePublic() {
  const [state, updateState] = hooks.useSetState({ // 标题
    title: '',
  })
  const navigate = useNavigate()
  const [html, setHtml] = useState('') // 编辑器内容
  const [noteImg, setNoteImg] = useState('') // 图片
  const [visible, setVisible] = useState(false)
  const [category, setCategory] = useState('美食') // 类别

  const onPublish = () => {
    // console.log(html);
    // console.log(noteImg);
    
    if (html.length <= 11) {
      toast.error('请输入内容')
      return
    }
    if (!state.title) {
      toast.error('请输入标题')
      return
    }
    axios.post(`/note-publish`, {
      note_title: state.title,
      note_content: html,
      note_type: category,
      note_img: noteImg,
    }).then(res => {
      console.log(res);
    })
    setTimeout(() => {
      navigate(-1)
    }, 1000);
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
              uploadText='上传图片'
              accept='*'
              onChange={v => setNoteImg(v[0].url)}
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

      <div className={styles['btn']} onClick={onPublish}>
        <Cell>
          <Button type='primary' block>上传日记</Button>
        </Cell>
      </div>
    </div>
  )
}