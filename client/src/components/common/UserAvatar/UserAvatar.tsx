import style from './UserAvatar.module.scss'





interface IUserAvatar {
  userId: string
  size: number
}





const UserAvatar = ({ userId, size }:IUserAvatar) => {
  const avatarUrl = `${process.env.NEXT_PUBLIC_API_PATH}/image/avatar/${userId}`
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${avatarUrl})`
  }

  return <div className={style.avatar} style={avatarStyle} />
}





export default UserAvatar