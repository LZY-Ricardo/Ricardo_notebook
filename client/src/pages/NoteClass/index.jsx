import { useState, useEffect } from 'react'
import axios from '../../api/index.js'
import styles from './index.module.less'
import { WapNav, Edit, LikeO, Search } from '@react-vant/icons'
import Menu from '@/components/Menu'
import { useNavigate } from 'react-router'

// 生成美观的颜色 - 使用HSL色彩空间
const randomColor = () => {
  // 使用固定的色相范围，生成协调的颜色
  const hues = [210, 240, 270, 300, 330, 30, 60, 90, 120, 150, 180] // 蓝色到紫色到红色到绿色
  const hue = hues[Math.floor(Math.random() * hues.length)]
  const saturation = 70 + Math.floor(Math.random() * 20) // 70-90%饱和度
  const lightness = 85 + Math.floor(Math.random() * 10) // 85-95%亮度，较亮的颜色
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const noteClassList = [
  { title: '美食', id: 1 },
  { title: '旅行', id: 2 },
  { title: '恋爱', id: 3 },
  { title: '学习', id: 4 },
  { title: '游戏', id: 5 },
  { title: '工作', id: 6 },
]

export default function NoteClass() {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  // useEffect(() => {
  //   axios.get('/user/test').then(res => {
  //     console.log(res.data);
  //   })
  // }, [])

  const goNoteList = (title) => {
    navigate(`/noteList?category=${title}`)
  }

  return (
    <div className={styles['note-class-wrapper']}>
      <div className={[`${styles['note-class']}`, `${showMenu ? styles['hide'] : ''}`].join(' ')}>
        <header>
          <div onClick={() => setShowMenu(true)}>
            <WapNav className={styles['icon']} />
          </div>
          <div>
            <Edit className={styles['icon']} />
            <LikeO className={styles['icon']} />
            <Search className={styles['icon']} />
          </div>
        </header>
        <section>
          {
            noteClassList.map(item => (
              <div
                key={item.id}
                className={styles['note-class-item']} 
                style={{ backgroundColor: randomColor() }}
                onClick={() => goNoteList(item.title)}
              >
                <span className={styles['note-class-item-title']}>{item.title}</span>
              </div>
            ))
          }
        </section>
      </div>

      <div className={[`${styles['menu']}`, `${showMenu ? styles['show'] : ''}`].join(' ')}>
        <Menu setShowMenu={setShowMenu} />
      </div>
    </div>
  )
}
