import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import {useState, useContext} from "react";
import axios from "axios";
import {SIGNUP, SIGNIN, DASHBOARD,  URL_USER_SVC} from "../configs";
import { STATUS_CODE_BAD_REQUEST ,STATUS_CODE_SUCCESS} from "../constants";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../util/userContext";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import './SigninPage.css';

function SigninPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSigninSuccess, setIsSigninSuccess] = useState(false)
    // eslint-disable-next-line
    const {user,setUser} = useContext(UserContext)
    const navigate = useNavigate();
    const handleSignin = async (e) => {
        let username = e.username
        let password = e.password
        setIsSigninSuccess(false)
        const res = await axios.post(URL_USER_SVC+SIGNIN, { username, password },{withCredentials:true,credentials: "include"})
            .catch((err) => {
                if (err.response.status === STATUS_CODE_BAD_REQUEST) {
                    setErrorDialog('Incorrect username or password')
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_SUCCESS) {
            const accesstoken  = res.data.accesstoken
            var today = new Date();
            today.setHours(today.getHours() + 1);
            localStorage.setItem('user', JSON.stringify({username:username, accesstoken:accesstoken,expiration:today}));
            setUser({username:username, accesstoken:accesstoken})
            navigate(DASHBOARD);
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <Box className="login-box">
          <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
          </div>
          
             <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={(values)=>handleSignin(values)}
    >
        <p className="form-title">Welcome!</p>
          <p>Login to your account</p>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="www.youtube.com">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Don't have an account yet?  <a href={SIGNUP}>register here!</a>
      </Form.Item>
    </Form>
            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogMsg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isSigninSuccess
                        ?<></>
                        : <Button onClick={closeDialog}>Done</Button>
                    }
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SigninPage;
