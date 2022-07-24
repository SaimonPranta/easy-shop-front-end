const inputHandler = (e, state, setState) => {
    const currentUserInfo = { ...state }
    const name = e.target.name
    const value = e.target.value
    currentUserInfo[name] = value
    setState(currentUserInfo)
};

export default inputHandler;