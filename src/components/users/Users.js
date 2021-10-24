import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import { useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'


const Users = () => {
  const gCtx = useContext(GithubContext);

  const { loading, users } = gCtx;

  if (loading)
    return <Spinner />;

  return <div style={userStyle}>
    {users.map(user => (
      <UserItem key={user.id} user={user} />
    ))}
  </div>
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
