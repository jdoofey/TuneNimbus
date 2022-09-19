import {useSelector} from 'react-redux'
import './HomePage.css'
const HomePage = () => {
    const sessionUser= useSelector(state=> state.session.user)

    if(!sessionUser || sessionUser) {
      return (
        <div id='page-container'>

        <div id='whatever'>

        <div id='welcome-container'>

          <h1>WELCOME TO TUNENIMBUS</h1>
          <h3>What's next in music is first on TuneNimbus</h3>
          <h5 id='para'>Upload your first track and begin your journey. TuneNimbus gives you space to create, find your fans, and connect with other artists.</h5>
          <h4>Start your journey today!</h4>

        </div>
        </div>
        </div>
      )
    }
}

export default HomePage
