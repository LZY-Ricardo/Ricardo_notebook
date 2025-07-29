import { useEffect, useState } from 'react'
import styles from './index.module.less'

let timer = null

// 下拉刷新
export default function Pull({ children, onLoad, finished, setFinished }) {   // 插槽
    const [startY, setStartY] = useState(0)
    const [moveY, setMoveY] = useState(0)
    const [distance, setDistance] = useState(0)
    const [translateY, setTranslateY] = useState(0)
    const max = 250
    const middle = 100
    const [current, setCurrent] = useState('下拉刷新...')

    const onTouchStart = (e) => {
        // console.log(e.touches[0].clientY)  // 触摸开始的Y轴坐标
        const start_y = e.touches[0].clientY
        setStartY(start_y)
    }
    const onTouchMove = (e) => {
        // console.log(e.touches[0].clientY)  // 触摸移动到的Y轴坐标

        const move_y = e.touches[0].clientY
        if (move_y < startY) {
            return
        }
        setMoveY(move_y)
        setDistance(move_y - startY)

        if (distance >= middle) {
            setCurrent('释放刷新...')
        }

        if (distance > max) {
            return
        }
        setTranslateY(distance ** 0.8)
    }
    const onTouchEnd = (e) => {
        // console.log(e)  // 触摸结束的Y轴坐标
        if (distance >= middle) {
            setCurrent('加载中...')
            timer = setInterval(() => {
                setTranslateY((prev) => prev - 5)
            }, 20)
            onLoad()
            setDistance(0)
        }
    }

    useEffect(() => {
        if (translateY <= 40) {
            // console.log('定时器消失');
            clearInterval(timer)
        }
    }, [translateY])

    useEffect(() => {
        if (finished) {
            setTranslateY(0)
            setFinished(false)
        }
    }, [finished])

    return (
        <div
            className={styles['pull-wrapper']}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ transform: `translateY(${translateY}px)` }}
        >
            <div className={styles['pull-header']}>
                <p className={styles['pull-header-title']}>{current}</p>
            </div>


            {children}
        </div>
    )
}