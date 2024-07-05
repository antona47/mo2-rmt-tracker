import styles from './MainPage.module.scss'

import Header from './Header'
import Body from './Body'





const MainPage = () => {
  return (
    <main className={`flex min-h-screen flex-col ${styles.main}`}>
      <Header/>
      <Body/>
    </main>
  )
}





export default MainPage