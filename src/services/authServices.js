export const getLSItem = (name) => {
    return localStorage.getItem(name);
}

export const filterfollowing = (following, user) => {
    const filteredFollowing = following.filter((el)=> el.toString() !== user.toString());
    return filteredFollowing;
}