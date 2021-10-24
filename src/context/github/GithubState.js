import { useReducer } from "react"
import GithubReducer from './GithubReducer'
import GithubContext from './GithubContext'

import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING,
} from '../types'

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async text => {
    setLoading(true);

    let search = await fetch(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`)
      .then(resp => resp.json());

    dispatch({
      type: SEARCH_USERS,
      payload: search.items
    });
  }


  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUser = async username => {
    setLoading();

    let user = await fetch(`https://api.github.com/users/${username}?client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`)
      .then(resp => resp.json());

    dispatch({
      type: GET_USER,
      payload: user
    });
  }


  const getUserRepos = async username => {
    setLoading();

    let repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`)
      .then(resp => resp.json());

    dispatch({
      type: GET_REPOS,
      payload: repos
    });
  }

  const setLoading = () => dispatch({ type: SET_LOADING })


  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
    }}>
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;