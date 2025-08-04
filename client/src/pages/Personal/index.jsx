import React from 'react'
import styles from './index.module.less'
import { Button, Input, Form, NavBar, Dialog } from 'react-vant'
import { useNavigate } from 'react-router';
import axios from '@/api'
import { toast } from 'react-hot-toast';

export default function Personal() {
    const navigate = useNavigate();
    const [form] = Form.useForm()

    const onFinish = values => {
        // console.log('提交的参数:', values);
        axios.post('/user/update', values).then(res => {
            toast.success('修改成功')
            // 修改成功，将 token 存储在 localStorage 中
            localStorage.setItem('access_token', res.access_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            // 修改成功，将用户数据存储在 localStorage 中
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            setTimeout(() => {
                navigate('/noteClass')
            }, 1000)
        })
    }

    return (
        <div className={styles['personal']}>
            <header className={styles['header']}>
                <NavBar
                    title="个人中心"
                    leftText="返回"
                    onClickLeft={() => navigate(-1)}
                />
            </header>
            <div className={styles['form-container']}>
                <Form
                    form={form}
                    onFinish={async () => {
                        await Dialog.confirm({
                            title: '确认修改',
                            message: '确认修改个人信息',
                            onCancel: () => console.log('cancel'),
                            onConfirm: () => {
                                onFinish(form.getFieldsValue())
                            },
                          })    
                    }}
                    footer={
                        <div style={{ margin: '16px 16px 0' }}>
                            <Button round nativeType='submit' type='primary' block>
                                提交修改
                            </Button>
                        </div>
                    }
                >
                    <Form.Item
                        rules={[{ required: true, message: '请填写修改后的昵称' }]}
                        name='nickname'
                        label='昵称'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入修改后的昵称' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写修改后的用户名' }]}
                        name='username'
                        label='用户名'
                        labelWidth={50}
                    // initialValue={state?.username}
                    >
                        <Input placeholder='请输入修改后的用户名' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写修改后的密码' }]}
                        name='password'
                        label='密码'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入修改后的密码' />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
