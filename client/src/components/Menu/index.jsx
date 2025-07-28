import { Revoke } from '@react-vant/icons'
import styles from './index.module.less'
import logo from '@/assets/logo.png'
import { FriendsO, BarChartO, createFromIconfontCN } from '@react-vant/icons'

const IconFont = createFromIconfontCN('https://at.alicdn.com/t/c/font_4985740_tctlk4zgd6.js')

export default function Menu({ setShowMenu }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return (
        <div className={styles['menu-wrapper']}>
            <div className={styles['menu-back']} onClick={() => setShowMenu(false)} >
                <Revoke />
            </div>

            <section className={styles['menu-content']}>
                <div className={styles['menu-avatar']}>
                    <img src={logo} alt="" />
                </div>
                <p className={styles['menu-avatar-name']}>
                    你好，<span>{userInfo?.username}</span>
                </p>
                <ul className={styles['menu-list']}>
                    <li className={styles['menu-list-item']}>
                        <FriendsO />
                        <span>个人中心</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <BarChartO />
                        <span>日记统计</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <IconFont name='icon-yejianmoshi1' />
                        <span>夜间模式</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <IconFont name='icon-tuichudenglu' />
                        <span>退出登录</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}