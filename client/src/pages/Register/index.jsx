import logo from '../../assets/logo.png'
import styles from './index.module.less'
import { Button, Input, Form } from 'react-vant'
import axios from '../../api'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'

export default function Login() {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async values => {
        // console.log(values);
        const res = await axios.post('/user/register', values)
        // console.log(res);
        toast.success(res.msg)
        setTimeout(() => {
            // navigate(`/login?username=${values.username}&password=${values.password}`)
            navigate('/login', {state: {username: values.username, password: values.password}})
        }, 1000);
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>注册</h1>

            <div className={styles['login-wrapper']}>
                <div className={styles.avatar}>
                    <img className={styles['avatar-img']} src={logo} alt="" />
                </div>

                <Form
                    form={form}
                    onFinish={onFinish}
                    footer={
                        <div style={{ margin: '16px 16px 0' }}>
                            <Button round nativeType='submit' type='info' block>
                                注册
                            </Button>
                        </div>
                    }
                >
                    <Form.Item
                        rules={[{ required: true, message: '请填写昵称' }]}
                        name='nickname'
                        label='昵称'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入昵称' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写用户名' }]}
                        name='username'
                        label='用户名'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写密码' }]}
                        name='password'
                        label='密码'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入密码' />
                    </Form.Item>
                </Form>
            </div>

            <p className={styles['login-tip']} onClick={() => navigate('/login')}>已经有账号？点这里登录</p>

        </div>
    )
}
