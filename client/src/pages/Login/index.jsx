import logo from '../../assets/logo.png'
import styles from './index.module.less'
import { Button, Input, Form } from 'react-vant'
import axios from '../../api'
import toast from 'react-hot-toast';
import {useNavigate, useLocation} from 'react-router'

export default function Login() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const {state} = useLocation() // 从注册页传来的参数 

  const onFinish = values => {
    axios.post('/user/login', values).then(res => {
      toast.success('登录成功')
      console.log(res);
      // 登录成功，将 token 存储在 localStorage 中
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('refresh_token', res.refresh_token)
      // 登录成功，将用户数据存储在 localStorage 中
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      navigate('/noteClass')
    })
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>登录</h1>

      <div className={styles['login-wrapper']}>
        <div className={styles.avatar}>
          <img className={styles['avatar-img']} src={logo} alt="" />
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                登录
              </Button>
            </div>
          }
        >
          <Form.Item
            rules={[{ required: true, message: '请填写用户名' }]}
            name='username'
            label='用户名'
            labelWidth={50}
            initialValue={state?.username}
          >
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: '请填写密码' }]}
            name='password'
            label='密码'
            labelWidth={50}
            initialValue={state?.password}
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
        </Form>
      </div>

      <p className={styles['login-tip']} onClick={() => navigate('/register')}>没有账号？点这里注册</p>

    </div>
  )
}
