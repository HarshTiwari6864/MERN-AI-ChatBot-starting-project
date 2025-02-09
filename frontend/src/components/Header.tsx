import { AppBar, Toolbar } from '@mui/material'

import Logo from './shared/Logo'
import { useauth } from '../context/Authcontext'
import Linked from './shared/Linked'

const Header = () => {
  const auth=useauth();
  console.log(auth)
  return (
    <div>
      <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
      <Logo/>
      <div>
      {auth?.isLoggedIn ? (
                <>
                    <Linked bg='#00fffc' to='/chat' text='to Chat' textColor='black' />
                    <Linked bg='#51538f' textColor='white' to='/' text='logout' onclick={auth.logout} />
                </>
            ) : (
                <>
                    <Linked bg='#00fffc' text="login" to='/login' textColor='black' />
                    <Linked bg='#51538f' textColor='white' to='/signup' text="sign up" />
                </>
            )}
      </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
