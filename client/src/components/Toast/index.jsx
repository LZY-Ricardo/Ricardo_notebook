import { useEffect } from 'react';
import styles from './index.module.less'
import { Success, Cross } from '@react-vant/icons';

const toastObj = {
    showToast: true,
    msg: '成功',
    type: 'success',
    duration: 3000,
}
const newToastObj = new Proxy(toastObj, {
    set(target, prop, value) {
        target[prop] = value
        return true
    }
})

export default function Toast() {
    const { showToast, msg, type, duration } = newToastObj

    useEffect(() => {
        const timer = setTimeout(() => {
            newToastObj.showToast = false
        }, duration)
    }, [])

    return (
        showToast && (
            <div className={styles.toast}>
                <div className={styles['toast-content']}>
                    <div className={styles['toast-icon']}>
                        {type === 'success' && <Success />}
                        {type === 'fail' && <Cross />}
                    </div>
                    <div className={styles['toast-title']}>
                        {msg}
                    </div>
                </div>
            </div>
        )
    )
}
