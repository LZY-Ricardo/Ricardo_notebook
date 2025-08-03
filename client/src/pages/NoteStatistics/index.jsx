import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Empty, Loading } from 'react-vant';
import { Pie, Column } from '@antv/g2plot';
import styles from './index.module.less';
import axios from '@/api';

export default function NoteStatistics() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState({
        totalNotes: 0,
        typeDistribution: [],
        monthlyNotes: [],
        likedNotes: 0
    });

    // 获取统计数据
    const getStatisticsData = async () => {
        setLoading(true);
        try {
            // 获取所有笔记
            const allNotesRes = await axios.get('/findAllNotes');
            const allNotes = allNotesRes.data || [];
            
            // 获取收藏的笔记
            const likedNotesRes = await axios.get('/noteLike');
            const likedNotes = likedNotesRes.data || [];
            
            // 计算统计数据
            const typeMap = {};
            const monthMap = {};
            
            allNotes.forEach(note => {
                // 按类型统计
                if (!typeMap[note.note_type]) {
                    typeMap[note.note_type] = 0;
                }
                typeMap[note.note_type]++;
                
                // 按月份统计
                const date = new Date(parseInt(note.create_time));
                // console.log(note.create_time);
                // console.log(parseInt(note.create_time));
                // console.log(date);
                
                const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
                if (!monthMap[monthKey]) {
                    monthMap[monthKey] = 0;
                }
                monthMap[monthKey]++;
            });
            
            // 转换为数组格式
            const typeDistribution = Object.keys(typeMap).map(type => ({
                type,
                value: typeMap[type]
            }));

            // console.log(typeDistribution);
            
            // 获取最近6个月的数据
            const now = new Date();
            const monthlyNotes = [];
            for (let i = 5; i >= 0; i--) {
                const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
                // console.log(month);
                const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
                // console.log(monthKey);
                monthlyNotes.push({
                    month: monthKey,
                    count: monthMap[monthKey] || 0
                });
            }
            
            setStatistics({
                totalNotes: allNotes.length,
                typeDistribution,
                monthlyNotes,
                likedNotes: likedNotes.length
            });
        } catch (error) {
            console.error('获取统计数据失败', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getStatisticsData();
    }, []);
    
    // 渲染饼图 - 用于展示不同类型笔记的分布情况
    useEffect(() => {
        // 只有当数据加载完成且有类型分布数据时才渲染图表
        if (!loading && statistics.typeDistribution.length > 0) {
            // 创建饼图实例
            // 第一个参数是DOM元素ID，第二个参数是配置对象
            const pieChart = new Pie('type-distribution', {
                // 设置图表数据源
                data: statistics.typeDistribution,
                // 指定用于计算扇区角度的数据字段
                angleField: 'value',
                // 指定用于区分不同扇区颜色的数据字段
                colorField: 'type',
                // 设置饼图的外半径，相对于画布大小的比例
                radius: 0.7,
                // innerRadius: 0.2, // 设置内半径可以形成环形图效果
                // 配置扇区标签
                label: {
                    // 标签位于扇区外部
                    type: 'outer',
                    // 标签内容格式，显示名称和百分比
                    content: '{name}: {percentage}',
                    // 标签样式设置
                    style: {
                        fontSize: 12,
                        textAlign: 'center',
                    },
                    // 标签自动旋转以适应扇区角度
                    autoRotate: true,
                },
                // 配置图例
                legend: {
                    // 图例位置在图表底部
                    position: 'bottom',
                    // 图例项名称样式
                    itemName: {
                        style: {
                            fontSize: 12,
                        },
                    },
                },
                // 图表自动适应容器大小，实现响应式布局
                autoFit: true,
                // 图表的内边距，分别是上、右、下、左
                padding: [10, 10, 30, 10],
            });
            
            // 渲染图表到指定的DOM元素
            pieChart.render();
            
            // 返回清理函数，在组件卸载或依赖项变化时执行
            return () => {
                // 销毁图表实例，释放资源，防止内存泄漏
                pieChart.destroy();
            };
        }
    }, [loading, statistics.typeDistribution]); // 依赖项：加载状态和类型分布数据
    
    // 渲染柱状图 - 用于展示最近6个月的笔记数量变化
    useEffect(() => {
        // 只有当数据加载完成且有月度笔记数据时才渲染图表
        if (!loading && statistics.monthlyNotes.length > 0) {
            // 创建柱状图实例
            // 第一个参数是DOM元素ID，第二个参数是配置对象
            const columnChart = new Column('monthly-notes', {
                // 设置图表数据源
                data: statistics.monthlyNotes,
                // 指定X轴使用的数据字段（月份）
                xField: 'month',
                // 指定Y轴使用的数据字段（笔记数量）
                yField: 'count',
                // 配置柱子顶部的数值标签
                label: {
                    // 标签位于柱子顶部
                    position: 'top',
                    // 标签样式设置
                    style: {
                        // 标签文字颜色为蓝色
                        fill: '#1989fa',
                        // 字体大小
                        fontSize: 12,
                        // 字体加粗，使数值更醒目
                        fontWeight: 'bold',
                    },
                },
                // 配置X轴
                xAxis: {
                    // X轴标签配置
                    label: {
                        // 标签自动旋转以避免重叠
                        autoRotate: true,
                        // 在空间不足时自动隐藏部分标签
                        autoHide: true,
                        // 文本过长时显示省略号
                        autoEllipsis: true,
                        // 标签样式
                        style: {
                            // 字体较小，适合移动端显示
                            fontSize: 10,
                        },
                    },
                },
                // 柱子宽度占可用宽度的比例
                columnWidthRatio: 0.5,
                // 柱子样式配置
                columnStyle: {
                    // 柱子顶部圆角，底部直角 [左上, 右上, 右下, 左下]
                    radius: [4, 4, 0, 0],
                },
                // 图表自动适应容器大小，实现响应式布局
                autoFit: true,
                // 图表的内边距，分别是上、右、下、左
                padding: [30, 10, 30, 30],
                // 配置数据字段的元信息
                meta: {
                    // 月份字段的显示别名
                    month: {
                        alias: '月份',
                    },
                    // 数量字段的显示别名
                    count: {
                        alias: '笔记数量',
                    },
                },
            });
            
            // 渲染图表到指定的DOM元素
            columnChart.render();
            
            // 返回清理函数，在组件卸载或依赖项变化时执行
            return () => {
                // 销毁图表实例，释放资源，防止内存泄漏
                columnChart.destroy();
            };
        }
    }, [loading, statistics.monthlyNotes]); // 依赖项：加载状态和月度笔记数据

    return (
        <div className={styles['statistics-container']}>
            <header className={styles['header']}>
                <NavBar
                    title="日记统计"
                    leftText="返回"
                    onClickLeft={() => navigate(-1)}
                />
            </header>
            
            {loading ? (
                <div className={styles['loading-container']}>
                    <Loading type="spinner" color="#1989fa" />
                    <span>加载中...</span>
                </div>
            ) : (
                <div className={styles['statistics-content']}>
                    <div className={styles['statistics-cards']}>
                        <div className={styles['stat-card']}>
                            <h3>总笔记数</h3>
                            <p className={styles['stat-number']}>{statistics.totalNotes}</p>
                        </div>
                        <div className={styles['stat-card']}>
                            <h3>收藏笔记</h3>
                            <p className={styles['stat-number']}>{statistics.likedNotes}</p>
                        </div>
                    </div>
                    
                    <div className={styles['chart-container']}>
                        <h3>笔记类型分布</h3>
                        {statistics.typeDistribution.length > 0 ? (
                            <div id="type-distribution" className={styles['chart']}></div>
                        ) : (
                            <Empty description="暂无数据" />
                        )}
                    </div>
                    
                    <div className={styles['chart-container']}>
                        <h3>最近6个月笔记数量</h3>
                        {statistics.monthlyNotes.some(item => item.count > 0) ? (
                            <div id="monthly-notes" className={styles['chart']}></div>
                        ) : (
                            <Empty description="暂无数据" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}