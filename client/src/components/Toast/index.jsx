import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import styles from './index.module.less'
import { Success, Fail } from '@react-vant/icons';

// 全局状态管理 - 必须使用全局变量才能跨组件通信
let currentToast = null;
let toastRoot = null;  // 存储toast容器元素
let toastContainerEl = null;  // 存储toast容器元素

const ToastComponent = () => {
  const [toast, setToast] = useState(null);

  // 通过轮询同步全局状态与组件状态
  useEffect(() => {
    const checkForUpdates = () => {
      if (currentToast !== toast) {
        setToast(currentToast);
      }
    };
    
    const interval = setInterval(checkForUpdates, 100);
    return () => clearInterval(interval);
  }, [toast]);

  // 自动关闭机制
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
        currentToast = null;
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={styles['toast']}>
      <div className={styles['toast-icon']}>
        {toast.type === 'success' ? <Success /> : <Fail />}
      </div>
      <div className={styles['toast-message']}>
        {toast.message}
      </div>
    </div>
  );
};

// 初始化函数 - 修复重复createRoot错误
const initializeToast = () => {
  if (typeof document !== 'undefined') {
    toastContainerEl = document.getElementById('toast-container');
    
    if (!toastContainerEl) {
      toastContainerEl = document.createElement('div');
      toastContainerEl.id = 'toast-container';
      document.body.appendChild(toastContainerEl);
    }
    
    // 关键修复：从DOM元素上复用已存在的root实例
    // 解决热重载时模块变量重置导致的重复创建问题
    if (toastContainerEl.__reactToastRoot) {
      toastRoot = toastContainerEl.__reactToastRoot;
    } else {
      toastRoot = createRoot(toastContainerEl);
      // 将root实例存储在DOM元素上，跨模块重载保留
      toastContainerEl.__reactToastRoot = toastRoot;
      toastRoot.render(<ToastComponent />);
    }
  }
};

const showToast = (message, type = 'info') => {
  console.log(toastRoot);
  
  if (!toastRoot) initializeToast();
  currentToast = { message, type };
};

export const toast = {
  show: showToast,
  success: (message) => showToast(message, 'success'),
  fail: (message) => showToast(message, 'error')
};

if (typeof window !== 'undefined') {
  initializeToast();
}