export const getLSItem = (name) => {
    return localStorage.getItem(name);
}

export const filterfollowing = (following, user) => {
    const newFollowing = JSON.parse(JSON.stringify(following))
    const filteredFollowing = newFollowing.filter((el)=> el !== user);
    return filteredFollowing;
}