import React, { useState, useEffect } from 'react';
import { Search } from 'react-vant';
import { ArrowLeft, Delete } from '@react-vant/icons';
import styles from './index.module.less'
import axios from '@/api'
import { formateDate } from '@/utiles'
import { useNavigate } from 'react-router';


export default function SearchPage() {
    const [value, setValue] = useState('');
    const [history, setHistory] = useState([]);
    const [result, setResult] = useState([]);
    const navigate = useNavigate();
    
    // 从localStorage加载搜索历史
    useEffect(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    const onSearch = () => {
        // 去除搜索关键词前后的空格
        const trimmedValue = value.trim();
        if (!trimmedValue) return; // 不搜索空字符串
                // console.log(value);
        // React 状态更新是异步的，直接打印 history 不会包含新添加的值
        // const newHistory = [...history, trimmedValue];
        // setHistory(newHistory); // 异步
        // console.log(history);
        // console.log(newHistory); // 打印包含新值的数组
        
        // 如果搜索词已存在于历史记录中，先移除它
        let newHistory = history.filter(item => item !== trimmedValue)
        
        // 将新的搜索词添加到历史记录的开头
        newHistory = [trimmedValue, ...newHistory];
        
        // 限制历史记录最多20条
        if (newHistory.length > 20) {
            newHistory = newHistory.slice(0, 20);
        }
        // console.log(newHistory);
    
        // 更新状态并保存到localStorage
        setHistory(newHistory); // 异步
        // React 状态更新是异步的，直接打印 history 不会包含新添加的值
        // console.log(history); 
        // console.log(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        
        getData(trimmedValue)
    }


    const getData = async (title) => {
        await axios.get(`/findNoteByTitle?title=${title}`).then(res => {
            // console.log(res);
            setResult(res.data)
            // console.log(res.data);
        })
    }
    return (
        <div className={styles['searchPage']}>
            <header className={styles['header']}>
                <div className={styles['back']} onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </div>
                <div className={styles['searchBox']}>
                    <Search
                        showAction
                        shape="round"
                        value={value}
                        onChange={setValue}
                        actionText={<div onClick={onSearch}>搜索</div>}
                        placeholder="请输入要搜索的日记标题"
                    />
                </div>
            </header>
            <div className={styles['main']}>
                <div className={styles['history']}>
                    <div className={styles['title']}>
                        <div className={styles['left']}>搜索历史</div>
                        <div className={styles['right']}>
                            <Delete onClick={() => { 
                                setHistory([]);
                                localStorage.removeItem('searchHistory');
                            }} />
                        </div>
                    </div>
                    <div className={styles['content']}>
                        {history.map((item, index) => {
                            return (
                                <div className={styles['item']} key={index} onClick={() => { 
                                    setValue(item); // 更新搜索框的值
                                    getData(item);
                                }}>
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles['result']}>
                    <div className={styles['head']}>搜索结果</div>
                    <div className={styles['content']}>
                        {
                            result.map(item => {
                                return (
                                    <div className={styles['item']} key={item.id} onClick={() => { navigate(`/noteDetail?id=${item.id}`) }}>
                                        <div className={styles['title']}>{item.note_title}</div>
                                        <div className={styles['type']}>
                                            {item.note_type}
                                        </div>
                                        <div className={styles['passage']} dangerouslySetInnerHTML={{ __html: item.note_content }}></div>
                                        <div className={styles['time']}>
                                            {formateDate(item.update_time)}
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
