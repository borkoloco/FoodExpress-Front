
import style from './AccountButton.module.css'
import iconAccount from '../../../assets/icons/user-account.svg'


export const AccountButton = () => {
  return (
    <button className={`${style.btnAccount}`}>
        <img src={iconAccount} alt="user-account" className={`${style.imgAccount}`} />
        Login
    </button>
  )
}
